import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin } from 'lucide-react';
import './Testimonials.css';

const Testimonials = () => {
  const navigate = useNavigate();

  const testimonials = [
    {
      name: "Arjun Sharma",
      location: "Srinagar, J&K",
      rating: 5,
      content: "CareerGuide completely transformed my career perspective!",
      story: "I was confused about choosing between engineering and medicine. The career assessment helped me discover my passion for biotechnology. Now I'm pursuing B.Tech in Biotechnology at NIT Srinagar and couldn't be happier with my choice.",
      course: "B.Tech Biotechnology, NIT Srinagar"
    },
    {
      name: "Priya Devi",
      location: "Jammu, J&K",
      rating: 5,
      content: "The mentorship program connected me with amazing professionals.",
      story: "Coming from a small town, I had limited exposure to career options. Through CareerGuide's mentorship network, I connected with a software engineer who guided me through the entire process. I'm now working at a tech startup in Bangalore.",
      course: "Computer Science Graduate, Working at Tech Startup"
    },
    {
      name: "Mohammad Yasir",
      location: "Anantnag, J&K",
      rating: 5,
      content: "Found my passion for sustainable agriculture through the platform.",
      story: "I always thought agriculture was outdated until CareerGuide showed me modern agricultural practices and agri-tech opportunities. Now I'm studying Agricultural Engineering and planning to revolutionize farming in Kashmir.",
      course: "Agricultural Engineering, SKUAST Kashmir"
    },
    {
      name: "Sneha Kumari",
      location: "Udhampur, J&K",
      rating: 5,
      content: "The local opportunity mapping feature was a game-changer.",
      story: "I wanted to contribute to my region's development but didn't know how. CareerGuide helped me discover opportunities in rural development and social work. I'm now working with an NGO focusing on women empowerment in J&K.",
      course: "Social Work Graduate, NGO Professional"
    },
    {
      name: "Rahul Gupta",
      location: "Kathua, J&K",
      rating: 5,
      content: "The skill development tracking kept me motivated throughout.",
      story: "I was struggling with consistency in learning new skills. The platform's tracking system and achievement badges kept me motivated. I completed multiple certifications and landed a job in digital marketing.",
      course: "Digital Marketing Professional"
    },
    {
      name: "Aisha Khan",
      location: "Baramulla, J&K",
      rating: 5,
      content: "Helped me balance my cultural values with modern career aspirations.",
      story: "I wanted a career that respected my cultural background while offering growth opportunities. CareerGuide helped me find the perfect balance - I'm now a cultural heritage consultant working on preserving Kashmir's rich traditions.",
      course: "Cultural Heritage Consultant"
    }
  ];

  const impactStats = [
    { number: "5,000+", label: "Students Guided" },
    { number: "85%", label: "Career Satisfaction Rate" },
    { number: "200+", label: "Success Stories" },
    { number: "50+", label: "Partner Institutions" }
  ];

  return (
    <div className="testimonials-page">
      {/* Navigation Header */}
      <div className="page-header">
        <div className="header-container">
          <button className="back-button" onClick={() => navigate('/')}>
            <ArrowLeft size={20} />
            Back to Home
          </button>
          <div className="header-brand" onClick={() => navigate('/')}>
            <span className="brand-text">CareerGuide</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="testimonials-hero">
        <div className="section-container">
          <div className="section-header">
            <h1>Student Success Stories</h1>
            <p>Real stories from students across Jammu & Kashmir who transformed their careers with CareerGuide</p>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="testimonials-section">
        <div className="section-container">
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />
                  ))}
                </div>
                <p className="testimonial-content">"{testimonial.content}"</p>
                <div className="testimonial-story">
                  <p>{testimonial.story}</p>
                </div>
                <div className="testimonial-author">
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <span>{testimonial.course}</span>
                    <div className="location">
                      <MapPin size={14} />
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="impact-stats">
        <div className="section-container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem', fontWeight: '800', color: '#1f2937' }}>
            Our Impact in Numbers
          </h2>
          <div className="stats-grid">
            {impactStats.map((stat, index) => (
              <div key={index} className="stat-card">
                <h3>{stat.number}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="testimonials-cta">
        <div className="section-container">
          <div className="cta-content">
            <h2>Ready to Write Your Success Story?</h2>
            <p>Join thousands of students from J&K who have discovered their perfect career path with CareerGuide.</p>
            <div className="cta-buttons">
              <button className="cta-primary" onClick={() => navigate('/quiz')}>
                Start Your Journey
              </button>
              <button className="cta-secondary" onClick={() => navigate('/features')}>
                Explore Features
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
