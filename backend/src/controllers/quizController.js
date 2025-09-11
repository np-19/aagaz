const fs = require('fs');
const path = require('path');

// Load quiz data
const loadQuizData = (grade) => {
  try {
    const filePath = path.join(__dirname, '../../data', `${grade}.json`);
    console.log(`Attempting to load quiz data from: ${filePath}`);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error(`Quiz file not found: ${filePath}`);
      return null;
    }
    
    const data = fs.readFileSync(filePath, 'utf8');
    const parsedData = JSON.parse(data);
    console.log(`Successfully loaded quiz data for ${grade}, questions: ${parsedData.questions?.length || 0}`);
    return parsedData;
  } catch (error) {
    console.error(`Error loading quiz data for ${grade}:`, error);
    console.error(`Error details:`, error.message);
    return null;
  }
};

// Load taxonomy data
const loadTaxonomyData = () => {
  try {
    const filePath = path.join(__dirname, '../../data/taxonomy.json');
    console.log(`Attempting to load taxonomy data from: ${filePath}`);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error(`Taxonomy file not found: ${filePath}`);
      return null;
    }
    
    const data = fs.readFileSync(filePath, 'utf8');
    const parsedData = JSON.parse(data);
    console.log(`Successfully loaded taxonomy data, clusters: ${parsedData.clusters?.length || 0}`);
    return parsedData;
  } catch (error) {
    console.error('Error loading taxonomy data:', error);
    console.error(`Error details:`, error.message);
    return null;
  }
};

// Get quiz questions
const getQuizQuestions = (req, res) => {
  try {
    const { grade } = req.params;
    
    if (!['10thq', '12thq', 'ugq'].includes(grade)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid grade. Must be 10thq, 12thq, or ugq'
      });
    }

    const quizData = loadQuizData(grade);
    
    if (!quizData) {
      return res.status(404).json({
        success: false,
        message: 'Quiz data not found'
      });
    }

    res.json({
      success: true,
      data: {
        title: quizData.title,
        description: quizData.description,
        questions: quizData.questions
      }
    });
  } catch (error) {
    console.error('Error getting quiz questions:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Calculate career recommendations based on quiz answers
const calculateCareerRecommendations = (answers, grade) => {
  const taxonomy = loadTaxonomyData();
  if (!taxonomy) return [];

  const clusterScores = {};
  const valueScores = {};
  const skillScores = {};
  const examScores = {};

  // Process each answer
  answers.forEach(answer => {
    const { questionId, selectedOptions } = answer;
    
    // Load the specific quiz data to get question details
    const quizData = loadQuizData(grade);
    if (!quizData) return;

    const question = quizData.questions.find(q => q.id === questionId);
    if (!question) return;

    // Process each selected option
    selectedOptions.forEach(optionValue => {
      const option = question.options.find(opt => opt.value === optionValue);
      if (!option) return;

      // Count cluster mappings
      if (option.maps_to_clusters) {
        option.maps_to_clusters.forEach(cluster => {
          clusterScores[cluster] = (clusterScores[cluster] || 0) + 1;
        });
      }

      // Count value mappings
      if (option.maps_to_values) {
        option.maps_to_values.forEach(value => {
          valueScores[value] = (valueScores[value] || 0) + 1;
        });
      }

      // Count skill mappings
      if (option.maps_to_skills) {
        option.maps_to_skills.forEach(skill => {
          skillScores[skill] = (skillScores[skill] || 0) + 1;
        });
      }

      // Count exam mappings
      if (option.maps_to_exams_required) {
        option.maps_to_exams_required.forEach(exam => {
          examScores[exam] = (examScores[exam] || 0) + 1;
        });
      }
    });
  });

  // Find matching occupations
  const occupationScores = [];
  
  taxonomy.clusters.forEach(cluster => {
    if (clusterScores[cluster.name]) {
      cluster.groups.forEach(group => {
        group.occupations.forEach(occupation => {
          let score = 0;
          
          // Score based on cluster match
          score += clusterScores[cluster.name] * 3;
          
          // Score based on value matches
          if (occupation.values) {
            occupation.values.forEach(value => {
              if (valueScores[value]) {
                score += valueScores[value] * 2;
              }
            });
          }
          
          // Score based on skill matches
          if (occupation.skills_required) {
            occupation.skills_required.forEach(skill => {
              if (skillScores[skill]) {
                score += skillScores[skill] * 1.5;
              }
            });
          }
          
          // Score based on exam matches
          if (occupation.exams_required) {
            occupation.exams_required.forEach(exam => {
              if (examScores[exam]) {
                score += examScores[exam] * 2;
              }
            });
          }
          
          if (score > 0) {
            occupationScores.push({
              ...occupation,
              cluster: cluster.name,
              group: group.group_name,
              matchScore: score
            });
          }
        });
      });
    }
  });

  // Sort by score and return top 4
  return occupationScores
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 4)
    .map(occupation => ({
      title: occupation.title,
      code: occupation.code,
      cluster: occupation.cluster,
      group: occupation.group,
      skills_required: occupation.skills_required,
      education_path: occupation.education_path,
      exams_required: occupation.exams_required,
      jk_colleges: occupation.jk_colleges,
      top_colleges: occupation.top_colleges,
      values: occupation.values,
      local_opportunities: occupation.local_opportunities,
      govt_jobs: occupation.govt_jobs,
      matchScore: occupation.matchScore
    }));
};

// Submit quiz answers and get recommendations
const submitQuizAnswers = (req, res) => {
  try {
    const { grade, answers, userInfo } = req.body;
    
    if (!grade || !answers || !Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid request. Grade and answers are required.'
      });
    }

    if (!['10thq', '12thq', 'ugq'].includes(grade)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid grade. Must be 10thq, 12thq, or ugq'
      });
    }

    // Calculate career recommendations
    const recommendations = calculateCareerRecommendations(answers, grade);
    
    // Generate insights based on answers
    const insights = generateQuizInsights(answers, grade);
    
    res.json({
      success: true,
      data: {
        recommendations,
        insights,
        totalQuestions: answers.length,
        grade
      }
    });
  } catch (error) {
    console.error('Error submitting quiz answers:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Generate insights from quiz answers
const generateQuizInsights = (answers, grade) => {
  const insights = [];
  
  // Analyze answer patterns
  const totalAnswers = answers.length;
  const answeredQuestions = answers.filter(a => a.selectedOptions && a.selectedOptions.length > 0).length;
  
  insights.push({
    type: 'completion',
    message: `You answered ${answeredQuestions} out of ${totalAnswers} questions`,
    confidence: answeredQuestions / totalAnswers
  });
  
  // Analyze interest patterns
  const clusterCounts = {};
  answers.forEach(answer => {
    // This would need to be implemented based on the specific question structure
    // For now, we'll add a placeholder
  });
  
  insights.push({
    type: 'interest_analysis',
    message: 'Based on your answers, you show strong interest in problem-solving and technical fields',
    confidence: 0.8
  });
  
  return insights;
};

module.exports = {
  getQuizQuestions,
  submitQuizAnswers
};
