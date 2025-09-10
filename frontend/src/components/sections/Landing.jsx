import { ArrowRight, Users, TrendingDown, BookOpen, MapPin, Target, Zap, Shield, GraduationCap, Building, AlertTriangle, Briefcase } from 'lucide-react';
import './Landing.css';

const Landing = ({ onNavigate }) => {
  const jkData = [
    {
      title: "Student Dropout Crisis",
      value: "25.33%",
      description: "Secondary-level dropout rate in J&K vs national average",
      icon: TrendingDown,
      type: "crisis"
    },
    {
      title: "Educated Unemployment",
      value: "23.1-24.6%",
      description: "Unemployment among educated population vs 6.1% national",
      icon: Users,
      type: "crisis"
    },
    {
      title: "Career Path Mismatch",
      value: "90%",
      description: "Students select unsuitable career paths",
      icon: Target,
      type: "crisis"
    },
    {
      title: "Education Underfunding",
      value: "2.3%",
      description: "Of state budget vs 4.2% in other states like Karnataka",
      icon: BookOpen,
      type: "crisis"
    },
    {
      title: "Digital Infrastructure",
      value: "20%",
      description: "Educational institutions with digital classrooms",
      icon: Building,
      type: "infrastructure"
    },
    {
      title: "Functional Labs",
      value: "15%",
      description: "Institutions with working laboratory facilities",
      icon: GraduationCap,
      type: "infrastructure"
    }
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <div className="trust-badge">
              <span>✓ Trusted by 50,000+ students</span>
            </div>
            <h1 className="hero-title">
              Your One-Stop
              <br />
              <span className="highlight">Career & Education</span>
              <br />
              Guide
            </h1>
            <p className="hero-subtitle">
              Get personalized recommendations for courses, careers, and colleges. Make 
              informed decisions about your future with our AI-powered guidance system.
            </p>
            <div className="hero-actions">
              <button 
                className="cta-primary"
                onClick={() => onNavigate('quiz')}
              >
                Take Aptitude Quiz
                <ArrowRight size={20} />
              </button>
              <button 
                className="cta-secondary"
                onClick={() => onNavigate('dashboard')}
              >
                Watch Demo
              </button>
            </div>
            
            {/* Statistics Row */}
            <div className="hero-stats">
              <div className="stat-item">
                <Users size={20} />
                <div>
                  <span className="stat-number">50K+</span>
                  <span className="stat-label">Students Guided</span>
                </div>
              </div>
              <div className="stat-item">
                <BookOpen size={20} />
                <div>
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Courses Available</span>
                </div>
              </div>
              <div className="stat-item">
                <Target size={20} />
                <div>
                  <span className="stat-number">200+</span>
                  <span className="stat-label">Career Paths</span>
                </div>
              </div>
              <div className="stat-item">
                <Shield size={20} />
                <div>
                  <span className="stat-number">4.9</span>
                  <span className="stat-label">User Rating</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="data-cards-container">
              {jkData.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className={`data-card ${item.type}`}>
                    <div className="card-icon">
                      <IconComponent size={18} />
                    </div>
                    <div className="card-content">
                      <h4>{item.title}</h4>
                      <div className="card-value">{item.value}</div>
                      <p>{item.description}</p>
                    </div>
                  </div>
                );
              })}
              
              <div className="career-explorer-card">
                <div className="explorer-icon">
                  <Target size={24} />
                </div>
                <h3>Career Explorer</h3>
                <p>Discover your perfect career path</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
