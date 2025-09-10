import { useState } from 'react';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import './CareerPaths.css';

const CareerPaths = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pathNodes = [
    {
      id: 'cs',
      title: 'Computer Science',
      description: 'B.Tech in CS',
      details: 'A 4-year program covering programming, algorithms, and systems.',
      subjects: ['Data Structures', 'DBMS', 'Operating Systems', 'Algorithms'],
      position: { top: '50px', left: '100px' }
    },
    {
      id: 'swe',
      title: 'Software Engineer',
      description: 'Build Applications',
      details: 'Design, develop, and maintain software applications.',
      skills: ['Java, Python, C++', 'Git Version Control', 'Problem-solving'],
      position: { top: '200px', left: '300px' }
    },
    {
      id: 'ds',
      title: 'Data Scientist',
      description: 'Analyze Data',
      details: 'Extract insights from large datasets using statistical methods.',
      skills: ['Python, R, SQL', 'Machine Learning', 'Statistics'],
      position: { top: '100px', left: '500px' }
    },
    {
      id: 'pm',
      title: 'Product Manager',
      description: 'Lead Products',
      details: 'Guide product development from conception to launch.',
      skills: ['Strategy', 'Communication', 'Analytics'],
      position: { top: '300px', left: '500px' }
    },
    {
      id: 'tl',
      title: 'Tech Lead',
      description: 'Lead Teams',
      details: 'Guide technical teams and make architectural decisions.',
      skills: ['Leadership', 'System Design', 'Mentoring'],
      position: { top: '200px', left: '700px' }
    }
  ];

  const connections = [
    { from: 'cs', to: 'swe', style: { top: '120px', left: '220px', width: '80px', transform: 'rotate(45deg)' }},
    { from: 'swe', to: 'ds', style: { top: '170px', left: '420px', width: '80px', transform: 'rotate(-45deg)' }},
    { from: 'swe', to: 'tl', style: { top: '270px', left: '620px', width: '80px', transform: 'rotate(0deg)' }}
  ];

  const handleNodeClick = (node) => {
    setSelectedNode(node);
    setIsModalOpen(true);
  };

  return (
    <div className="career-paths-section">
      <div className="section-header">
        <h1 className="section-title">Career Path Explorer</h1>
        <p className="section-subtitle">Discover how your education connects to exciting career opportunities</p>
      </div>

      <div className="path-explorer">
        {pathNodes.map(node => (
          <div
            key={node.id}
            className="path-node tooltip"
            style={node.position}
            data-tooltip={node.description}
            onClick={() => handleNodeClick(node)}
          >
            {node.title}
          </div>
        ))}

        {connections.map((connection, index) => (
          <div
            key={index}
            className="path-connection"
            style={connection.style}
          />
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedNode?.title || ''}
      >
        {selectedNode && (
          <div className="node-modal-content">
            <h3>{selectedNode.description}</h3>
            <p>{selectedNode.details}</p>
            
            {selectedNode.subjects && (
              <>
                <h4 style={{ color: '#0D7377', marginTop: '1rem' }}>Core Subjects:</h4>
                <ul style={{ textAlign: 'left', margin: '1rem 0', paddingLeft: '1rem' }}>
                  {selectedNode.subjects.map(subject => (
                    <li key={subject}>{subject}</li>
                  ))}
                </ul>
              </>
            )}
            
            {selectedNode.skills && (
              <>
                <h4 style={{ color: '#0D7377', marginTop: '1rem' }}>Required Skills:</h4>
                <ul style={{ textAlign: 'left', margin: '1rem 0', paddingLeft: '1rem' }}>
                  {selectedNode.skills.map(skill => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CareerPaths;
