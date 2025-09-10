import { useState } from 'react';
import { Search, FileText, Video, Book, Target } from 'lucide-react';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import './Resources.css';

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedResource, setSelectedResource] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const resources = [
    {
      id: 'algorithms',
      title: 'Introduction to Algorithms',
      description: 'Comprehensive guide covering fundamental algorithms and data structures',
      type: 'pdf',
      pages: 324,
      rating: 4.8,
      status: 'Trending',
      category: 'pdf'
    },
    {
      id: 'python',
      title: 'Python Programming Masterclass',
      description: 'Complete Python course from basics to advanced topics',
      type: 'video',
      duration: '24 hours',
      rating: 4.9,
      students: '15K',
      category: 'video'
    },
    {
      id: 'math',
      title: 'Engineering Mathematics',
      description: 'Essential mathematics for engineering students',
      type: 'book',
      pages: 542,
      rating: 4.7,
      status: 'Best Seller',
      category: 'book'
    },
    {
      id: 'jee',
      title: 'JEE Main Practice Papers',
      description: 'Latest pattern practice tests with detailed solutions',
      type: 'pdf',
      tests: 50,
      rating: 4.6,
      status: 'Exam Prep',
      category: 'practice'
    }
  ];

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'video', label: 'Videos' },
    { id: 'pdf', label: 'PDFs' },
    { id: 'book', label: 'Books' },
    { id: 'practice', label: 'Practice Tests' }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || resource.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleResourceClick = (resource) => {
    setSelectedResource(resource);
    setIsModalOpen(true);
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case 'pdf': return FileText;
      case 'video': return Video;
      case 'book': return Book;
      default: return Target;
    }
  };

  const getResourceColor = (type) => {
    switch (type) {
      case 'pdf': return { background: 'rgba(255, 82, 82, 0.1)', color: '#ff5252' };
      case 'video': return { background: 'rgba(76, 175, 80, 0.1)', color: '#4caf50' };
      case 'book': return { background: 'rgba(255, 193, 7, 0.1)', color: '#ffc107' };
      default: return { background: 'rgba(13, 115, 119, 0.1)', color: '#0D7377' };
    }
  };

  return (
    <div className="resources-section">
      <div className="section-header">
        <h1 className="section-title">Study Materials & Resources</h1>
        <p className="section-subtitle">Curated content to support your learning journey</p>
      </div>

      <div className="search-container">
        <div className="search-input-wrapper">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search resources by topic, type, or subject..."
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

      <div className="resource-grid">
        {filteredResources.map(resource => {
          const IconComponent = getResourceIcon(resource.type);
          const colorStyle = getResourceColor(resource.type);
          
          return (
            <Card key={resource.id} variant="resource" hover onClick={() => handleResourceClick(resource)}>
              <div className="resource-type" style={colorStyle}>
                {resource.type.toUpperCase()}
              </div>
              <div className="resource-icon">
                <IconComponent size={32} color={colorStyle.color} />
              </div>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <div className="resource-meta">
                {resource.pages && `📄 ${resource.pages} pages`}
                {resource.duration && `🎥 ${resource.duration}`}
                {resource.tests && `📝 ${resource.tests} tests`}
                {resource.students && `👥 ${resource.students} students`}
                • ⭐ {resource.rating} rating
                {resource.status && ` • 🔥 ${resource.status}`}
              </div>
            </Card>
          );
        })}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedResource?.title || ''}
      >
        {selectedResource && (
          <div className="resource-modal-content">
            <div className="resource-modal-icon">
              {React.createElement(getResourceIcon(selectedResource.type), { 
                size: 48, 
                color: getResourceColor(selectedResource.type).color 
              })}
            </div>
            <h3>{selectedResource.title}</h3>
            <p>{selectedResource.description}</p>
            <div className="resource-modal-meta">
              <p><strong>Rating:</strong> ⭐ {selectedResource.rating}</p>
              {selectedResource.pages && <p><strong>Pages:</strong> {selectedResource.pages}</p>}
              {selectedResource.duration && <p><strong>Duration:</strong> {selectedResource.duration}</p>}
              {selectedResource.status && <p><strong>Status:</strong> {selectedResource.status}</p>}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Resources;
