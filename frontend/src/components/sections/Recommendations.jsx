import { BookOpen, Briefcase, Target } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import './Recommendations.css';

const Recommendations = ({ onNavigate }) => {
  const stats = [
    { number: '95%', label: 'Software Engineer Match' },
    { number: '12', label: 'Recommended Courses' },
    { number: '5', label: 'Scholarship Opportunities' },
    { number: '8', label: 'Industry Connections' }
  ];

  const recommendations = [
    {
      icon: BookOpen,
      title: 'Recommended Courses',
      description: 'CS, Data Science, AI/ML specializations',
      details: [
        'Computer Science - 98% match | Top colleges: IIT Delhi, IIT Bombay',
        'Data Science - 94% match | Emerging field with high demand',
        'AI/ML - 91% match | Future-focused specialization'
      ]
    },
    {
      icon: Briefcase,
      title: 'Career Matches',
      description: 'Software roles with 85%+ compatibility',
      details: [
        'Software Engineer - 95% match | High demand, good growth',
        'Data Scientist - 88% match | Analytics and insights',
        'Product Manager - 82% match | Leadership and strategy'
      ]
    },
    {
      icon: Target,
      title: 'Skill Development',
      description: 'Python, React, Machine Learning',
      details: [
        'Python Programming - Essential for data science and backend',
        'React Development - Frontend framework in high demand',
        'Machine Learning - Future-ready skill set'
      ]
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

      <div className="recommendations-grid">
        {recommendations.map((rec, index) => {
          const IconComponent = rec.icon;
          return (
            <Card key={index} variant="action" hover>
              <div className="action-icon">
                <IconComponent size={24} />
              </div>
              <h3 className="action-title">{rec.title}</h3>
              <p className="action-desc">{rec.description}</p>
              <div className="recommendation-details">
                {rec.details.map((detail, idx) => (
                  <div key={idx} className="detail-item">
                    <strong>{detail.split(' - ')[0]}</strong>
                    <span> - {detail.split(' - ')[1]}</span>
                  </div>
                ))}
              </div>
              <Button 
                variant="secondary" 
                size="small"
                onClick={() => onNavigate && onNavigate('colleges')}
                style={{ marginTop: '1rem' }}
              >
                Explore More
              </Button>
            </Card>
          );
        })}
      </div>

      <div className="action-buttons">
        <Button onClick={() => onNavigate && onNavigate('colleges')}>
          Explore Colleges
        </Button>
        <Button 
          variant="secondary" 
          onClick={() => onNavigate && onNavigate('resources')}
        >
          Study Materials
        </Button>
      </div>
    </div>
  );
};

export default Recommendations;
