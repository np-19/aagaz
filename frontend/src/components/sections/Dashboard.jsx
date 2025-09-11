import { Brain, School, Route, Calendar, User, Trophy, BookOpen, Target, TrendingUp, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import userAPI from '../../services/userAPI';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default stats as fallback
  const defaultStats = [
    { number: '0', label: 'Quizzes Taken', icon: Brain },
    { number: '0', label: 'Career Matches', icon: Target },
    { number: '0', label: 'Saved Colleges', icon: School },
    { number: '0%', label: 'Profile Complete', icon: User }
  ];

  const quickActions = [
    {
      icon: Brain,
      title: 'Take Aptitude Test',
      description: 'Discover your strengths and ideal career paths',
      action: () => navigate('/quiz')
    },
    {
      icon: School,
      title: 'Find Colleges',
      description: 'Explore nearby institutions that match your interests',
      action: () => navigate('/colleges')
    },
    {
      icon: Route,
      title: 'Explore Paths',
      description: 'See how your studies connect to future careers',
      action: () => navigate('/paths')
    },
    {
      icon: Calendar,
      title: 'Plan Timeline',
      description: 'Track important dates and deadlines',
      action: () => navigate('/timeline')
    }
  ];

  const fetchDashboardData = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const userData = {
        clerkId: user.id,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.emailAddresses?.[0]?.emailAddress || '',
        role: 'student',
        grade: '12th'
      };

      const response = await userAPI.createOrUpdateUser(userData);
      setDashboardData(response.data);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data. Please try refreshing the page.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  // Add event listener for quiz completion
  useEffect(() => {
    const handleQuizCompleted = () => {
      console.log('Quiz completed event received, refreshing dashboard data...');
      fetchDashboardData();
    };

    // Listen for custom quiz completion event
    window.addEventListener('quizCompleted', handleQuizCompleted);
    
    // Also listen for storage changes (in case quiz results are stored locally)
    window.addEventListener('storage', handleQuizCompleted);

    return () => {
      window.removeEventListener('quizCompleted', handleQuizCompleted);
      window.removeEventListener('storage', handleQuizCompleted);
    };
  }, [user]);

  // Get stats from dashboard data or use defaults
  const stats = dashboardData ? [
    { number: dashboardData.totalQuizzes?.toString() || '0', label: 'Quizzes Taken', icon: Brain },
    { number: dashboardData.savedCareers?.toString() || '0', label: 'Career Matches', icon: Target },
    { number: dashboardData.savedColleges?.toString() || '0', label: 'Saved Colleges', icon: School },
    { number: `${Math.round((dashboardData.user ? 75 : 25))}%`, label: 'Profile Complete', icon: User }
  ] : defaultStats;

  // Show loading state
  if (!isLoaded || loading) {
    return (
      <div className="dashboard">
        <div className="welcome-banner">
          <div className="welcome-content">
            <h1 className="welcome-title">Loading your dashboard... ⏳</h1>
            <p className="welcome-subtitle">Please wait while we fetch your data.</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && !dashboardData) {
    return (
      <div className="dashboard">
        <div className="welcome-banner">
          <div className="welcome-content">
            <h1 className="welcome-title">Welcome! 👋</h1>
            <p className="welcome-subtitle">Ready to start your career journey?</p>
            <div className="error-message">
              <p>⚠️ {error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="welcome-banner">
        <div className="welcome-content">
          <div className="user-info">
            <div className="user-avatar">
              {user?.imageUrl ? (
                <img src={user.imageUrl} alt="Profile" className="avatar-image" />
              ) : (
                <User size={32} />
              )}
            </div>
            <div className="user-details">
              <h1 className="welcome-title">
                Welcome back, {dashboardData?.user?.firstName || user?.firstName || 'Neelesh'}! 👋
              </h1>
              <div className="profile-snapshot">
                <div className="snapshot-item">
                  <strong>Class/Year:</strong> 12th Grade Science
                </div>
                <div className="snapshot-item">
                  <strong>Strengths:</strong> 
                  <span className="strengths-tags">
                    <span className="strength-tag">Analytical</span>
                    <span className="strength-tag">Logical Thinking</span>
                  </span>
                </div>
                <div className="snapshot-item">
                  <strong>Career Goal in Progress:</strong> 
                  <span className="career-goal">AI Engineer</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="progress-section">
            <div className="progress-header">
              <TrendingUp size={20} />
              <h3>Career Journey Progress</h3>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `25%` }}
              ></div>
            </div>
            {dashboardData?.lastQuizDate && (
              <div className="last-activity">
                <Clock size={16} />
                <span>Last quiz: {new Date(dashboardData.lastQuizDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} variant="stat">
              <div className="stat-icon">
                <IconComponent size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="dashboard-sections">
        <div className="section-header">
          <Trophy size={20} />
          <h2>Quick Actions</h2>
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
        
        {dashboardData?.quizResults && dashboardData.quizResults.length > 0 && (
          <div className="recent-activity">
            <div className="section-header">
              <BookOpen size={20} />
              <h2>Recent Activity</h2>
            </div>
            <Card variant="info">
              <div className="activity-content">
                <h4>Latest Quiz Results</h4>
                <p>You've completed {dashboardData.totalQuizzes} quiz{dashboardData.totalQuizzes !== 1 ? 's' : ''}!</p>
                {dashboardData.lastQuizDate && (
                  <p className="activity-date">
                    Last completed: {new Date(dashboardData.lastQuizDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
