import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, Bell, User, X } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import ProfileDropdown from '../ui/ProfileDropdown';
import './Navbar.css';

const Navbar = ({ onToggleSidebar, onToggleNotifications, notificationCount, sidebarOpen, isMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSignedIn } = useUser();

  const handleNavigation = (path) => {
    navigate(path);
    // Auto-scroll to top
    window.scrollTo(0, 0);
    // Don't close sidebar from navbar - let MainLayout handle it
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="hamburger-menu" onClick={(e) => {
          e.stopPropagation();
          onToggleSidebar();
        }}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="navbar-brand" onClick={() => navigate('/')} style={{ marginLeft: '1rem' }}>
          <img 
            src="/logo.png" 
            alt="Aagaz Logo" 
            style={{
              height: '60px',
              width: 'auto',
              cursor: 'pointer'
            }}
          />
        </div>
      </div>

      <div className="navbar-center">
        <div className="nav-links">
          <button 
            className={location.pathname === '/dashboard' ? 'active' : ''} 
            onClick={() => handleNavigation('/dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={location.pathname === '/quiz' ? 'active' : ''} 
            onClick={() => handleNavigation('/quiz')}
          >
            Career Quiz
          </button>
          <button 
            className={location.pathname === '/colleges' ? 'active' : ''} 
            onClick={() => handleNavigation('/colleges')}
          >
            Colleges
          </button>
          <button 
            className={location.pathname === '/career-paths' ? 'active' : ''} 
            onClick={() => handleNavigation('/career-paths')}
          >
            Career Paths
          </button>
        </div>
      </div>

      <div className="navbar-right">
        <button className="notification-bell" onClick={onToggleNotifications}>
          <Bell size={20} />
          {notificationCount > 0 && (
            <span className="notification-badge">{notificationCount}</span>
          )}
        </button>
        
        {isSignedIn ? (
          <ProfileDropdown />
        ) : (
          <div className="user-profile" onClick={() => handleNavigation('/settings')}>
            <User size={20} />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
