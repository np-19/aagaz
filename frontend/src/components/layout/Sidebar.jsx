import { BarChart3, Brain, Route, School, Calendar, Star, BookOpen, Settings } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ isOpen, onSectionChange, activeSection }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'quiz', label: 'Aptitude Quiz', icon: Brain },
    { id: 'paths', label: 'Career Paths', icon: Route },
    { id: 'colleges', label: 'Colleges', icon: School },
    { id: 'timeline', label: 'Timeline', icon: Calendar },
    { id: 'recommendations', label: 'Recommendations', icon: Star },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <ul className="sidebar-menu">
        {menuItems.map(item => {
          const IconComponent = item.icon;
          return (
            <li key={item.id}>
              <a 
                href="#" 
                className={activeSection === item.id ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  onSectionChange(item.id);
                }}
              >
                <span className="icon">
                  <IconComponent size={20} />
                </span>
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
