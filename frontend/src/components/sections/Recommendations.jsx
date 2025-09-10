import { useState, useEffect } from 'react';
import { BookOpen, Briefcase, Target, TrendingUp, MapPin, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { recommendationAPI, careerAPI, collegeAPI } from '../../utils/api';
import './Recommendations.css';

const Recommendations = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [personalizedRecs, setPersonalizedRecs] = useState(null);
  const [trendingCareers, setTrendingCareers] = useState([]);
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    try {
      setLoading(true);
      
      // Load personalized recommendations
      const personalizedResponse = await recommendationAPI.getPersonalized({
        interests: ['Technology', 'Problem Solving', 'Innovation'],
        skills: ['Programming', 'Analytical Thinking', 'Communication'],
        educationLevel: '12th',
        location: 'JK',
        careerGoals: ['Software Development', 'Data Science']
      });
      
      setPersonalizedRecs(personalizedResponse.data);
      setInsights(personalizedResponse.data.insights || []);

      // Load trending careers
      const trendingResponse = await recommendationAPI.getTrending();
      setTrendingCareers(trendingResponse.data.careers || []);
      
    } catch (error) {
      console.error('Error loading recommendations:', error);
      // Fallback to mock data
      setPersonalizedRecs({
        recommendations: [
          {
            title: "Software Engineer",
            matchPercentage: 95,
            cluster: "Engineering & Technology",
            skills_required: ["Programming", "Problem Solving", "Teamwork"],
            education_path: ["B.Tech in Computer Science"],
            jk_colleges: ["NIT Srinagar", "IIT Jammu"],
            top_colleges: ["IIT Delhi", "IIT Bombay"]
          },
          {
            title: "Data Scientist",
            matchPercentage: 88,
            cluster: "Engineering & Technology",
            skills_required: ["Python", "Machine Learning", "Statistics"],
            education_path: ["M.Tech in Data Science"],
            jk_colleges: ["University of Kashmir"],
            top_colleges: ["IISc Bangalore", "IIT Madras"]
          }
        ],
        insights: [
          {
            type: "cluster_analysis",
            message: "Most of your recommendations are in Engineering & Technology",
            confidence: 0.9
          }
        ]
      });
      setTrendingCareers([
        {
          title: "AI/ML Engineer",
          cluster: "Engineering & Technology",
          trendingReason: "High demand in current market"
        },
        {
          title: "Cybersecurity Analyst",
          cluster: "Engineering & Technology",
          trendingReason: "Growing security concerns"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleExploreCareer = async (careerTitle) => {
    try {
      // Search for the career to get more details
      const response = await careerAPI.search({ q: careerTitle });
      if (response.data.careers.length > 0) {
        navigate(`/career-paths?career=${encodeURIComponent(careerTitle)}`);
      } else {
        navigate('/career-paths');
      }
    } catch (error) {
      console.error('Error exploring career:', error);
      navigate('/career-paths');
    }
  };

  const handleExploreColleges = async (collegeName) => {
    try {
      const response = await collegeAPI.getDetails(collegeName);
      navigate(`/colleges?college=${encodeURIComponent(collegeName)}`);
    } catch (error) {
      console.error('Error exploring college:', error);
      navigate('/colleges');
    }
  };

  if (loading) {
    return (
      <div className="recommendations-section">
        <div className="section-header">
          <h1 className="section-title">Loading Recommendations...</h1>
          <p className="section-subtitle">Analyzing your profile and preferences</p>
        </div>
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  const stats = [
    { 
      number: personalizedRecs?.recommendations?.[0]?.matchPercentage + '%' || '95%', 
      label: 'Top Match Score' 
    },
    { 
      number: personalizedRecs?.recommendations?.length || 0, 
      label: 'Career Matches' 
    },
    { 
      number: personalizedRecs?.recommendations?.reduce((acc, rec) => acc + (rec.jk_colleges?.length || 0), 0) || 0, 
      label: 'JK Colleges' 
    },
    { 
      number: trendingCareers.length, 
      label: 'Trending Careers' 
    }
  ];

  return (
    <div className="recommendations-section">
      <div className="section-header">
        <h1 className="section-title">Personalized Recommendations</h1>
        <p className="section-subtitle">Based on your profile and assessment results</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <Card key={index} variant="stat">
            <div className="stat-number">{stat.number}</div>
            <div className="stat-label">{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* Personalized Career Recommendations */}
      {personalizedRecs?.recommendations && (
        <div className="recommendations-section-content">
          <h2 className="section-subtitle">Your Top Career Matches</h2>
          <div className="career-recommendations-grid">
            {personalizedRecs.recommendations.slice(0, 4).map((career, index) => (
              <Card key={index} variant="action" hover className="career-card">
                <div className="career-header">
                  <div className="career-title">
                    <Briefcase size={20} />
                    <h3>{career.title}</h3>
                  </div>
                  <div className="match-score">
                    {career.matchPercentage || career.matchScore || 85}% Match
                  </div>
                </div>
                <div className="career-details">
                  <p><strong>Field:</strong> {career.cluster}</p>
                  {career.skills_required && (
                    <div className="skills-section">
                      <strong>Key Skills:</strong>
                      <div className="skills-tags">
                        {career.skills_required.slice(0, 3).map((skill, idx) => (
                          <span key={idx} className="skill-tag">{skill}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {career.education_path && (
                    <div className="education-section">
                      <strong>Education Path:</strong>
                      <p>{career.education_path[0]}</p>
                    </div>
                  )}
                  {career.jk_colleges && career.jk_colleges.length > 0 && (
                    <div className="colleges-section">
                      <strong>JK Colleges:</strong>
                      <div className="colleges-list">
                        {career.jk_colleges.slice(0, 2).map((college, idx) => (
                          <span 
                            key={idx} 
                            className="college-link"
                            onClick={() => handleExploreColleges(college)}
                          >
                            {college}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <Button 
                  variant="secondary" 
                  size="small"
                  onClick={() => handleExploreCareer(career.title)}
                  style={{ marginTop: '1rem' }}
                >
                  Explore Career
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Insights */}
      {insights && insights.length > 0 && (
        <div className="insights-section">
          <h2 className="section-subtitle">Assessment Insights</h2>
          <div className="insights-grid">
            {insights.map((insight, index) => (
              <Card key={index} className="insight-card">
                <div className="insight-content">
                  <TrendingUp size={20} />
                  <div>
                    <h4>{insight.message}</h4>
                    {insight.suggestion && <p>{insight.suggestion}</p>}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Trending Careers */}
      {trendingCareers.length > 0 && (
        <div className="trending-section">
          <h2 className="section-subtitle">Trending Careers</h2>
          <div className="trending-grid">
            {trendingCareers.slice(0, 4).map((career, index) => (
              <Card key={index} className="trending-card" hover>
                <div className="trending-header">
                  <Target size={18} />
                  <h4>{career.title}</h4>
                </div>
                <p className="trending-reason">{career.trendingReason}</p>
                <span className="trending-field">{career.cluster}</span>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="action-buttons">
        <Button onClick={() => navigate('/career-paths')}>
          Explore All Careers
        </Button>
        <Button 
          variant="secondary" 
          onClick={() => navigate('/colleges')}
        >
          Browse Colleges
        </Button>
        <Button 
          variant="secondary" 
          onClick={() => navigate('/quiz')}
        >
          Retake Assessment
        </Button>
      </div>
    </div>
  );
};

export default Recommendations;