import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Card from '../ui/Card';
import './Quiz.css';

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "Which activity sounds most appealing to you?",
      options: [
        "Solving complex mathematical problems",
        "Creating visual designs and artwork",
        "Leading a team project",
        "Helping others solve their problems"
      ]
    },
    {
      question: "In a group project, you prefer to:",
      options: [
        "Plan and organize the workflow",
        "Generate creative ideas",
        "Handle technical implementation",
        "Coordinate team communication"
      ]
    },
    {
      question: "What motivates you most?",
      options: [
        "Solving challenging puzzles",
        "Making a positive impact",
        "Building innovative solutions",
        "Learning new concepts"
      ]
    }
  ];

  const totalQuestions = 10;

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedOption;
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentQuestion + 1 >= questions.length || currentQuestion + 1 >= totalQuestions) {
      setShowResults(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  if (showResults) {
    return (
      <div className="quiz-section">
        <div className="section-header">
          <h1 className="section-title">Your Results</h1>
          <p className="section-subtitle">Based on your responses, here are your career matches</p>
        </div>

        <div className="results-container">
          <div className="results-chart">
            <div className="chart-circle">
              <div className="chart-center">
                <div style={{ fontSize: '2rem' }}>85%</div>
                <div>Match Score</div>
              </div>
            </div>
          </div>
          
          <h3 style={{ color: '#0D7377', marginBottom: '1rem' }}>Top Career Matches:</h3>
          <div style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
            <p><strong>1. Software Engineer</strong> - 95% match</p>
            <p><strong>2. Data Scientist</strong> - 88% match</p>
            <p><strong>3. Product Manager</strong> - 82% match</p>
          </div>
          
          <Button onClick={() => navigate('/recommendations')} style={{ marginTop: '2rem' }}>
            View Detailed Recommendations
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-section">
      <div className="section-header">
        <h1 className="section-title">Aptitude & Interest Assessment</h1>
        <p className="section-subtitle">Discover your strengths and find the perfect career match</p>
      </div>

      <div className="quiz-container">
        <div className="quiz-progress">
          <div className="quiz-progress-fill" style={{ width: `${progress}%` }}></div>
        </div>

        <Card className="quiz-card">
          <h2 className="quiz-question">
            {questions[currentQuestion]?.question || "Loading next question..."}
          </h2>
          
          <div className="quiz-options">
            {questions[currentQuestion]?.options.map((option, index) => (
              <div
                key={index}
                className={`quiz-option ${selectedOption === index ? 'selected' : ''}`}
                onClick={() => handleOptionSelect(index)}
              >
                {option}
              </div>
            ))}
          </div>
          
          <Button
            onClick={handleNextQuestion}
            disabled={selectedOption === null}
            style={{ marginTop: '2rem', opacity: selectedOption === null ? 0.5 : 1 }}
          >
            {currentQuestion + 1 >= questions.length ? 'View Results' : 'Next Question'}
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;
