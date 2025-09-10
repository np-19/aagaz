import { Brain, School, Route, Calendar } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import './Dashboard.css';

const Dashboard = ({ onNavigate }) => {
  const stats = [
    { number: '15', label: 'Career Matches' },
    { number: '23', label: 'College Options' },
    { number: '8', label: 'Saved Resources' },
    { number: '92%', label: 'Profile Complete' }
  ];

  const quickActions = [
    {
      icon: Brain,
      title: 'Take Aptitude Test',
      description: 'Discover your strengths and ideal career paths',
      action: () => onNavigate('quiz')
    },
    {
      icon: School,
      title: 'Find Colleges',
      description: 'Explore nearby institutions that match your interests',
      action: () => onNavigate('colleges')
    },
    {
      icon: Route,
      title: 'Explore Paths',
      description: 'See how your studies connect to future careers',
      action: () => onNavigate('paths')
    },
    {
      icon: Calendar,
      title: 'Plan Timeline',
      description: 'Track important dates and deadlines',
      action: () => onNavigate('timeline')
    }
  ];

  return (
    <div className="dashboard">
      <div className="welcome-banner">
        <div className="welcome-content">
          <h1 className="welcome-title">Welcome back, Alex! 👋</h1>
          <p className="welcome-subtitle">Ready to take the next step in your career journey?</p>
          
          <div className="progress-section">
            <h3>Your Progress</h3>
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
            <p>68% Complete - 4 of 7 modules finished</p>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <Card key={index} variant="stat">
            <div className="stat-number">{stat.number}</div>
            <div className="stat-label">{stat.label}</div>
          </Card>
        ))}
      </div>

      <div className="quick-actions">
        {quickActions.map((action, index) => {
          const IconComponent = action.icon;
          return (
            <Card key={index} variant="action" hover onClick={action.action}>
              <div className="action-icon">
                <IconComponent size={24} />
              </div>
              <h3 className="action-title">{action.title}</h3>
              <p className="action-desc">{action.description}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
