import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser, UserButton } from '@clerk/clerk-react';
import { Menu, Bell, User, X } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ onToggleSidebar, onToggleNotifications, notificationCount, sidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

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
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={location.pathname === '/quiz' ? 'active' : ''} 
            onClick={() => navigate('/quiz')}
          >
            Career Quiz
          </button>
          <button 
            className={location.pathname === '/colleges' ? 'active' : ''} 
            onClick={() => navigate('/colleges')}
          >
            Colleges
          </button>
          <button 
            className={location.pathname === '/career-paths' ? 'active' : ''} 
            onClick={() => navigate('/career-paths')}
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
        
        <div className="user-profile">
          {user ? (
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8"
                }
              }}
            />
          ) : (
            <User size={20} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
