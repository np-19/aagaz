import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Brain, 
  School, 
  Route, 
  Calendar, 
  BookOpen, 
  Settings,
  Target,
  X
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ isOpen, onSectionChange }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'quiz', label: 'Career Quiz', icon: Brain, path: '/quiz' },
    { id: 'colleges', label: 'Colleges', icon: School, path: '/colleges' },
    { id: 'paths', label: 'Career Paths', icon: Route, path: '/career-paths' },
    { id: 'timeline', label: 'Timeline', icon: Calendar, path: '/timeline' },
    { id: 'recommendations', label: 'Recommendations', icon: Target, path: '/recommendations' },
    { id: 'resources', label: 'Resources', icon: BookOpen, path: '/resources' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (onSectionChange) onSectionChange();
  };

  if (!isOpen) return null;

  return (
    <div
      className="sidebar-override"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '280px',
        height: '100vh',
        minHeight: '100vh',
        maxHeight: '100vh',
        backgroundColor: 'white',
        borderRight: '1px solid #e5e7eb',
        boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
        zIndex: 9999,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        margin: 0,
        padding: 0,
        transform: 'translateZ(0)'
      }}
    >
      {/* Logo Section */}
      <div style={{
        height: '80px',
        padding: '0 1rem',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f8fafc'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginLeft: '1rem'
        }}>
          <img 
            src="/logo.png" 
            alt="Aagaz Logo" 
            style={{
              height: '70px',
              width: 'auto'
            }}
          />
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSectionChange();
          }}
          style={{
            background: '#f3f4f6',
            border: '1px solid #d1d5db',
            cursor: 'pointer',
            padding: '0.75rem',
            borderRadius: '8px',
            color: '#374151',
            transition: 'all 0.2s ease',
            minWidth: '40px',
            minHeight: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#ef4444';
            e.target.style.color = 'white';
            e.target.style.borderColor = '#ef4444';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#f3f4f6';
            e.target.style.color = '#374151';
            e.target.style.borderColor = '#d1d5db';
          }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Navigation Menu */}
      <nav style={{ 
        padding: '2rem 1rem',
        flex: 1
      }}>
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                width: '100%',
                padding: '0.75rem 1rem',
                marginBottom: '0.5rem',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: isActive ? '#0d7377' : 'transparent',
                color: isActive ? 'white' : '#374151',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.target.style.backgroundColor = '#f3f4f6';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <IconComponent size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
