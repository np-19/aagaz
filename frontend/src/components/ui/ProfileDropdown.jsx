import { useState, useRef, useEffect } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, LogOut, ChevronDown } from 'lucide-react';
import './ProfileDropdown.css';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    signOut();
    setIsOpen(false);
  };

  const handleProfile = () => {
    navigate('/settings');
    setIsOpen(false);
  };

  if (!user) return null;

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <button 
        className="profile-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="profile-avatar">
          {user.imageUrl ? (
            <img 
              src={user.imageUrl} 
              alt={user.fullName || user.emailAddresses[0]?.emailAddress}
              className="avatar-image"
            />
          ) : (
            <div className="avatar-placeholder">
              <User size={20} />
            </div>
          )}
        </div>
        <div className="profile-info">
          <span className="profile-name">
            {user.fullName || user.firstName || user.emailAddresses[0]?.emailAddress}
          </span>
          <ChevronDown 
            size={16} 
            className={`chevron ${isOpen ? 'rotated' : ''}`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-header">
            <div className="user-avatar">
              {user.imageUrl ? (
                <img 
                  src={user.imageUrl} 
                  alt={user.fullName || user.emailAddresses[0]?.emailAddress}
                  className="header-avatar"
                />
              ) : (
                <div className="header-avatar-placeholder">
                  <User size={24} />
                </div>
              )}
            </div>
            <div className="user-details">
              <div className="user-name">
                {user.fullName || user.firstName || 'User'}
              </div>
              <div className="user-email">
                {user.emailAddresses[0]?.emailAddress}
              </div>
            </div>
          </div>

          <div className="dropdown-divider"></div>

          <div className="dropdown-items">
            <button className="dropdown-item" onClick={handleProfile}>
              <Settings size={18} />
              <span>Profile & Settings</span>
            </button>
            
            <button className="dropdown-item sign-out" onClick={handleSignOut}>
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
