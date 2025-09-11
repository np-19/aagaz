import { useState, useEffect } from 'react';
import { Search, MapPin, School, GraduationCap, Award, Building2, Target, ArrowLeft } from 'lucide-react';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { collegeAPI } from '../../utils/api';
import './CollegesNew.css';

const CollegesNew = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadColleges();
  }, []);

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
          id: 1,
          name: 'IIT Jammu',
          type: 'JK',
          location: 'Jammu',
          rating: 4.5,
          programs: ['Computer Science', 'Mechanical Engineering', 'Electrical Engineering'],
          clusters: ['Engineering & Technology'],
          admissionDeadline: '2025-12-31',
          fees: '₹2.5L/year',
          facilities: ['Library', 'Labs', 'Sports Complex', 'Hostels'],
          achievements: ['NIRF Rank: 45', 'NBA Accredited']
        },
        {
          id: 2,
          name: 'NIT Srinagar',
          type: 'JK',
          location: 'Srinagar',
          rating: 4.3,
          programs: ['Computer Science', 'Civil Engineering', 'Electronics'],
          clusters: ['Engineering & Technology'],
          admissionDeadline: '2025-12-15',
          fees: '₹1.8L/year',
          facilities: ['Library', 'Labs', 'Hostels'],
          achievements: ['NIRF Rank: 65']
        },
        // Add more mock colleges...
      ];
      setColleges(mockData);
    } finally {
      setLoading(false);
    }
  };

  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (college.location && college.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (college.programs && college.programs.some(program => program.toLowerCase().includes(searchTerm.toLowerCase())));

    const matchesCategory = selectedCategory === 'all' ||
      (selectedCategory === 'jk' && college.type === 'JK') ||
      (selectedCategory === 'national' && college.type === 'National');

    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', label: 'All Colleges', icon: School },
    { id: 'jk', label: 'J&K Colleges', icon: MapPin },
    { id: 'national', label: 'National Colleges', icon: Award }
  ];

  const handleViewDetails = (college) => {
    setSelectedCollege(college);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="colleges-container">
        <div className="loading-state">
          <GraduationCap className="animate-pulse" size={48} />
          <h2>Loading Colleges...</h2>
          <p>Please wait while we fetch the latest information</p>
        </div>
      </div>
    );
  }

  return (
    <div className="colleges-container">
      {/* Header Section */}
      <div className="colleges-header">
        <div className="header-content">
          <h1>Find Your Perfect College</h1>
          <p>Explore top colleges and universities in Jammu & Kashmir and across India</p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="search-section">
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search by college name, location, or program..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="category-tabs">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <category.icon size={20} />
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Colleges Grid */}
      <div className="colleges-grid">
        {filteredColleges.length > 0 ? (
          filteredColleges.map(college => (
            <Card key={college.name} className="college-card">
              <div className="college-header">
                <div className="college-type-badge" data-type={college.type.toLowerCase()}>
                  {college.type === 'JK' ? 'J&K College' : 'National'}
                </div>
                <h3>{college.name}</h3>
                {college.location &&
                  <p className="college-location">
                    <MapPin size={16} />
                    {college.location}
                  </p>
                }
              </div>

              <div className="college-info">
                {college.clusters &&
                  <div className="info-row">
                    <Building2 size={16} />
                    <span>{college.clusters.join(', ')}</span>
                  </div>
                }
                {college.programs &&
                <div className="info-row">
                  <GraduationCap size={16} />
                  <span>{college.programs.length} Programs</span>
                </div>
                }
                {college.rating && (
                  <div className="info-row">
                    <Award size={16} />
                    <span>{college.rating} Rating</span>
                  </div>
                )}
              </div>

              {(college.fees || college.admissionDeadline) &&
              <div className="college-highlights">
                {college.fees &&
                <div className="highlight">
                  <strong>Fees:</strong> {college.fees}
                </div>
                }
                {college.admissionDeadline &&
                <div className="highlight">
                  <strong>Deadline:</strong> {new Date(college.admissionDeadline).toLocaleDateString()}
                </div>
                }
              </div>
              }

              {college.achievements &&
              <div className="achievements-section">
                {college.achievements.map((achievement, index) => (
                  <span key={index} className="achievement-badge">{achievement}</span>
                ))}
              </div>
              }

              <Button 
                className="view-details-btn"
                onClick={() => handleViewDetails(college)}
                variant="primary"
                fullWidth
              >
                View Details
              </Button>
            </Card>
          ))
        ) : (
          <div className="no-results">
            <Target size={48} />
            <h3>No colleges found</h3>
            <p>Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* College Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="College Details"
      >
        {selectedCollege && (
          <div className="college-details-modal">
            <div className="modal-header">
              <h2>{selectedCollege.name}</h2>
              <span className="college-type" data-type={selectedCollege.type.toLowerCase()}>
                {selectedCollege.type === 'JK' ? 'J&K College' : 'National College'}
              </span>
            </div>

            <div className="modal-sections">
              <section className="modal-section">
                <h3>Overview</h3>
                <div className="overview-grid">
                  {selectedCollege.location &&
                  <div className="overview-item">
                    <MapPin size={20} />
                    <div>
                      <strong>Location</strong>
                      <p>{selectedCollege.location}</p>
                    </div>
                  </div>
                  }
                  {selectedCollege.rating &&
                  <div className="overview-item">
                    <Award size={20} />
                    <div>
                      <strong>Rating</strong>
                      <p>{selectedCollege.rating} / 5.0</p>
                    </div>
                  </div>
                  }
                  {selectedCollege.clusters &&
                  <div className="overview-item">
                    <School size={20} />
                    <div>
                      <strong>Fields</strong>
                      <p>{selectedCollege.clusters.join(', ')}</p>
                    </div>
                  </div>
                  }
                </div>
              </section>

              {selectedCollege.programs &&
              <section className="modal-section">
                <h3>Programs Offered</h3>
                <div className="programs-grid">
                  {selectedCollege.programs.map((program, index) => (
                    <div key={index} className="program-card">
                      <GraduationCap size={20} />
                      <span>{program}</span>
                    </div>
                  ))}
                </div>
              </section>
              }

              {selectedCollege.facilities &&
              <section className="modal-section">
                <h3>Facilities</h3>
                <div className="facilities-grid">
                  {selectedCollege.facilities.map((facility, index) => (
                    <div key={index} className="facility-item">
                      <Building2 size={20} />
                      <span>{facility}</span>
                    </div>
                  ))}
                </div>
              </section>
              }

              {selectedCollege.achievements &&
              <section className="modal-section">
                <h3>Achievements</h3>
                <div className="achievements-grid">
                  {selectedCollege.achievements.map((achievement, index) => (
                    <div key={index} className="achievement-item">
                      <Award size={20} />
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>
              </section>
              }

              {(selectedCollege.admissionDeadline || selectedCollege.fees) &&
              <section className="modal-section">
                <h3>Admission Details</h3>
                <div className="admission-info">
                  {selectedCollege.admissionDeadline &&
                  <div className="info-item">
                    <strong>Application Deadline:</strong>
                    <span>{new Date(selectedCollege.admissionDeadline).toLocaleDateString()}</span>
                  </div>
                  }
                  {selectedCollege.fees &&
                  <div className="info-item">
                    <strong>Annual Fees:</strong>
                    <span>{selectedCollege.fees}</span>
                  </div>
                  }
                </div>
              </section>
              }
            </div>

            <div className="modal-actions">
              <Button variant="primary">Apply Now</Button>
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CollegesNew;