const fs = require('fs');
const path = require('path');

// Load taxonomy data
const loadTaxonomyData = () => {
  try {
    const filePath = path.join(__dirname, '../../data/taxonomy.json');
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading taxonomy data:', error);
    return null;
  }
};

// Get personalized recommendations based on user profile
const getPersonalizedRecommendations = (req, res) => {
  try {
    const { 
      interests = [], 
      skills = [], 
      educationLevel, 
      location = 'JK',
      careerGoals = [] 
    } = req.body;

    const taxonomy = loadTaxonomyData();
    if (!taxonomy) {
      return res.status(404).json({
        success: false,
        message: 'Career data not found'
      });
    }

    const recommendations = [];
    const allOccupations = [];

    // Collect all occupations
    taxonomy.clusters.forEach(cluster => {
      cluster.groups.forEach(group => {
        group.occupations.forEach(occupation => {
          allOccupations.push({
            ...occupation,
            cluster: cluster.name,
            group: group.group_name
          });
        });
      });
    });

    // Score each occupation based on user profile
    const scoredOccupations = allOccupations.map(occupation => {
      let score = 0;
      let reasons = [];

      // Score based on interests
      if (interests.length > 0) {
        const interestMatches = occupation.values?.filter(value => 
          interests.some(interest => 
            value.toLowerCase().includes(interest.toLowerCase()) ||
            interest.toLowerCase().includes(value.toLowerCase())
          )
        ) || [];
        
        if (interestMatches.length > 0) {
          score += interestMatches.length * 3;
          reasons.push(`Matches your interests: ${interestMatches.join(', ')}`);
        }
      }

      // Score based on skills
      if (skills.length > 0) {
        const skillMatches = occupation.skills_required?.filter(skill => 
          skills.some(userSkill => 
            skill.toLowerCase().includes(userSkill.toLowerCase()) ||
            userSkill.toLowerCase().includes(skill.toLowerCase())
          )
        ) || [];
        
        if (skillMatches.length > 0) {
          score += skillMatches.length * 2;
          reasons.push(`Matches your skills: ${skillMatches.join(', ')}`);
        }
      }

      // Score based on education level compatibility
      if (educationLevel) {
        const educationPaths = occupation.education_path || [];
        const isCompatible = educationPaths.some(path => 
          path.toLowerCase().includes(educationLevel.toLowerCase()) ||
          (educationLevel === '12th' && path.toLowerCase().includes('bachelor')) ||
          (educationLevel === 'graduate' && path.toLowerCase().includes('master'))
        );
        
        if (isCompatible) {
          score += 2;
          reasons.push('Compatible with your education level');
        }
      }

      // Score based on location (prefer JK colleges for JK users)
      if (location === 'JK' && occupation.jk_colleges?.length > 0) {
        score += 1;
        reasons.push('Available in Jammu & Kashmir');
      }

      // Score based on career goals
      if (careerGoals.length > 0) {
        const goalMatches = careerGoals.filter(goal => 
          occupation.title.toLowerCase().includes(goal.toLowerCase()) ||
          occupation.group.toLowerCase().includes(goal.toLowerCase()) ||
          occupation.cluster.toLowerCase().includes(goal.toLowerCase())
        );
        
        if (goalMatches.length > 0) {
          score += goalMatches.length * 2;
          reasons.push(`Aligns with your career goals: ${goalMatches.join(', ')}`);
        }
      }

      return {
        ...occupation,
        score,
        reasons,
        matchPercentage: Math.min((score / 10) * 100, 100)
      };
    });

    // Sort by score and get top recommendations
    const topRecommendations = scoredOccupations
      .filter(occ => occ.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);

    // Generate insights
    const insights = generateRecommendationInsights(topRecommendations, {
      interests,
      skills,
      educationLevel,
      location
    });

    res.json({
      success: true,
      data: {
        recommendations: topRecommendations,
        insights,
        totalAnalyzed: allOccupations.length
      }
    });
  } catch (error) {
    console.error('Error getting personalized recommendations:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Generate insights based on recommendations
const generateRecommendationInsights = (recommendations, userProfile) => {
  const insights = [];

  if (recommendations.length === 0) {
    insights.push({
      type: 'warning',
      message: 'No specific recommendations found. Consider exploring different career paths or updating your profile.',
      suggestion: 'Try taking our career quiz to discover new interests and skills.'
    });
    return insights;
  }

  // Analyze cluster distribution
  const clusterCounts = {};
  recommendations.forEach(rec => {
    clusterCounts[rec.cluster] = (clusterCounts[rec.cluster] || 0) + 1;
  });

  const topCluster = Object.keys(clusterCounts).reduce((a, b) => 
    clusterCounts[a] > clusterCounts[b] ? a : b
  );

  insights.push({
    type: 'cluster_analysis',
    message: `Most of your recommendations are in ${topCluster}`,
    confidence: clusterCounts[topCluster] / recommendations.length
  });

  // Analyze skill gaps
  const allRequiredSkills = new Set();
  recommendations.forEach(rec => {
    rec.skills_required?.forEach(skill => allRequiredSkills.add(skill));
  });

  const userSkills = new Set(userProfile.skills || []);
  const skillGaps = Array.from(allRequiredSkills).filter(skill => 
    !Array.from(userSkills).some(userSkill => 
      skill.toLowerCase().includes(userSkill.toLowerCase()) ||
      userSkill.toLowerCase().includes(skill.toLowerCase())
    )
  );

  if (skillGaps.length > 0) {
    insights.push({
      type: 'skill_gaps',
      message: `Consider developing these skills: ${skillGaps.slice(0, 3).join(', ')}`,
      suggestion: 'Look for online courses or training programs to build these skills.'
    });
  }

  // Analyze education requirements
  const educationLevels = new Set();
  recommendations.forEach(rec => {
    rec.education_path?.forEach(path => {
      if (path.toLowerCase().includes('master')) educationLevels.add('Master\'s');
      else if (path.toLowerCase().includes('bachelor') || path.toLowerCase().includes('b.tech')) educationLevels.add('Bachelor\'s');
      else if (path.toLowerCase().includes('phd')) educationLevels.add('PhD');
    });
  });

  if (educationLevels.size > 0) {
    insights.push({
      type: 'education_requirements',
      message: `Most careers require: ${Array.from(educationLevels).join(', ')}`,
      suggestion: 'Plan your educational path accordingly.'
    });
  }

  return insights;
};

// Get trending careers
const getTrendingCareers = (req, res) => {
  try {
    const taxonomy = loadTaxonomyData();
    if (!taxonomy) {
      return res.status(404).json({
        success: false,
        message: 'Career data not found'
      });
    }

    // For now, return careers with high demand indicators
    const trendingCareers = [];
    
    taxonomy.clusters.forEach(cluster => {
      cluster.groups.forEach(group => {
        group.occupations.forEach(occupation => {
          // Simple trending logic based on keywords
          const trendingKeywords = ['AI', 'Data', 'Machine Learning', 'Cloud', 'Cybersecurity', 'Digital'];
          const isTrending = trendingKeywords.some(keyword => 
            occupation.title.toLowerCase().includes(keyword.toLowerCase()) ||
            occupation.skills_required?.some(skill => 
              skill.toLowerCase().includes(keyword.toLowerCase())
            )
          );

          if (isTrending) {
            trendingCareers.push({
              ...occupation,
              cluster: cluster.name,
              group: group.group_name,
              trendingReason: 'High demand in current market'
            });
          }
        });
      });
    });

    res.json({
      success: true,
      data: {
        careers: trendingCareers.slice(0, 8),
        total: trendingCareers.length
      }
    });
  } catch (error) {
    console.error('Error getting trending careers:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  getPersonalizedRecommendations,
  getTrendingCareers
};
