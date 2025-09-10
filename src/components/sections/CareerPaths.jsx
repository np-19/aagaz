import { useState } from 'react';
import { GraduationCap, Code, BarChart3, Users, Crown, ArrowRight, Star, TrendingUp, Award, Target } from 'lucide-react';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import './CareerPaths.css';

const CareerPaths = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(null);

  const pathNodes = [
    {
      id: 'cs',
      title: 'Computer Science',
      description: 'B.Tech in CS',
      details: 'A comprehensive 4-year program covering programming, algorithms, and systems architecture.',
      subjects: ['Data Structures & Algorithms', 'Database Management', 'Operating Systems', 'Software Engineering'],
      icon: GraduationCap,
      color: '#3B82F6',
      level: 1,
      duration: '4 years',
      difficulty: 'Advanced',
      salary: '₹6-12 LPA'
    },
    {
      id: 'swe',
      title: 'Software Engineer',
      description: 'Full Stack Developer',
      details: 'Design, develop, and maintain scalable software applications using modern technologies.',
      skills: ['React, Node.js, Python', 'Git & DevOps', 'Problem Solving', 'System Design'],
      icon: Code,
      color: '#10B981',
      level: 2,
      duration: '2-3 years exp',
      difficulty: 'Intermediate',
      salary: '₹8-18 LPA'
    },
    {
      id: 'ds',
      title: 'Data Scientist',
      description: 'AI/ML Specialist',
      details: 'Extract insights from complex datasets using machine learning and statistical analysis.',
      skills: ['Python, R, SQL', 'Machine Learning', 'Statistics & Analytics', 'Data Visualization'],
      icon: BarChart3,
      color: '#8B5CF6',
      level: 3,
      duration: '3-4 years exp',
      difficulty: 'Advanced',
      salary: '₹12-25 LPA'
    },
    {
      id: 'pm',
      title: 'Product Manager',
      description: 'Strategy Leader',
      details: 'Guide product development from conception to launch, working with cross-functional teams.',
      skills: ['Strategic Planning', 'User Research', 'Analytics & Metrics', 'Leadership'],
      icon: Users,
      color: '#F59E0B',
      level: 3,
      duration: '4-5 years exp',
      difficulty: 'Expert',
      salary: '₹15-30 LPA'
    },
    {
      id: 'tl',
      title: 'Tech Lead',
      description: 'Technical Leader',
      details: 'Lead engineering teams and make critical architectural decisions for large-scale systems.',
      skills: ['System Architecture', 'Team Leadership', 'Code Review', 'Technical Strategy'],
      icon: Crown,
      color: '#EF4444',
      level: 4,
      duration: '5+ years exp',
      difficulty: 'Expert',
      salary: '₹20-40 LPA'
    }
  ];

  const pathConnections = [
    { from: 'cs', to: 'swe', progress: 85 },
    { from: 'swe', to: 'ds', progress: 70 },
    { from: 'swe', to: 'pm', progress: 60 },
    { from: 'swe', to: 'tl', progress: 75 },
    { from: 'ds', to: 'tl', progress: 65 }
  ];

  const handleNodeClick = (node) => {
    setSelectedNode(node);
    setIsModalOpen(true);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-blue-600 bg-blue-100';
      case 'Advanced': return 'text-purple-600 bg-purple-100';
      case 'Expert': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="career-paths-section">
      <div className="section-header">
        <div className="header-content">
          <h1 className="section-title">Career Path Explorer</h1>
          <p className="section-subtitle">Discover your journey from education to dream career</p>
          <div className="stats-row">
            <div className="stat-item">
              <TrendingUp size={20} />
              <span>5 Career Paths</span>
            </div>
            <div className="stat-item">
              <Award size={20} />
              <span>₹6-40 LPA Range</span>
            </div>
            <div className="stat-item">
              <Target size={20} />
              <span>85% Success Rate</span>
            </div>
          </div>
        </div>
      </div>

      <div className="path-explorer">
        <div className="path-grid">
          {pathNodes.map((node, index) => {
            const IconComponent = node.icon;
            return (
              <Card 
                key={node.id} 
                className={`path-card level-${node.level}`}
                hover
                onClick={() => handleNodeClick(node)}
                onMouseEnter={() => setHoveredPath(node.id)}
                onMouseLeave={() => setHoveredPath(null)}
              >
                <div className="card-header">
                  <div className="icon-container" style={{ backgroundColor: node.color }}>
                    <IconComponent size={24} />
                  </div>
                  <div className="level-badge">Level {node.level}</div>
                </div>
                
                <div className="card-content">
                  <h3 className="node-title">{node.title}</h3>
                  <p className="node-description">{node.description}</p>
                  
                  <div className="node-stats">
                    <div className="stat">
                      <span className="label">Duration</span>
                      <span className="value">{node.duration}</span>
                    </div>
                    <div className="stat">
                      <span className="label">Salary</span>
                      <span className="value">{node.salary}</span>
                    </div>
                  </div>
                  
                  <div className={`difficulty-badge ${getDifficultyColor(node.difficulty)}`}>
                    {node.difficulty}
                  </div>
                </div>
                
                <div className="card-footer">
                  <button className="explore-btn">
                    Explore Path
                    <ArrowRight size={16} />
                  </button>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="connections-info">
          <h3>Career Progression Paths</h3>
          <div className="connection-list">
            {pathConnections.map((conn, index) => {
              const fromNode = pathNodes.find(n => n.id === conn.from);
              const toNode = pathNodes.find(n => n.id === conn.to);
              return (
                <div key={index} className="connection-item">
                  <div className="connection-path">
                    <span className="from">{fromNode?.title}</span>
                    <ArrowRight size={16} className="arrow" />
                    <span className="to">{toNode?.title}</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${conn.progress}%` }}
                    />
                  </div>
                  <span className="progress-text">{conn.progress}% transition rate</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedNode?.title || ''}
      >
        {selectedNode && (
          <div className="node-modal-content">
            <div className="modal-header-content">
              <div className="modal-icon" style={{ backgroundColor: selectedNode.color }}>
                {selectedNode.icon && <selectedNode.icon size={32} />}
              </div>
              <div className="modal-info">
                <h3>{selectedNode.description}</h3>
                <p>{selectedNode.details}</p>
                <div className="modal-stats">
                  <div className="modal-stat">
                    <Star size={16} />
                    <span>{selectedNode.salary}</span>
                  </div>
                  <div className="modal-stat">
                    <Award size={16} />
                    <span>{selectedNode.difficulty}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {selectedNode.subjects && (
              <div className="skills-section">
                <h4>Core Subjects</h4>
                <div className="skills-grid">
                  {selectedNode.subjects.map(subject => (
                    <div key={subject} className="skill-tag subject">
                      {subject}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {selectedNode.skills && (
              <div className="skills-section">
                <h4>Required Skills</h4>
                <div className="skills-grid">
                  {selectedNode.skills.map(skill => (
                    <div key={skill} className="skill-tag skill">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CareerPaths;
