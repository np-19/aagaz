import { useState, useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const MainLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [isMobile, setIsMobile] = useState(false);
  // Handle sidebar state on screen size change only
  useEffect(() => {
    // Only set initial state based on screen size, don't close on navigation
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 992);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarOpen && !e.target.closest('.sidebar-override') && !e.target.closest('.hamburger-menu')) {
        setSidebarOpen(false);
      }
      if (notificationsOpen && !e.target.closest('.notification-panel') && !e.target.closest('.notification-bell')) {
        setNotificationsOpen(false);
      }
    };

    const handleTouchStart = (e) => {
      if (isMobile && sidebarOpen && !e.target.closest('.sidebar-override')) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen || notificationsOpen) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('touchstart', handleTouchStart);
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, [sidebarOpen, notificationsOpen, isMobile]);


  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isMobile && sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobile, sidebarOpen]);

  const isStandalonePage = location.pathname === '/' || location.pathname === '/features' || location.pathname === '/testimonials';

  return (
    <div className="app">
      {!isStandalonePage && (
        <>
          <Navbar
            onToggleSidebar={toggleSidebar}
            onToggleNotifications={toggleNotifications}
            notificationCount={notificationCount}
          />
          <Sidebar
            isOpen={sidebarOpen}
            onSectionChange={() => setSidebarOpen(false)}
            isMobile={isMobile}
          />
        </>
      )}

      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="mobile-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className={isStandalonePage ? 'standalone-main' : `main-content ${!sidebarOpen ? 'sidebar-closed' : ''}`}>
        <div className="content-section active">
          <Outlet />
        </div>
      </main>

      {!isStandalonePage && notificationsOpen && (
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
};

export default MainLayout;
