import { useState, useEffect } from 'react';
import { Search, MapPin, Star, Filter, GraduationCap, Users, Award } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { collegeAPI } from '../../utils/api';
import './Colleges.css';

const Colleges = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredColleges, setFilteredColleges] = useState([]);

  useEffect(() => {
    loadColleges();
  }, []);

  useEffect(() => {
    filterColleges();
  }, [colleges, searchTerm, activeFilter]);

  const loadColleges = async () => {
    try {
      setLoading(true);
      const response = await collegeAPI.getAll();
      setColleges(response.data.colleges || []);
    } catch (error) {
      console.error('Error loading colleges:', error);
      // Fallback to mock data
      const mockData = [
        {
          name: 'IIT Jammu',
          type: 'JK',
          programs: ['Computer Science', 'Mechanical Engineering', 'Electrical Engineering'],
          clusters: ['Engineering & Technology'],
          programCount: 3
        },
        {
          name: 'NIT Srinagar',
          type: 'JK',
          programs: ['Computer Science', 'Information Technology', 'Civil Engineering'],
          clusters: ['Engineering & Technology'],
          programCount: 3
        },
        {
          name: 'University of Jammu',
          type: 'JK',
          programs: ['Computer Applications', 'Business Administration', 'Science'],
          clusters: ['Engineering & Technology', 'Commerce & Management'],
          programCount: 3
        },
        {
          name: 'IIT Delhi',
          type: 'National',
          programs: ['Computer Science', 'Mechanical Engineering', 'Data Science'],
          clusters: ['Engineering & Technology'],
          programCount: 3
        },
        {
          name: 'IIT Bombay',
          type: 'National',
          programs: ['Computer Science', 'AI/ML', 'Robotics'],
          clusters: ['Engineering & Technology'],
          programCount: 3
        }
      ];

      setColleges(mockData);
    } finally {
      setLoading(false);
    }
  };

  const filterColleges = () => {

    
    let filtered = [...colleges];
    
    if (searchTerm) {
      filtered = filtered.filter(college => 
        college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.programs.some(program => 
          program.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        college.clusters.some(cluster => 
          cluster.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    if (activeFilter !== 'all') {
      if (activeFilter === 'jk') {
        filtered = filtered.filter(college => college.type === 'JK');
      } else if (activeFilter === 'national') {
        filtered = filtered.filter(college => college.type === 'National');
      } else {
        filtered = filtered.filter(college => 
          college.clusters.some(cluster => 
            cluster.toLowerCase().includes(activeFilter.toLowerCase())
          )
        );
      }
    }
    

    setFilteredColleges(filtered);
  };

  const handleCollegeClick = async (college) => {
    try {
      const response = await collegeAPI.getDetails(college.name);
      setSelectedCollege(response.data);
    } catch (error) {
      console.error('Error loading college details:', error);
      setSelectedCollege(college);
    }
    setIsModalOpen(true);
  };

  const getCollegeIcon = (type) => {
    switch (type) {
      case 'JK':
        return MapPin;
      case 'National':
        return Award;
      default:
        return GraduationCap;
    }
  };

  const getCollegeColor = (type) => {
    switch (type) {
      case 'JK':
        return 'rgba(16, 185, 129, 0.9)';
      case 'National':
        return 'rgba(59, 130, 246, 0.9)';
      default:
        return 'rgba(107, 114, 128, 0.9)';
    }
  };

  const filters = [
    { id: 'all', label: 'All Colleges', count: colleges.length },
    { id: 'jk', label: 'J&K Colleges', count: colleges.filter(c => c.type === 'JK').length },
    { id: 'national', label: 'National Colleges', count: colleges.filter(c => c.type === 'National').length },
    { id: 'engineering', label: 'Engineering', count: colleges.filter(c => c.clusters.includes('Engineering & Technology')).length },
    { id: 'commerce', label: 'Commerce', count: colleges.filter(c => c.clusters.includes('Commerce & Management')).length },
    { id: 'healthcare', label: 'Healthcare', count: colleges.filter(c => c.clusters.includes('Healthcare & Medicine')).length }
  ];

  if (loading) {
    return (
      <div className="colleges-section">
        <div className="section-header">
          <h1 className="section-title">Loading Colleges...</h1>
          <p className="section-subtitle">Please wait while we load college information</p>
        </div>
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="colleges-section">
      <div className="section-header">
        <h1 className="section-title">Explore Colleges</h1>
        <p className="section-subtitle">Discover colleges and universities across Jammu & Kashmir and India</p>
      </div>

      {/* Search and Filter Controls */}
      <div className="search-controls">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search colleges, programs, or fields..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`filter-tab ${activeFilter === filter.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
            <span className="filter-count">({filter.count})</span>
          </button>
        ))}
      </div>

      {/* Colleges Grid */}
      <div className="colleges-grid">
        {filteredColleges.map((college, index) => {
          
          try {
            const IconComponent = getCollegeIcon(college.type);
            const color = getCollegeColor(college.type);
            
            return (
              <div key={index} className="college-card">
                <div className="college-header">
                  <div className="college-icon" style={{ background: color }}>
                    <IconComponent size={24} />
                  </div>
                  <div className="college-title-section">
                    <h3>{college.name}</h3>
                    <div className="college-meta">
                      <span className={`college-type ${college.type.toLowerCase()}`}>
                        {college.type === 'JK' ? 'J&K College' : 'National College'}
                      </span>
                      <span className="program-count">
                        {college.programCount || college.programs.length} Programs
                      </span>
                    </div>
                  </div>
                </div>
                <div className="college-details">
                  <div className="college-clusters">
                    <strong>Fields of Study</strong>
                    <div className="cluster-tags">
                      {college.clusters.map((cluster, idx) => (
                        <span key={idx} className="cluster-tag">{cluster}</span>
                      ))}
                    </div>
                  </div>
                  <div className="college-programs">
                    <strong>Available Programs</strong>
                    <div className="programs-list">
                      {college.programs.slice(0, 3).map((program, idx) => (
                        <span key={idx} className="program-tag">{program}</span>
                      ))}
                      {college.programs.length > 3 && (
                        <span className="program-tag more">+{college.programs.length - 3} more</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="college-actions">
                  <button onClick={() => handleCollegeClick(college)}>
                    View Details
                  </button>
                </div>
              </div>
            );
          } catch (error) {
            console.error('Error rendering college:', college.name, error);
            return <div key={index}>Error rendering {college.name}</div>;
          }
        })}
      </div>

      {filteredColleges.length === 0 && !loading && (
        <div className="no-results">
          <GraduationCap size={48} />
          <h3>No colleges found</h3>
          <p>Try adjusting your search or filter criteria</p>

        </div>
      )}



      {/* College Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedCollege?.name || 'College Details'}
      >
        {selectedCollege && (
          <div className="college-details-modal">
            <div className="college-overview">
              <h2>{selectedCollege.name}</h2>
              <div className="college-meta">
                <span className={`college-type ${selectedCollege.type?.toLowerCase()}`}>
                  {selectedCollege.type === 'JK' ? 'J&K College' : 'National College'}
                </span>
                <span className="program-count">
                  {selectedCollege.programCount} programs available
                </span>
              </div>
            </div>

            <div className="college-sections">
              {selectedCollege.clusters && (
                <div className="college-section">
                  <h3>Academic Fields</h3>
                  <div className="clusters-list">
                    {selectedCollege.clusters.map((cluster, index) => (
                      <span key={index} className="cluster-item">{cluster}</span>
                    ))}
                  </div>
                </div>
              )}

              {selectedCollege.programs && (
                <div className="college-section">
                  <h3>Available Programs</h3>
                  <ul>
                    {selectedCollege.programs.map((program, index) => (
                      <li key={index}>{program}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedCollege.detailedPrograms && (
                <div className="college-section">
                  <h3>Program Details</h3>
                  <div className="programs-grid">
                    {selectedCollege.detailedPrograms.map((program, index) => (
                      <div key={index} className="program-card">
                        <h4>{program.title}</h4>
                        <p><strong>Field:</strong> {program.cluster} - {program.group}</p>
                        {program.skills_required && (
                          <div>
                            <strong>Skills Required:</strong>
                            <ul>
                              {program.skills_required.slice(0, 3).map((skill, idx) => (
                                <li key={idx}>{skill}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {program.education_path && (
                          <div>
                            <strong>Education Path:</strong>
                            <p>{program.education_path[0]}</p>
                          </div>
                        )}
                      </div>
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

export default Colleges;