import { useState, useEffect } from 'react';
import { 
  Search, Code, BarChart3, Users, Crown, ArrowRight, 
  Star, TrendingUp, Award, Target, Book, Briefcase,
  GraduationCap, Building2, MapPin, ArrowLeft 
} from 'lucide-react';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { careerAPI } from '../../utils/api';
import './CareerPathsNew.css';

const CareerPathsNew = () => {
  const [viewMode, setViewMode] = useState('clusters');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [clusters, setClusters] = useState([]);
  const [careers, setCareers] = useState([]);

  useEffect(() => {
    loadClusters();
  }, []);

  const loadClusters = async () => {
    try {
      setLoading(true);
      const response = await careerAPI.getClusters();
      setClusters(response.data || mockClusters);
    } catch (error) {
      console.error('Error loading clusters:', error);
      setClusters(mockClusters);
    } finally {
      setLoading(false);
    }
  };

  const loadCareersForCluster = async (cluster) => {
    try {
      setLoading(true);
      const response = await careerAPI.getByCluster(cluster.name);
      setCareers(response.data?.careers || mockCareers);
    } catch (error) {
      console.error('Error loading careers:', error);
      setCareers(mockCareers);
    } finally {
      setLoading(false);
    }
  };

  const handleClusterSelect = async (cluster) => {
    setSelectedCluster(cluster);
    setViewMode('careers');
    await loadCareersForCluster(cluster);
  };

  const handleCareerSelect = (career) => {
    setSelectedCareer(career);
    setIsModalOpen(true);
  };

  const handleBackToClusters = () => {
    setViewMode('clusters');
    setSelectedCluster(null);
    setCareers([]);
    setSearchQuery('');
  };

  const filteredClusters = clusters.filter(cluster =>
    cluster.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cluster.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCareers = careers.filter(career =>
    career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    career.skills_required?.some(skill => 
      skill.toLowerCase().includes(searchQuery.toLowerCase())
    ) ||
    career.group?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading && viewMode === 'clusters' && clusters.length === 0) {
    return (
      <div className="career-paths-container">
        <div className="loading-state">
          <Briefcase className="animate-pulse" size={48} />
          <h2>Loading Career Paths...</h2>
          <p>Please wait while we fetch the latest information</p>
        </div>
      </div>
    );
  }

  return (
    <div className="career-paths-container">
      <div className="career-paths-header">
        <div className="header-content">
          <h1>Discover Your Career Path</h1>
          <p>Explore diverse career opportunities and find your perfect path</p>
        </div>
      </div>

      <div className="career-paths-content">
        {/* Navigation Bar */}
        <div className="navigation-bar">
          {viewMode === 'careers' && (
            <button className="back-button" onClick={handleBackToClusters}>
              <ArrowLeft size={20} />
              <span>Back to Clusters</span>
            </button>
          )}
          <div className="search-bar">
            <Search size={20} />
            <input
              type="text"
              placeholder={viewMode === 'clusters' ? 'Search career clusters...' : 'Search careers or skills...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Clusters View */}
        {viewMode === 'clusters' && (
          <div className="clusters-section">
            <h2>Career Clusters</h2>
            <div className="clusters-grid">
              {filteredClusters.map((cluster, index) => (
                <Card
                  key={index}
                  className="cluster-card"
                  onClick={() => handleClusterSelect(cluster)}
                >
                  <div className="cluster-icon" style={{ backgroundColor: getClusterColor(cluster.name) }}>
                    {getClusterIcon(cluster.name)}
                  </div>
                  <div className="cluster-content">
                    <h3>{cluster.name}</h3>
                    <p>{cluster.description}</p>
                    <div className="cluster-stats">
                      <span className="stat">
                        <Briefcase size={16} />
                        {cluster.careerCount || cluster.careers?.length || 0} Careers
                      </span>
                      <span className="stat">
                        <GraduationCap size={16} />
                        {cluster.educationPaths?.length || 0} Paths
                      </span>
                    </div>
                    <Button
                      variant="secondary"
                      className="explore-button"
                    >
                      Explore Careers <ArrowRight size={16} />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Careers View */}
        {viewMode === 'careers' && selectedCluster && (
          <div className="careers-section">
            <div className="cluster-header">
              <div className="cluster-info">
                <div className="cluster-icon" style={{ backgroundColor: getClusterColor(selectedCluster.name) }}>
                  {getClusterIcon(selectedCluster.name)}
                </div>
                <div>
                  <h2>{selectedCluster.name}</h2>
                  <p>{selectedCluster.description}</p>
                </div>
              </div>
            </div>

            <div className="careers-grid">
              {filteredCareers.map((career, index) => (
                <Card
                  key={index}
                  className="career-card"
                  onClick={() => handleCareerSelect(career)}
                >
                  <div className="career-header">
                    <h3>{career.title}</h3>
                    <span className="career-group">{career.group}</span>
                  </div>

                  {career.skills_required && (
                    <div className="career-skills">
                      <strong>Key Skills</strong>
                      <div className="skills-tags">
                        {career.skills_required.slice(0, 3).map((skill, idx) => (
                          <span key={idx} className="skill-tag">{skill}</span>
                        ))}
                        {career.skills_required.length > 3 && (
                          <span className="skill-tag more">+{career.skills_required.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="career-stats">
                    {career.average_salary && (
                      <div className="stat">
                        <TrendingUp size={16} />
                        <span>{career.average_salary}</span>
                      </div>
                    )}
                    {career.growth_rate && (
                      <div className="stat">
                        <Crown size={16} />
                        <span>{career.growth_rate} Growth</span>
                      </div>
                    )}
                  </div>

                  <div className="career-highlights">
                    {career.education_path && (
                      <div className="highlight">
                        <Book size={16} />
                        <span>{career.education_path[0]}</span>
                      </div>
                    )}
                    {career.jk_colleges && (
                      <div className="highlight">
                        <MapPin size={16} />
                        <span>{career.jk_colleges.length} Local Colleges</span>
                      </div>
                    )}
                  </div>

                  <Button
                    variant="secondary"
                    className="view-details-btn"
                  >
                    View Details
                  </Button>
                </Card>
              ))}
            </div>

            {filteredCareers.length === 0 && (
              <div className="no-results">
                <Target size={48} />
                <h3>No careers found</h3>
                <p>Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        )}

        {/* Career Details Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={selectedCareer?.title || 'Career Details'}
        >
          {selectedCareer && (
            <div className="career-details-modal">
              <div className="modal-header">
                <div className="title-section">
                  <h2>{selectedCareer.title}</h2>
                  <span className="career-type">{selectedCareer.group}</span>
                </div>
                {selectedCareer.average_salary && (
                  <div className="salary-badge">
                    <TrendingUp size={16} />
                    {selectedCareer.average_salary}
                  </div>
                )}
              </div>

              <div className="modal-sections">
                {/* Overview Section */}
                <section className="modal-section">
                  <h3>Overview</h3>
                  <p>{selectedCareer.description}</p>
                  <div className="quick-stats">
                    {selectedCareer.growth_rate && (
                      <div className="stat-item">
                        <Crown size={20} />
                        <div>
                          <strong>Growth Rate</strong>
                          <p>{selectedCareer.growth_rate}</p>
                        </div>
                      </div>
                    )}
                    {selectedCareer.demand_level && (
                      <div className="stat-item">
                        <TrendingUp size={20} />
                        <div>
                          <strong>Demand Level</strong>
                          <p>{selectedCareer.demand_level}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </section>

                {/* Skills Section */}
                {selectedCareer.skills_required && (
                  <section className="modal-section">
                    <h3>Required Skills</h3>
                    <div className="skills-grid">
                      {selectedCareer.skills_required.map((skill, index) => (
                        <div key={index} className="skill-item">
                          <Star size={16} />
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Education Path Section */}
                {selectedCareer.education_path && (
                  <section className="modal-section">
                    <h3>Education Pathway</h3>
                    <div className="education-timeline">
                      {selectedCareer.education_path.map((step, index) => (
                        <div key={index} className="timeline-item">
                          <div className="timeline-marker">
                            <GraduationCap size={20} />
                          </div>
                          <div className="timeline-content">
                            <strong>Step {index + 1}</strong>
                            <p>{step}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Local Opportunities Section */}
                {(selectedCareer.jk_colleges || selectedCareer.local_opportunities) && (
                  <section className="modal-section">
                    <h3>Local Opportunities</h3>
                    {selectedCareer.jk_colleges && (
                      <div className="colleges-list">
                        <h4>Local Colleges</h4>
                        <div className="grid-list">
                          {selectedCareer.jk_colleges.map((college, index) => (
                            <div key={index} className="list-item">
                              <Building2 size={16} />
                              <span>{college}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedCareer.local_opportunities && (
                      <div className="opportunities-list">
                        <h4>Opportunities</h4>
                        <div className="grid-list">
                          {selectedCareer.local_opportunities.map((opportunity, index) => (
                            <div key={index} className="list-item">
                              <Target size={16} />
                              <span>{opportunity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </section>
                )}

                {/* Government Jobs Section */}
                {selectedCareer.govt_jobs && (
                  <section className="modal-section">
                    <h3>Government Jobs</h3>
                    <div className="grid-list">
                      {selectedCareer.govt_jobs.map((job, index) => (
                        <div key={index} className="list-item">
                          <Briefcase size={16} />
                          <span>{job}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              <div className="modal-actions">
                <Button variant="primary">Save Career</Button>
                <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Close</Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

// Helper functions
const getClusterIcon = (clusterName) => {
  const size = 24;
  switch (clusterName) {
    case 'Engineering & Technology':
      return <Code size={size} />;
    case 'Healthcare & Medicine':
      return <Users size={size} />;
    case 'Commerce & Management':
      return <BarChart3 size={size} />;
    case 'Creative Arts & Media':
      return <Award size={size} />;
    default:
      return <Target size={size} />;
  }
};

const getClusterColor = (clusterName) => {
  switch (clusterName) {
    case 'Engineering & Technology':
      return '#3B82F6';
    case 'Healthcare & Medicine':
      return '#10B981';
    case 'Commerce & Management':
      return '#F59E0B';
    case 'Creative Arts & Media':
      return '#8B5CF6';
    default:
      return '#6B7280';
  }
};

// Mock data
const mockClusters = [
  {
    name: 'Engineering & Technology',
    description: 'Explore careers in software, hardware, and technological innovation',
    careerCount: 15,
    educationPaths: ['B.Tech', 'B.E', 'Diploma']
  },
  {
    name: 'Healthcare & Medicine',
    description: 'Discover opportunities in medical and healthcare services',
    careerCount: 12,
    educationPaths: ['MBBS', 'B.Pharm', 'Nursing']
  },
  {
    name: 'Commerce & Management',
    description: 'Business, finance, and management career paths',
    careerCount: 10,
    educationPaths: ['BBA', 'B.Com', 'MBA']
  }
];

const mockCareers = [
  {
    title: 'Software Engineer',
    group: 'Computer Science',
    description: 'Design and develop software applications and systems',
    skills_required: ['Java/Python', 'Data Structures', 'Web Development', 'Problem Solving'],
    education_path: ['B.Tech in Computer Science', 'Masters in Computer Science'],
    average_salary: '₹8-15 LPA',
    growth_rate: 'High',
    demand_level: 'Very High',
    jk_colleges: ['IIT Jammu', 'NIT Srinagar', 'SMVDU'],
    local_opportunities: ['IT Parks', 'Startups', 'MNC Branch Offices'],
    govt_jobs: ['NIC', 'DRDO', 'ISRO', 'PSUs']
  },
  {
    title: 'Data Scientist',
    group: 'Data Science',
    description: 'Analyze complex data to help organizations make better decisions',
    skills_required: ['Python', 'Machine Learning', 'Statistics', 'SQL'],
    education_path: ['B.Tech/B.Sc in relevant field', 'Masters in Data Science'],
    average_salary: '₹10-18 LPA',
    growth_rate: 'Very High',
    demand_level: 'High',
    jk_colleges: ['IIT Jammu', 'NIT Srinagar'],
    local_opportunities: ['Research Centers', 'Analytics Firms'],
    govt_jobs: ['Statistical Departments', 'Research Organizations']
  }
];

export default CareerPathsNew;
