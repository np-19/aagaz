import { useState } from 'react';
import { Search, MapPin, Star } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import './Colleges.css';

const Colleges = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const colleges = [
    {
      id: 'mit',
      name: 'MIT Delhi Campus',
      location: 'New Delhi, Delhi',
      rating: 4.8,
      reviews: 2341,
      type: 'Premium Institution',
      features: ['Research', 'Technology', 'Innovation'],
      category: 'engineering'
    },
    {
      id: 'iit',
      name: 'IIT Delhi',
      location: 'Hauz Khas, Delhi',
      rating: 4.9,
      reviews: 3892,
      type: 'Top Ranked',
      features: ['Engineering', 'Research', 'Placement'],
      category: 'engineering'
    },
    {
      id: 'du',
      name: 'Delhi University',
      location: 'North Campus, Delhi',
      rating: 4.2,
      reviews: 5672,
      type: 'Public University',
      features: ['Liberal Arts', 'Commerce', 'Science'],
      category: 'arts'
    }
  ];

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'engineering', label: 'Engineering' },
    { id: 'business', label: 'Business' },
    { id: 'arts', label: 'Arts & Sciences' },
    { id: 'nearby', label: 'Nearby' }
  ];

  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || college.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleCollegeClick = (college) => {
    setSelectedCollege(college);
    setIsModalOpen(true);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        fill={i < Math.floor(rating) ? '#14FFEC' : 'none'}
        color="#14FFEC"
      />
    ));
  };

  return (
    <div className="colleges-section">
      <div className="section-header">
        <h1 className="section-title">College Directory</h1>
        <p className="section-subtitle">Find the perfect institution for your educational journey</p>
      </div>

      <div className="search-container">
        <div className="search-input-wrapper">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search colleges by name, location, or program..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="filter-chips">
        {filters.map(filter => (
          <div
            key={filter.id}
            className={`filter-chip ${activeFilter === filter.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </div>
        ))}
      </div>

      <div className="college-grid">
        {filteredColleges.map(college => (
          <Card key={college.id} variant="college" hover onClick={() => handleCollegeClick(college)}>
            <div className="college-image">
              <div className="college-badge">{college.type}</div>
            </div>
            <div className="college-info">
              <h3 className="college-name">{college.name}</h3>
              <p className="college-location">
                <MapPin size={16} />
                {college.location}
              </p>
              <div className="college-rating">
                <div className="stars">
                  {renderStars(college.rating)}
                </div>
                <span>{college.rating} ({college.reviews.toLocaleString()} reviews)</span>
              </div>
              <div className="college-features">
                {college.features.map(feature => (
                  <span key={feature} className="feature-tag">{feature}</span>
                ))}
              </div>
              <Button onClick={(e) => { e.stopPropagation(); handleCollegeClick(college); }}>
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedCollege?.name || ''}
      >
        {selectedCollege && (
          <div className="college-modal-content">
            <div className="college-modal-header">
              <p><MapPin size={16} /> {selectedCollege.location} | 🏆 {selectedCollege.type}</p>
              <div className="college-modal-rating">
                <h4>NIRF Ranking: #2</h4>
                <p>Average Package: ₹17.5 LPA</p>
              </div>
            </div>
            <Button>View Cutoffs</Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Colleges;
