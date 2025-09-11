import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, Briefcase, Target, TrendingUp, MapPin, GraduationCap,
  Award, Star, Book, ChevronRight, Building2, Users, Code
} from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { recommendationAPI, careerAPI, collegeAPI } from '../../utils/api';
import './RecommendationsNew.css';

const RecommendationsNew = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [personalizedRecs, setPersonalizedRecs] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    try {
      setLoading(true);
      const dummy_user_data = {
        interests: ["Technology", "Software"],
        skills: ["JavaScript", "React"],
        educationLevel: "graduate",
      };
      const personalizedResponse = await recommendationAPI.getPersonalized(dummy_user_data);
      setPersonalizedRecs({
          careerPaths: personalizedResponse.data.recommendations,
          colleges: [], // Placeholder
          courses: [] // Placeholder
      });
    } catch (error) {
      console.error('Error loading recommendations:', error);
      // Fallback mock data
      setPersonalizedRecs({
        careerPaths: [
          {
            title: "AI/ML Engineer",
            matchPercentage: 95,
            cluster: "Engineering & Technology",
            field: "Technology",
            description: "Design and develop AI/ML solutions for various applications",
            averageSalary: "12-25 LPA",
            demandLevel: "Very High",
            skills_required: [
              "Deep Learning (TensorFlow, PyTorch)",
              "Natural Language Processing (NLP)",
              "Computer Vision",
              "Machine Learning",
              "Python Programming",
              "Statistics"
            ],
            education_path: [
              "B.Tech in Computer Science/AI",
              "M.Tech in AI/ML (Recommended)",
              "Industry Certifications"
            ],
            jk_colleges: ["IIT Jammu", "NIT Srinagar"]
          },
          {
            title: "Software Developer",
            matchPercentage: 92,
            cluster: "Engineering & Technology",
            field: "Technology",
            description: "Build and maintain software applications",
            averageSalary: "8-20 LPA",
            demandLevel: "High",
            skills_required: [
              "Java/Python/C++",
              "Data Structures & Algorithms",
              "Web Development",
              "Database Management",
              "Agile Methodologies",
              "Git"
            ],
            education_path: [
              "B.Tech in Computer Science",
              "Industry Certifications",
              "Advanced Specializations"
            ],
            jk_colleges: ["IIT Jammu", "NIT Srinagar", "SMVDU"]
          }
        ],
        colleges: [
          {
            name: "IIT Jammu",
            matchPercentage: 94,
            type: "institute",
            location: "Jammu",
            nirfRank: 45,
            programs: [
              "B.Tech Computer Science",
              "B.Tech AI & Data Science",
              "B.Tech Electronics"
            ],
            facilities: [
              "Advanced Computing Lab",
              "Research Centers",
              "Modern Library",
              "Sports Complex"
            ],
            achievements: ["NIRF Rank: 45", "NBA Accredited"]
          },
          {
            name: "NIT Srinagar",
            matchPercentage: 88,
            type: "institute",
            location: "Srinagar",
            nirfRank: 65,
            programs: [
              "B.Tech Computer Science",
              "B.Tech Electronics",
              "B.Tech Civil"
            ],
            facilities: [
              "Technical Labs",
              "Library",
              "Hostels",
              "Sports Facilities"
            ],
            achievements: ["NIRF Rank: 65", "NAAC A Grade"]
          }
        ],
        courses: [
          {
            title: "Machine Learning Specialization",
            matchPercentage: 96,
            provider: "Coursera",
            type: "certificate",
            duration: "6 months",
            students: 50000,
            skills: [
              "Python Programming",
              "Machine Learning",
              "Deep Learning",
              "Neural Networks",
              "Data Analysis"
            ],
            description: "Comprehensive program covering machine learning fundamentals to advanced concepts"
          },
          {
            title: "Full Stack Development",
            matchPercentage: 90,
            provider: "edX",
            type: "certificate",
            duration: "4 months",
            students: 35000,
            skills: [
              "HTML/CSS",
              "JavaScript",
              "React",
              "Node.js",
              "Database Design"
            ],
            description: "Learn end-to-end web development with modern technologies"
          }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExploreCareer = async (careerTitle) => {
    try {
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

  const handleExploreCollege = async (collegeName) => {
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
      <div className="recommendations-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="recommendations-container">
      <div className="recommendations-header">
        <h2>Personalized Recommendations</h2>
        <p>Based on your profile and assessment results</p>
      </div>

      <div className="filter-buttons">
        <button
          className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => setActiveCategory('all')}
        >
          <Star size={18} />
          All Recommendations
        </button>
        <button
          className={`filter-btn ${activeCategory === 'careers' ? 'active' : ''}`}
          onClick={() => setActiveCategory('careers')}
        >
          <Briefcase size={18} />
          Career Paths
        </button>
        <button
          className={`filter-btn ${activeCategory === 'colleges' ? 'active' : ''}`}
          onClick={() => setActiveCategory('colleges')}
        >
          <GraduationCap size={18} />
          Colleges
        </button>
        <button
          className={`filter-btn ${activeCategory === 'courses' ? 'active' : ''}`}
          onClick={() => setActiveCategory('courses')}
        >
          <Book size={18} />
          Courses
        </button>
      </div>

      <div className="recommendations-content">
        {/* Career Paths Section */}
        {(activeCategory === 'all' || activeCategory === 'careers') && personalizedRecs?.careerPaths && (
          <section className="recommendation-section">
            <div className="section-header">
              <div>
                <h2>Recommended Career Paths</h2>
                <p>Career paths that match your profile and interests</p>
              </div>
              <Button variant="secondary" onClick={() => navigate('/career-paths')} className="view-all-btn">
                View All Careers <ChevronRight size={16} />
              </Button>
            </div>

            <div className="recommendations-grid">
              {personalizedRecs.careerPaths.map((career, index) => (
                <Card
                  key={index}
                  className="recommendation-card"
                  onClick={() => {
                    setSelectedItem(career);
                    setIsModalOpen(true);
                  }}
                >
                  <div className="card-header">
                    <div className="header-left">
                      <div className="icon-container" style={{ backgroundColor: getColorForField(career.field) }}>
                        {getIconForField(career.field)}
                      </div>
                      <div className="title-section">
                        <h3>{career.title}</h3>
                        <p>{career.field}</p>
                      </div>
                    </div>
                    <div className="match-badge">
                      <Star size={16} />
                      {career.matchPercentage}% Match
                    </div>
                  </div>

                  <div className="card-content">
                    <div className="content-section">
                      <div className="stats">
                        <div className="stat">
                          <TrendingUp size={16} />
                          <span>{career.averageSalary}</span>
                        </div>
                        <div className="stat">
                          <Target size={16} />
                          <span>{career.demandLevel} Demand</span>
                        </div>
                      </div>

                      <div className="tag-list">
                        {career.skills_required.slice(0, 3).map((skill, idx) => (
                          <span key={idx} className="tag">{skill}</span>
                        ))}
                        {career.skills_required.length > 3 && (
                          <span className="tag more">+{career.skills_required.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="card-footer">
                    <Button
                      variant="secondary"
                      className="action-button"
                    >
                      View Career Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Colleges Section */}
        {(activeCategory === 'all' || activeCategory === 'colleges') && personalizedRecs?.colleges && (
          <section className="recommendation-section">
            <div className="section-header">
              <div>
                <h2>Recommended Colleges</h2>
                <p>Top institutions that match your academic profile</p>
              </div>
              <Button variant="secondary" onClick={() => navigate('/colleges')} className="view-all-btn">
                View All Colleges <ChevronRight size={16} />
              </Button>
            </div>

            <div className="recommendations-grid">
              {personalizedRecs.colleges.map((college, index) => (
                <Card
                  key={index}
                  className="recommendation-card"
                  onClick={() => {
                    setSelectedItem(college);
                    setIsModalOpen(true);
                  }}
                >
                  <div className="card-header">
                    <div className="header-left">
                      <div className="icon-container" style={{ backgroundColor: getColorForCollege(college.type) }}>
                        {getIconForCollege(college.type)}
                      </div>
                      <div className="title-section">
                        <h3>{college.name}</h3>
                        <p>{college.type}</p>
                      </div>
                    </div>
                    <div className="match-badge">
                      <Star size={16} />
                      {college.matchPercentage}% Match
                    </div>
                  </div>

                  <div className="card-content">
                    <div className="content-section">
                      <div className="stats">
                        <div className="stat">
                          <MapPin size={16} />
                          <span>{college.location}</span>
                        </div>
                        <div className="stat">
                          <Building2 size={16} />
                          <span>{college.programs.length} Programs</span>
                        </div>
                        <div className="stat">
                          <Award size={16} />
                          <span>NIRF: {college.nirfRank}</span>
                        </div>
                      </div>

                      <div className="tag-list">
                        {college.programs.slice(0, 3).map((program, idx) => (
                          <span key={idx} className="tag">{program}</span>
                        ))}
                        {college.programs.length > 3 && (
                          <span className="tag more">+{college.programs.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="card-footer">
                    <Button
                      variant="secondary"
                      className="action-button"
                    >
                      View College Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Courses Section */}
        {(activeCategory === 'all' || activeCategory === 'courses') && personalizedRecs?.courses && (
          <section className="recommendation-section">
            <div className="section-header">
              <div>
                <h2>Recommended Courses</h2>
                <p>Courses to help you build relevant skills</p>
              </div>
              <Button variant="secondary" className="view-all-btn">
                View All Courses <ChevronRight size={16} />
              </Button>
            </div>

            <div className="recommendations-grid">
              {personalizedRecs.courses.map((course, index) => (
                <Card
                  key={index}
                  className="recommendation-card"
                  onClick={() => {
                    setSelectedItem(course);
                    setIsModalOpen(true);
                  }}
                >
                  <div className="card-header">
                    <div className="header-left">
                      <div className="icon-container" style={{ backgroundColor: getColorForCourse(course.type) }}>
                        {getIconForCourse(course.type)}
                      </div>
                      <div className="title-section">
                        <h3>{course.title}</h3>
                        <p>{course.provider}</p>
                      </div>
                    </div>
                    <div className="match-badge">
                      <Star size={16} />
                      {course.matchPercentage}% Match
                    </div>
                  </div>

                  <div className="card-content">
                    <div className="content-section">
                      <div className="stats">
                        <div className="stat">
                          <Book size={16} />
                          <span>{course.duration}</span>
                        </div>
                        <div className="stat">
                          <Users size={16} />
                          <span>{course.students}+ enrolled</span>
                        </div>
                      </div>

                      <div className="tag-list">
                        {course.skills.slice(0, 3).map((skill, idx) => (
                          <span key={idx} className="tag">{skill}</span>
                        ))}
                        {course.skills.length > 3 && (
                          <span className="tag more">+{course.skills.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="card-footer">
                    <Button
                      variant="secondary"
                      className="action-button"
                    >
                      View Course Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedItem?.title || selectedItem?.name || 'Details'}
      >
        {selectedItem && (
          <div className="recommendation-details">
            <div className="details-header">
              <div className="details-title">
                <h2>{selectedItem.title || selectedItem.name}</h2>
                <span className="match-score">
                  <Star size={16} />
                  {selectedItem.matchPercentage}% Match
                </span>
              </div>
            </div>

            <div className="details-content">
              {/* Career Path Details */}
              {selectedItem.field && (
                <>
                  <section className="details-section">
                    <h3>Overview</h3>
                    <p>{selectedItem.description}</p>
                    <div className="stats-grid">
                      <div className="stat-item">
                        <TrendingUp size={20} />
                        <div>
                          <strong>Average Salary</strong>
                          <p>{selectedItem.averageSalary}</p>
                        </div>
                      </div>
                      <div className="stat-item">
                        <Target size={20} />
                        <div>
                          <strong>Demand Level</strong>
                          <p>{selectedItem.demandLevel}</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="details-section">
                    <h3>Required Skills</h3>
                    <div className="skills-grid">
                      {selectedItem.skills_required.map((skill, index) => (
                        <div key={index} className="skill-item">
                          <Star size={16} />
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="details-section">
                    <h3>Education Path</h3>
                    <div className="education-path">
                      {selectedItem.education_path.map((step, index) => (
                        <div key={index} className="education-step">
                          <div className="step-marker">{index + 1}</div>
                          <div className="step-content">
                            <p>{step}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </>
              )}

              {/* College Details */}
              {selectedItem.location && (
                <>
                  <section className="details-section">
                    <h3>Overview</h3>
                    <div className="college-meta">
                      <div className="meta-item">
                        <MapPin size={20} />
                        <div>
                          <strong>Location</strong>
                          <p>{selectedItem.location}</p>
                        </div>
                      </div>
                      <div className="meta-item">
                        <Award size={20} />
                        <div>
                          <strong>NIRF Ranking</strong>
                          <p>Rank {selectedItem.nirfRank}</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="details-section">
                    <h3>Programs Offered</h3>
                    <div className="programs-grid">
                      {selectedItem.programs.map((program, index) => (
                        <div key={index} className="program-item">
                          <GraduationCap size={16} />
                          <span>{program}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="details-section">
                    <h3>Facilities</h3>
                    <div className="facilities-grid">
                      {selectedItem.facilities.map((facility, index) => (
                        <div key={index} className="facility-item">
                          <Building2 size={16} />
                          <span>{facility}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="details-section">
                    <h3>Achievements</h3>
                    <div className="achievements-grid">
                      {selectedItem.achievements.map((achievement, index) => (
                        <div key={index} className="achievement-item">
                          <Award size={16} />
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </>
              )}

              {/* Course Details */}
              {selectedItem.provider && (
                <>
                  <section className="details-section">
                    <h3>Course Overview</h3>
                    <p>{selectedItem.description}</p>
                    <div className="course-meta">
                      <div className="meta-item">
                        <Book size={20} />
                        <div>
                          <strong>Duration</strong>
                          <p>{selectedItem.duration}</p>
                        </div>
                      </div>
                      <div className="meta-item">
                        <Users size={20} />
                        <div>
                          <strong>Enrolled Students</strong>
                          <p>{selectedItem.students}+</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="details-section">
                    <h3>Skills You'll Learn</h3>
                    <div className="skills-grid">
                      {selectedItem.skills.map((skill, index) => (
                        <div key={index} className="skill-item">
                          <Star size={16} />
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </>
              )}
            </div>

            <div className="modal-actions">
              <Button variant="primary">Save to Profile</Button>
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

// Helper functions
const getColorForField = (field) => {
  switch (field) {
    case 'Technology':
      return '#3B82F6';
    case 'Healthcare':
      return '#10B981';
    case 'Business':
      return '#F59E0B';
    default:
      return '#6B7280';
  }
};

const getIconForField = (field) => {
  const size = 24;
  switch (field) {
    case 'Technology':
      return <Code size={size} />;
    case 'Healthcare':
      return <Users size={size} />;
    case 'Business':
      return <BarChart3 size={size} />;
    default:
      return <Briefcase size={size} />;
  }
};

const getColorForCollege = (type) => {
  switch (type) {
    case 'university':
      return '#8B5CF6';
    case 'institute':
      return '#EC4899';
    default:
      return '#6B7280';
  }
};

const getIconForCollege = (type) => {
  const size = 24;
  switch (type) {
    case 'university':
      return <GraduationCap size={size} />;
    case 'institute':
      return <Building2 size={size} />;
    default:
      return <Award size={size} />;
  }
};

const getColorForCourse = (type) => {
  switch (type) {
    case 'certificate':
      return '#F59E0B';
    case 'degree':
      return '#3B82F6';
    default:
      return '#10B981';
  }
};

const getIconForCourse = (type) => {
  const size = 24;
  switch (type) {
    case 'certificate':
      return <Award size={size} />;
    case 'degree':
      return <GraduationCap size={size} />;
    default:
      return <Book size={size} />;
  }
};

export default RecommendationsNew;
