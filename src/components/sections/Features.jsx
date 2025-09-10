import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Target, BookOpen, Users, TrendingUp, Award, MapPin } from 'lucide-react';
import './Features.css';

const Features = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Target,
      title: "Personalized Career Assessment",
      description: "Advanced AI-powered assessment that analyzes your interests, skills, and personality to recommend the perfect career paths tailored specifically for you.",
      benefits: ["Comprehensive personality analysis", "Skills gap identification", "Interest-based matching", "Aptitude evaluation"]
    },
    {
      icon: BookOpen,
      title: "J&K Educational Resources",
      description: "Curated educational content and resources specifically designed for students in Jammu & Kashmir, including local opportunities and regional insights.",
      benefits: ["Local college information", "Regional job market data", "Scholarship opportunities", "Cultural context awareness"]
    },
    {
      icon: Users,
      title: "Mentorship Network",
      description: "Connect with experienced professionals and successful alumni from J&K who can guide you through your career journey with real-world insights.",
      benefits: ["One-on-one mentoring", "Industry expert guidance", "Peer support groups", "Success story sharing"]
    },
    {
      icon: TrendingUp,
      title: "Career Path Visualization",
      description: "Interactive career roadmaps that show you step-by-step progression paths, required skills, and timeline expectations for your chosen field.",
      benefits: ["Visual career timelines", "Skill progression tracking", "Milestone planning", "Goal setting tools"]
    },
    {
      icon: Award,
      title: "Skill Development Tracking",
      description: "Monitor your progress as you develop new skills, complete courses, and achieve certifications relevant to your career goals.",
      benefits: ["Progress monitoring", "Achievement badges", "Skill verification", "Portfolio building"]
    },
    {
      icon: MapPin,
      title: "Local Opportunity Mapping",
      description: "Discover career opportunities, internships, and job openings specifically available in Jammu & Kashmir and nearby regions.",
      benefits: ["Local job listings", "Internship opportunities", "Startup ecosystem", "Government schemes"]
    }
  ];

  return (
    <div className="features-page">
      {/* Navigation Header */}
      <div className="page-header">
        <div className="header-container">
          <button className="back-button" onClick={() => navigate('/')}>
            <ArrowLeft size={20} />
            Back to Home
          </button>
          <div className="header-brand" onClick={() => navigate('/')}>
          <img 
            src="/logo.png" 
            alt="Agaaz Logo" 
            className="h-10 w-auto object-contain"
          />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="features-hero">
        <div className="section-container">
          <div className="section-header">
            <h1>Platform Features</h1>
            <p>Discover how CareerGuide empowers students in Jammu & Kashmir to make informed career decisions and achieve their professional goals.</p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-section">
        <div className="section-container">
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  <feature.icon size={32} />
                </div>
                <div className="feature-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <ul className="feature-benefits">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="features-cta">
        <div className="section-container">
          <div className="cta-content">
            <h2>Ready to Start Your Career Journey?</h2>
            <p>Join thousands of students from J&K who have discovered their perfect career path with CareerGuide.</p>
            <div className="cta-buttons">
              <button className="cta-primary" onClick={() => navigate('/quiz')}>
                Take Career Quiz
              </button>
              <button className="cta-secondary" onClick={() => navigate('/dashboard')}>
                Explore Dashboard
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
