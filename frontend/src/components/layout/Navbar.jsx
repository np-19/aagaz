import { useState } from 'react';
import { Menu, Bell } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ onToggleSidebar, onToggleNotifications, notificationCount = 0 }) => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'quiz', label: 'Aptitude Test' },
    { id: 'paths', label: 'Career Paths' },
    { id: 'colleges', label: 'Colleges' }
  ];

  return (
    <nav className="navbar">
      <div className="logo">
        Aagaz
      </div>
      
      <button className="hamburger-menu" onClick={onToggleSidebar}>
        <Menu size={24} />
      </button>
      
      <ul className="nav-links">
        {navItems.map(item => (
          <li key={item.id}>
            <a 
              href="#" 
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveSection(item.id);
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      
      <div className="user-profile">
        <div className="notification-bell" onClick={onToggleNotifications}>
          <Bell size={20} />
          {notificationCount > 0 && (
            <div className="notification-badge">{notificationCount}</div>
          )}
        </div>
        <div className="avatar">AK</div>
      </div>
    </nav>
  );
};

export default Navbar;
