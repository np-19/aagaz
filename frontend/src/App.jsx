import { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Landing from './components/sections/Landing';
import Dashboard from './components/sections/Dashboard';
import Quiz from './components/sections/Quiz';
import Colleges from './components/sections/Colleges';
import CareerPaths from './components/sections/CareerPaths';
import Timeline from './components/sections/Timeline';
import Recommendations from './components/sections/Recommendations';
import Resources from './components/sections/Resources';
import Settings from './components/sections/Settings';
import './styles/globals.css';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('landing');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarOpen && !e.target.closest('.sidebar') && !e.target.closest('.hamburger-menu')) {
        setSidebarOpen(false);
      }
      if (notificationsOpen && !e.target.closest('.notification-panel') && !e.target.closest('.notification-bell')) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [sidebarOpen, notificationsOpen]);

  const renderSection = () => {
    switch (activeSection) {
      case 'landing':
        return <Landing onNavigate={handleSectionChange} />;
      case 'dashboard':
        return <Dashboard onNavigate={handleSectionChange} />;
      case 'quiz':
        return <Quiz onNavigate={handleSectionChange} />;
      case 'colleges':
        return <Colleges />;
      case 'paths':
        return <CareerPaths />;
      case 'timeline':
        return <Timeline />;
      case 'recommendations':
        return <Recommendations onNavigate={handleSectionChange} />;
      case 'resources':
        return <Resources />;
      case 'settings':
        return <Settings />;
      default:
        return <Landing onNavigate={handleSectionChange} />;
    }
  };

  return (
    <div className="app">
      {activeSection !== 'landing' && (
        <>
          <Navbar
            onToggleSidebar={toggleSidebar}
            onToggleNotifications={toggleNotifications}
            notificationCount={notificationCount}
          />
          
          <Sidebar
            isOpen={sidebarOpen}
            onSectionChange={handleSectionChange}
            activeSection={activeSection}
          />
        </>
      )}
      
      <main className={activeSection === 'landing' ? 'landing-main' : 'main-content'}>
        <div className="content-section active">
          {renderSection()}
        </div>
      </main>

      {notificationsOpen && (
        <div className="notification-panel open">
          <h3 style={{ marginBottom: '2rem', color: '#212121' }}>Notifications</h3>
          
          <div className="notification-item unread">
            <h4> New Career Match Found!</h4>
            <p>Based on your recent quiz, we found 3 new career paths that match your interests.</p>
            <small style={{ color: '#323232' }}>2 hours ago</small>
          </div>

          <div className="notification-item unread">
            <h4> Upcoming Deadline</h4>
            <p>College application deadline for IIT Delhi is in 5 days. Don't forget to submit!</p>
            <small style={{ color: '#323232' }}>1 day ago</small>
          </div>

          <div className="notification-item">
            <h4> New Study Material</h4>
            <p>JEE Main practice papers for 2025 are now available in your resources.</p>
            <small style={{ color: '#323232' }}>3 days ago</small>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
