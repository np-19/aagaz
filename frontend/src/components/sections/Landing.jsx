import { useNavigate } from 'react-router-dom';
import { ArrowRight, Users, BookOpen, Target, Star, Play, TrendingDown, GraduationCap, Building } from 'lucide-react';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();

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
      {/* Navigation Bar */}
      <nav className="landing-navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <img 
              src="/logo.png" 
              alt="Aagaz Logo" 
              style={{
                height: '50px',
                width: 'auto',
                cursor: 'pointer'
              }}
              onClick={() => navigate('/')}
            />
          </div>
          
          <div className="nav-links">
            <a href="#home">🏠 Home</a>
            <a href="#features" onClick={(e) => { e.preventDefault(); navigate('/features'); }}>✨ Features</a>
            <a href="#careers">👔 Careers</a>
            <a href="#colleges">🏫 Colleges</a>
            <a href="#testimonials" onClick={(e) => { e.preventDefault(); navigate('/testimonials'); }}>💬 Reviews</a>
            <a href="#contact">📞 Contact</a>
          </div>
          
          <button className="get-started-btn" onClick={() => navigate('/quiz')}>
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-left">
            <h1 className="hero-title">
              Your One-Stop<br />
              <span className="highlight">Career & Education</span><br />
              Guide
            </h1>
            
            <p className="hero-subtitle">
              Get personalized recommendations for courses, careers, and colleges. Make 
              informed decisions about your future with our AI-powered guidance system.
            </p>
            
            <div className="hero-buttons">
              <button 
                className="btn-primary"
                onClick={() => navigate('/quiz')}
              >
                Take Aptitude Quiz
                <ArrowRight size={18} />
              </button>
              <button 
                className="btn-secondary"
                onClick={() => navigate('/dashboard')}
              >
                <Play size={18} />
                Watch Demo
              </button>
            </div>

            <div className="stats-inline">
              <div className="stat-item">
                <Users className="stat-icon" size={20} />
                <div className="stat-content">
                  <div className="stat-number">50K+</div>
                  <div className="stat-label">Students Guided</div>
                </div>
              </div>
              
              <div className="stat-item">
                <BookOpen className="stat-icon" size={20} />
                <div className="stat-content">
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Courses Available</div>
                </div>
              </div>
              
              <div className="stat-item">
                <Target className="stat-icon" size={20} />
                <div className="stat-content">
                  <div className="stat-number">200+</div>
                  <div className="stat-label">Career Paths</div>
                </div>
              </div>
              
              <div className="stat-item">
                <Star className="stat-icon" size={20} />
                <div className="stat-content">
                  <div className="stat-number">4.9</div>
                  <div className="stat-label">User Rating</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="hero-right">
            <div className="data-container">
              <div className="data-cards-grid">
                {jkData.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={index} className={`data-card ${item.type}`}>
                      <div className="card-icon">
                        <IconComponent size={14} />
                      </div>
                      <div className="card-content">
                        <h4>{item.title}</h4>
                        <div className="card-value">{item.value}</div>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="career-explorer">
                <div className="explorer-content">
                  <div className="explorer-icon">
                    <Target size={24} />
                  </div>
                  <div className="explorer-text">
                    <h3>Career Explorer</h3>
                    <p>Discover your perfect career path</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
