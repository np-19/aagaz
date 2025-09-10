import { useState, useEffect } from 'react';
import { GraduationCap, Code, BarChart3, Users, Crown, ArrowRight, Star, TrendingUp, Award, Target, Search, Filter } from 'lucide-react';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { careerAPI } from '../../utils/api';
import './CareerPaths.css';

const CareerPaths = () => {
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [careers, setCareers] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCluster, setSelectedCluster] = useState('');
  const [filteredCareers, setFilteredCareers] = useState([]);

  useEffect(() => {
    loadCareerData();
  }, []);

  useEffect(() => {
    filterCareers();
  }, [careers, searchQuery, selectedCluster]);

  const loadCareerData = async () => {
    try {
      setLoading(true);
      
      // Load career clusters
      const clustersResponse = await careerAPI.getClusters();
      setClusters(clustersResponse.data || []);
      
      // Load all careers (we'll get a sample from the first cluster)
      if (clustersResponse.data && clustersResponse.data.length > 0) {
        const firstCluster = clustersResponse.data[0];
        const careersResponse = await careerAPI.getByCluster(firstCluster.name);
        setCareers(careersResponse.data.careers || []);
      }
    } catch (error) {
      console.error('Error loading career data:', error);
      // Fallback to mock data
      setClusters([
        { name: "Engineering & Technology", groups: [{ name: "Computer & IT", occupationCount: 5 }] },
        { name: "Healthcare & Medicine", groups: [{ name: "Medical", occupationCount: 3 }] },
        { name: "Commerce & Management", groups: [{ name: "Business", occupationCount: 4 }] }
      ]);
      setCareers([
        {
          title: "Software Engineer",
          code: "2512.0100",
          cluster: "Engineering & Technology",
          group: "Computer & IT",
          skills_required: ["Java/Python/C++", "Data Structures & Algorithms", "Agile Methodologies"],
          education_path: ["B.Tech in Computer Science", "BCA/MCA"],
          exams_required: ["GATE (for PSUs/M.Tech)", "NIC Scientist 'B' Exam"],
          jk_colleges: ["NIT Srinagar", "University of Jammu", "IIT Jammu"],
          top_colleges: ["IITs", "NITs", "IIITs", "BITS Pilani"],
          values: ["Innovation", "Logical thinking", "Continuous learning"],
          local_opportunities: ["IT Parks in Jammu/Srinagar", "Startup ecosystem"],
          govt_jobs: ["PSUs (PGCIL, BHEL, NTPC)", "National Informatics Centre (NIC)"]
        },
        {
          title: "Data Scientist",
          code: "2511.xxxx",
          cluster: "Engineering & Technology",
          group: "AI & Data Science",
          skills_required: ["Python (Pandas, NumPy)", "Machine Learning", "SQL", "Statistical Analysis"],
          education_path: ["Master's in Data Science", "B.Tech in Computer Science"],
          exams_required: ["GATE (for M.Tech admissions)", "Specific PSU recruitment exams"],
          jk_colleges: ["IIT Jammu", "NIT Srinagar", "SMVDU Katra"],
          top_colleges: ["IISc Bangalore", "IIT Bombay", "IIT Madras"],
          values: ["Data-driven decision making", "Predictive modeling", "Problem-solving"],
          local_opportunities: ["Tech startups in Jammu/Srinagar", "Government data analysis projects"],
          govt_jobs: ["National Informatics Centre (NIC)", "DRDO", "ISRO"]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filterCareers = () => {
    let filtered = [...careers];
    
    if (searchQuery) {
      filtered = filtered.filter(career => 
        career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        career.skills_required?.some(skill => 
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    
    if (selectedCluster) {
      filtered = filtered.filter(career => 
        career.cluster.toLowerCase() === selectedCluster.toLowerCase()
      );
    }
    
    setFilteredCareers(filtered);
  };

  const handleCareerClick = async (career) => {
    try {
      // Get detailed career information
      const response = await careerAPI.getDetails(career.code);
      setSelectedCareer(response.data);
    } catch (error) {
      console.error('Error loading career details:', error);
      setSelectedCareer(career);
    }
    setIsModalOpen(true);
  };

  const handleClusterChange = async (clusterName) => {
    if (!clusterName) {
      setCareers([]);
      return;
    }
    
    try {
      setLoading(true);
      const response = await careerAPI.getByCluster(clusterName);
      setCareers(response.data.careers || []);
    } catch (error) {
      console.error('Error loading careers for cluster:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCareerIcon = (cluster) => {
    switch (cluster) {
      case 'Engineering & Technology':
        return Code;
      case 'Healthcare & Medicine':
        return Users;
      case 'Commerce & Management':
        return BarChart3;
      case 'Creative Arts & Media':
        return Award;
      default:
        return Target;
    }
  };

  const getCareerColor = (cluster) => {
    switch (cluster) {
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

  if (loading && careers.length === 0) {
    return (
      <div className="career-paths-section">
        <div className="section-header">
          <h1 className="section-title">Loading Career Paths...</h1>
          <p className="section-subtitle">Please wait while we load career information</p>
        </div>
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="career-paths-section">
      <div className="section-header">
        <h1 className="section-title">Explore Career Paths</h1>
        <p className="section-subtitle">Discover diverse career opportunities across different fields</p>
      </div>

      {/* Search and Filter Controls */}
      <div className="search-controls">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search careers or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-controls">
          <Filter size={20} />
          <select
            value={selectedCluster}
            onChange={(e) => {
              setSelectedCluster(e.target.value);
              handleClusterChange(e.target.value);
            }}
            className="cluster-select"
          >
            <option value="">All Clusters</option>
            {clusters.map((cluster, index) => (
              <option key={index} value={cluster.name}>
                {cluster.name} ({cluster.groups.reduce((acc, group) => acc + group.occupationCount, 0)})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Career Clusters Overview */}
      <div className="clusters-overview">
        <h2>Career Clusters</h2>
        <div className="clusters-grid">
          {clusters.map((cluster, index) => {
            const totalCareers = cluster.groups.reduce((acc, group) => acc + group.occupationCount, 0);
            return (
              <Card 
                key={index} 
                className={`cluster-card ${selectedCluster === cluster.name ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedCluster(cluster.name);
                  handleClusterChange(cluster.name);
                }}
                hover
              >
                <div className="cluster-header">
                  <h3>{cluster.name}</h3>
                  <span className="career-count">{totalCareers} careers</span>
                </div>
                <div className="cluster-groups">
                  {cluster.groups.map((group, groupIndex) => (
                    <span key={groupIndex} className="group-tag">
                      {group.name} ({group.occupationCount})
                    </span>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Career List */}
      <div className="careers-section">
        <h2>
          {selectedCluster ? `${selectedCluster} Careers` : 'All Careers'} 
          ({filteredCareers.length})
        </h2>
        
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="careers-grid">
            {filteredCareers.map((career, index) => {
              const IconComponent = getCareerIcon(career.cluster);
              const color = getCareerColor(career.cluster);
              
              return (
                <Card 
                  key={index} 
                  className="career-card" 
                  hover
                  onClick={() => handleCareerClick(career)}
                >
                  <div className="career-header">
                    <div className="career-icon" style={{ backgroundColor: color }}>
                      <IconComponent size={24} />
                    </div>
                    <div className="career-title-section">
                      <h3>{career.title}</h3>
                      <span className="career-cluster">{career.cluster}</span>
                    </div>
                  </div>
                  
                  <div className="career-details">
                    <div className="career-group">
                      <strong>Field:</strong> {career.group}
                    </div>
                    
                    {career.skills_required && (
                      <div className="career-skills">
                        <strong>Key Skills:</strong>
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
                    
                    {career.education_path && (
                      <div className="career-education">
                        <strong>Education:</strong> {career.education_path[0]}
                      </div>
                    )}
                    
                    {career.jk_colleges && career.jk_colleges.length > 0 && (
                      <div className="career-colleges">
                        <strong>JK Colleges:</strong> {career.jk_colleges.slice(0, 2).join(', ')}
                        {career.jk_colleges.length > 2 && ` +${career.jk_colleges.length - 2} more`}
                      </div>
                    )}
                  </div>
                  
                  <div className="career-actions">
                    <Button size="small" variant="secondary">
                      View Details
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
        
        {filteredCareers.length === 0 && !loading && (
          <div className="no-results">
            <Target size={48} />
            <h3>No careers found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Career Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedCareer?.title || 'Career Details'}
      >
        {selectedCareer && (
          <div className="career-details-modal">
            <div className="career-overview">
              <h2>{selectedCareer.title}</h2>
              <div className="career-meta">
                <span className="career-code">Code: {selectedCareer.code}</span>
                <span className="career-cluster">{selectedCareer.cluster}</span>
                <span className="career-group">{selectedCareer.group}</span>
              </div>
            </div>

            <div className="career-sections">
              {selectedCareer.skills_required && (
                <div className="career-section">
                  <h3>Required Skills</h3>
                  <div className="skills-list">
                    {selectedCareer.skills_required.map((skill, index) => (
                      <span key={index} className="skill-item">{skill}</span>
                    ))}
                  </div>
                </div>
              )}

              {selectedCareer.education_path && (
                <div className="career-section">
                  <h3>Education Path</h3>
                  <ul>
                    {selectedCareer.education_path.map((path, index) => (
                      <li key={index}>{path}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedCareer.exams_required && (
                <div className="career-section">
                  <h3>Required Exams</h3>
                  <ul>
                    {selectedCareer.exams_required.map((exam, index) => (
                      <li key={index}>{exam}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedCareer.jk_colleges && (
                <div className="career-section">
                  <h3>Jammu & Kashmir Colleges</h3>
                  <ul>
                    {selectedCareer.jk_colleges.map((college, index) => (
                      <li key={index}>{college}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedCareer.top_colleges && (
                <div className="career-section">
                  <h3>Top National Colleges</h3>
                  <ul>
                    {selectedCareer.top_colleges.map((college, index) => (
                      <li key={index}>{college}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedCareer.local_opportunities && (
                <div className="career-section">
                  <h3>Local Opportunities</h3>
                  <ul>
                    {selectedCareer.local_opportunities.map((opportunity, index) => (
                      <li key={index}>{opportunity}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedCareer.govt_jobs && (
                <div className="career-section">
                  <h3>Government Jobs</h3>
                  <ul>
                    {selectedCareer.govt_jobs.map((job, index) => (
                      <li key={index}>{job}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedCareer.values && (
                <div className="career-section">
                  <h3>Core Values</h3>
                  <div className="values-list">
                    {selectedCareer.values.map((value, index) => (
                      <span key={index} className="value-item">{value}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CareerPaths;