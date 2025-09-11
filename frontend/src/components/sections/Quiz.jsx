import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { quizAPI, userAPI } from '../../utils/api';
import './Quiz.css';

const Quiz = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const [grade, setGrade] = useState('12thq'); // Default to 12th grade quiz

  // Load quiz questions on component mount
  useEffect(() => {
    loadQuizQuestions();
  }, [grade]);

  const loadQuizQuestions = async () => {
    try {
      setLoading(true);
      console.log('Loading quiz for grade:', grade);
      
      // Test direct fetch first
      const directResponse = await fetch(`http://localhost:5001/api/quiz/${grade}`);
      const directData = await directResponse.json();
      console.log('Direct fetch result:', directData);
      
      // Then try API utility
      const response = await quizAPI.getQuestions(grade);
      console.log('API utility result:', response);
      console.log('Quiz data loaded:', response.data);
      console.log('Number of questions:', response.data.questions?.length);
      setQuizData(response.data);
    } catch (error) {
      console.error('Error loading quiz questions:', error);
      console.error('Error details:', error.message);
      // Show error message instead of fallback data
      setQuizData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (optionValue) => {
    const currentQuestionData = quizData?.questions[currentQuestion];
    
    if (currentQuestionData?.type === 'multiple-choice-single') {
      setSelectedOptions([optionValue]);
    } else if (currentQuestionData?.type === 'multiple-choice-multi') {
      setSelectedOptions(prev => 
        prev.includes(optionValue) 
          ? prev.filter(opt => opt !== optionValue)
          : [...prev, optionValue]
      );
    }
  };

  const handleNextQuestion = () => {
    const currentQuestionData = quizData?.questions[currentQuestion];
    
    if (currentQuestionData && selectedOptions.length > 0) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = {
        questionId: currentQuestionData.id,
        selectedOptions: [...selectedOptions]
      };
      setAnswers(newAnswers);
    }
    
    setSelectedOptions([]);

    if (currentQuestion + 1 >= (quizData?.questions?.length || 0)) {
      handleSubmitQuiz();
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmitQuiz = async () => {
    try {
      setSubmitting(true);
      
      // Prepare final answers
      const finalAnswers = [...answers];
      const currentQuestionData = quizData?.questions[currentQuestion];
      
      if (currentQuestionData && selectedOptions.length > 0) {
        finalAnswers[currentQuestion] = {
          questionId: currentQuestionData.id,
          selectedOptions: [...selectedOptions]
        };
      }

      // Submit to backend
      const response = await quizAPI.submitAnswers({
        grade,
        answers: finalAnswers,
        userInfo: {
          userId: user?.id || 'anonymous',
          timestamp: new Date().toISOString()
        }
      });

      setRecommendations(response.data);
      setShowResults(true);

      // Save results to user profile
      if (user?.id) {
        try {
          await userAPI.saveQuizResults({
            userId: user.id,
            grade,
            answers: finalAnswers,
            recommendations: response.data.recommendations,
            timestamp: new Date().toISOString()
          });
          
          // Dispatch custom event to notify dashboard to refresh
          window.dispatchEvent(new CustomEvent('quizCompleted', {
            detail: {
              userId: user.id,
              grade,
              timestamp: new Date().toISOString()
            }
          }));
        } catch (error) {
          console.error('Error saving quiz results:', error);
        }
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      // Show fallback results
      setRecommendations({
        recommendations: [
          {
            title: "Software Engineer",
            matchScore: 85,
            cluster: "Engineering & Technology",
            skills_required: ["Programming", "Problem Solving", "Teamwork"]
          },
          {
            title: "Data Scientist",
            matchScore: 78,
            cluster: "Engineering & Technology",
            skills_required: ["Statistics", "Machine Learning", "Python"]
          },
          {
            title: "Product Manager",
            matchScore: 72,
            cluster: "Commerce & Management",
            skills_required: ["Leadership", "Strategic Thinking", "Communication"]
          }
        ],
        insights: [
          {
            type: "completion",
            message: "You completed the career assessment successfully!",
            confidence: 1.0
          }
        ]
      });
      setShowResults(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedOptions([]);
    setShowResults(false);
    setRecommendations(null);
  };

  const handleGradeChange = (newGrade) => {
    setGrade(newGrade);
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedOptions([]);
    setShowResults(false);
    setRecommendations(null);
  };

  if (loading) {
    return (
      <div className="quiz-section">
        <div className="section-header">
          <h1 className="section-title">Loading Quiz...</h1>
          <p className="section-subtitle">Please wait while we prepare your assessment</p>
        </div>
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (showResults && recommendations) {
    return (
      <div className="quiz-section">
        <div className="section-header">
          <h1 className="section-title">Your Career Assessment Results</h1>
          <p className="section-subtitle">Based on your responses, here are your top career matches</p>
        </div>

        <div className="results-container">
          <div className="results-summary">
            <h3>Assessment Complete!</h3>
            <p>You answered {answers.length} questions and we found {recommendations.recommendations?.length || 0} career matches for you.</p>
          </div>

          <div className="recommendations-grid">
            {recommendations.recommendations?.map((career, index) => (
              <Card key={index} className="career-card" hover>
                <div className="career-header">
                  <h3>{career.title}</h3>
                  <div className="match-score">
                    {Math.round(career.matchScore || 0)}% Match
                  </div>
                </div>
                <div className="career-details">
                  <p><strong>Field:</strong> {career.cluster}</p>
                  {career.skills_required && (
                    <div>
                      <strong>Key Skills:</strong>
                      <ul>
                        {career.skills_required.slice(0, 3).map((skill, idx) => (
                          <li key={idx}>{skill}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {career.education_path && (
                    <div>
                      <strong>Education Path:</strong>
                      <p>{career.education_path[0]}</p>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {recommendations.insights && (
            <div className="insights-section">
              <h3>Assessment Insights</h3>
              {recommendations.insights.map((insight, index) => (
                <div key={index} className="insight-item">
                  <p>{insight.message}</p>
                </div>
              ))}
            </div>
          )}

          <div className="results-actions">
            <Button onClick={() => navigate('/recommendations')}>
              View Detailed Recommendations
            </Button>
            <Button onClick={handleRestartQuiz} variant="secondary">
              Take Quiz Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="quiz-section">
        <div className="section-header">
          <h1 className="section-title">Quiz Not Available</h1>
          <p className="section-subtitle">Unable to load quiz questions. Please check your connection and try again.</p>
        </div>
        <div className="quiz-actions">
          <Button onClick={() => loadQuizQuestions()}>Retry</Button>
          <Button onClick={() => navigate('/dashboard')} variant="secondary">Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  const currentQuestionData = quizData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;

  return (
    <div className="quiz-section">
      <div className="section-header">
        <h1 className="section-title">{quizData.title}</h1>
        <p className="section-subtitle">{quizData.description}</p>
        
        <div className="grade-selector">
          <label>Select your level:</label>
          <select 
            value={grade} 
            onChange={(e) => handleGradeChange(e.target.value)}
            className="grade-select"
          >
            <option value="10thq">10th Grade</option>
            <option value="12thq">12th Grade</option>
            <option value="ugq">Undergraduate</option>
          </select>
          <Button 
            onClick={() => loadQuizQuestions()} 
            size="small" 
            variant="secondary"
            style={{ marginLeft: '1rem' }}
          >
            Refresh Quiz
          </Button>
          <Button 
            onClick={async () => {
              try {
                const response = await fetch('http://localhost:5001/api/quiz/12thq');
                const data = await response.json();
                console.log('Direct API test:', data);
                alert(`API Test: ${data.success ? 'Success' : 'Failed'} - ${data.data?.questions?.length || 0} questions`);
              } catch (error) {
                console.error('Direct API test failed:', error);
                alert('API Test Failed: ' + error.message);
              }
            }} 
            size="small" 
            variant="secondary"
            style={{ marginLeft: '0.5rem' }}
          >
            Test API
          </Button>
        </div>
      </div>

      <div className="quiz-container">
        <div className="quiz-progress">
          <div className="quiz-progress-fill" style={{ width: `${progress}%` }}></div>
          <span className="progress-text">
            Question {currentQuestion + 1} of {quizData.questions.length}
          </span>
        </div>
        
        {/* Debug info - remove in production */}
        <div style={{ fontSize: '0.8rem', color: '#666', textAlign: 'center', marginBottom: '1rem' }}>
          Loaded {quizData.questions.length} questions for {grade} grade
        </div>

        <Card className="quiz-card">
          <h2 className="quiz-question">
            {currentQuestionData?.text || "Loading question..."}
          </h2>
          
          <div className="quiz-options">
            {currentQuestionData?.options?.map((option, index) => (
              <div
                key={index}
                className={`quiz-option ${
                  selectedOptions.includes(option.value) ? 'selected' : ''
                }`}
                onClick={() => handleOptionSelect(option.value)}
              >
                {option.value}
              </div>
            ))}
          </div>
          
          <div className="quiz-actions">
            <Button
              onClick={handleNextQuestion}
              disabled={selectedOptions.length === 0 || submitting}
              style={{ 
                opacity: selectedOptions.length === 0 ? 0.5 : 1,
                minWidth: '150px'
              }}
            >
              {submitting ? 'Processing...' : 
               currentQuestion + 1 >= quizData.questions.length ? 'View Results' : 'Next Question'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;