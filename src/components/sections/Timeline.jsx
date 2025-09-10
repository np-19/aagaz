import { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import Modal from '../ui/Modal';
import './Timeline.css';

const Timeline = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const timelineEvents = [
    {
      id: 'admission',
      title: 'College Admissions',
      date: 'March 15, 2025',
      description: 'Complete applications for top choice colleges',
      type: 'deadline',
      details: {
        timeLeft: '67 days',
        status: 'Pending',
        requirements: ['Application Form', 'Transcripts', 'Essays', 'Recommendation Letters']
      }
    },
    {
      id: 'exam',
      title: 'JEE Main Exam',
      date: 'April 8, 2025',
      description: 'National engineering entrance examination',
      type: 'exam',
      details: {
        timeLeft: '91 days',
        mockScore: '248/300 | 96.8 Percentile',
        syllabus: ['Physics', 'Chemistry', 'Mathematics']
      }
    },
    {
      id: 'scholarship',
      title: 'Scholarship Applications',
      date: 'May 20, 2025',
      description: 'Apply for merit-based financial aid programs',
      type: 'deadline',
      details: {
        timeLeft: '133 days',
        amount: 'Up to ₹2,00,000',
        eligibility: 'Merit-based, Income criteria'
      }
    },
    {
      id: 'results',
      title: 'Results Announcement',
      date: 'June 15, 2025',
      description: 'College admission decisions released',
      type: 'result',
      details: {
        timeLeft: '159 days',
        expectedColleges: ['IIT Delhi', 'IIT Bombay', 'BITS Pilani'],
        nextSteps: 'Counseling and Seat Allocation'
      }
    }
  ];

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  return (
    <div className="timeline-section">
      <div className="section-header">
        <h1 className="section-title">Academic Timeline</h1>
        <p className="section-subtitle">Stay on track with important dates and deadlines</p>
      </div>

      <div className="timeline-container">
        <div className="timeline">
          {timelineEvents.map((event, index) => (
            <div key={event.id} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content" onClick={() => handleEventClick(event)}>
                <div className="timeline-icon">
                  {event.type === 'exam' ? <Clock size={20} /> : <Calendar size={20} />}
                </div>
                <h3>{event.title}</h3>
                <p><strong>Due: {event.date}</strong></p>
                <p>{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedEvent?.title || ''}
      >
        {selectedEvent && (
          <div className="timeline-modal-content">
            <p><strong>Date:</strong> {selectedEvent.date}</p>
            {selectedEvent.details.timeLeft && (
              <p><strong>Time Left:</strong> {selectedEvent.details.timeLeft}</p>
            )}
            
            {selectedEvent.details.mockScore && (
              <div style={{ margin: '2rem 0' }}>
                <h4 style={{ color: '#0D7377' }}>Mock Test Score:</h4>
                <p>{selectedEvent.details.mockScore}</p>
              </div>
            )}
            
            {selectedEvent.details.requirements && (
              <div style={{ margin: '2rem 0' }}>
                <h4 style={{ color: '#0D7377' }}>Requirements:</h4>
                <ul style={{ textAlign: 'left', paddingLeft: '1rem' }}>
                  {selectedEvent.details.requirements.map(req => (
                    <li key={req}>{req}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {selectedEvent.details.syllabus && (
              <div style={{ margin: '2rem 0' }}>
                <h4 style={{ color: '#0D7377' }}>Syllabus:</h4>
                <ul style={{ textAlign: 'left', paddingLeft: '1rem' }}>
                  {selectedEvent.details.syllabus.map(subject => (
                    <li key={subject}>{subject}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Timeline;
