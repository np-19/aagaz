import { useState } from 'react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import './Settings.css';

const Settings = () => {
  const [profile, setProfile] = useState({
    fullName: 'Alex Kumar',
    email: 'alex.kumar@email.com',
    currentClass: 'Class 12',
    primaryStream: 'Science - PCM',
    careerGoals: 'Software Engineering, Data Science'
  });

  const [notifications, setNotifications] = useState({
    emailDeadlines: true,
    smsReminders: true,
    weeklyReports: false
  });

  const handleProfileChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field) => {
    setNotifications(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const showNotification = (message) => {
    // Simple notification - in a real app you'd use a toast library
    alert(message);
  };

  return (
    <div className="settings-section">
      <div className="section-header">
        <h1 className="section-title">Account Settings</h1>
        <p className="section-subtitle">Customize your profile and preferences</p>
      </div>

      <div className="settings-grid">
        <Card className="settings-card">
          <h3 className="settings-title">Profile Information</h3>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-input"
              value={profile.fullName}
              onChange={(e) => handleProfileChange('fullName', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              value={profile.email}
              onChange={(e) => handleProfileChange('email', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Current Class</label>
            <select
              className="form-select"
              value={profile.currentClass}
              onChange={(e) => handleProfileChange('currentClass', e.target.value)}
            >
              <option>Class 12</option>
              <option>Class 11</option>
              <option>Class 10</option>
              <option>Graduate</option>
            </select>
          </div>
          <Button onClick={() => showNotification('Profile updated successfully!')}>
            Save Changes
          </Button>
        </Card>

        <Card className="settings-card">
          <h3 className="settings-title">Academic Interests</h3>
          <div className="form-group">
            <label className="form-label">Primary Stream</label>
            <select
              className="form-select"
              value={profile.primaryStream}
              onChange={(e) => handleProfileChange('primaryStream', e.target.value)}
            >
              <option>Science - PCM</option>
              <option>Science - PCB</option>
              <option>Commerce</option>
              <option>Arts</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Career Goals</label>
            <input
              type="text"
              className="form-input"
              value={profile.careerGoals}
              onChange={(e) => handleProfileChange('careerGoals', e.target.value)}
            />
          </div>
          <Button 
            variant="secondary" 
            onClick={() => showNotification('Interests updated!')}
          >
            Update Interests
          </Button>
        </Card>

        <Card className="settings-card">
          <h3 className="settings-title">Notification Preferences</h3>
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={notifications.emailDeadlines}
                onChange={() => handleNotificationChange('emailDeadlines')}
              />
              Email notifications for deadlines
            </label>
          </div>
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={notifications.smsReminders}
                onChange={() => handleNotificationChange('smsReminders')}
              />
              SMS reminders for important dates
            </label>
          </div>
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={notifications.weeklyReports}
                onChange={() => handleNotificationChange('weeklyReports')}
              />
              Weekly progress reports
            </label>
          </div>
          <Button 
            variant="secondary" 
            onClick={() => showNotification('Preferences saved!')}
          >
            Save Preferences
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
