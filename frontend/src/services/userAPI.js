const API_BASE_URL = 'http://localhost:5001/api';

class UserAPI {
  // Create or update user profile
  async createOrUpdateUser(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating/updating user:', error);
      throw error;
    }
  }

  // Get user by Clerk ID
  async getUserByClerkId(clerkId) {
    try {
      const response = await fetch(`${API_BASE_URL}/user/clerk/${clerkId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  // Get dashboard data
  async getDashboardData(clerkId) {
    try {
      const response = await fetch(`${API_BASE_URL}/user/clerk/${clerkId}/dashboard`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw error;
    }
  }

  // Save quiz results
  async saveQuizResults(quizData) {
    try {
      const response = await fetch(`${API_BASE_URL}/user/quiz-results`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error saving quiz results:', error);
      throw error;
    }
  }

  // Get quiz history
  async getQuizHistory(clerkId) {
    try {
      const response = await fetch(`${API_BASE_URL}/user/clerk/${clerkId}/quiz-history`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching quiz history:', error);
      throw error;
    }
  }

  // Save user preferences
  async saveUserPreferences(preferencesData) {
    try {
      const response = await fetch(`${API_BASE_URL}/user/preferences`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferencesData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error saving preferences:', error);
      throw error;
    }
  }

  // Get user preferences
  async getUserPreferences(clerkId) {
    try {
      const response = await fetch(`${API_BASE_URL}/user/clerk/${clerkId}/preferences`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching preferences:', error);
      throw error;
    }
  }
}

export default new UserAPI();
