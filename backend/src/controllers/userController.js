// Simple user controller for storing quiz results and preferences
// In a real application, this would integrate with a proper user database

let userData = new Map(); // In-memory storage for demo purposes

// Save user quiz results
const saveQuizResults = (req, res) => {
  try {
    const { userId, grade, answers, recommendations, timestamp } = req.body;
    
    if (!userId || !grade || !answers) {
      return res.status(400).json({
        success: false,
        message: 'User ID, grade, and answers are required'
      });
    }

    const quizResult = {
      userId,
      grade,
      answers,
      recommendations,
      timestamp: timestamp || new Date().toISOString()
    };

    // Store in memory (in production, this would be saved to database)
    if (!userData.has(userId)) {
      userData.set(userId, { quizResults: [], preferences: {} });
    }
    
    const user = userData.get(userId);
    user.quizResults.push(quizResult);
    userData.set(userId, user);

    res.json({
      success: true,
      message: 'Quiz results saved successfully',
      data: {
        resultId: user.quizResults.length - 1,
        timestamp: quizResult.timestamp
      }
    });
  } catch (error) {
    console.error('Error saving quiz results:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get user quiz history
const getQuizHistory = (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userData.has(userId)) {
      return res.json({
        success: true,
        data: {
          quizResults: [],
          total: 0
        }
      });
    }

    const user = userData.get(userId);
    
    res.json({
      success: true,
      data: {
        quizResults: user.quizResults,
        total: user.quizResults.length
      }
    });
  } catch (error) {
    console.error('Error getting quiz history:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Save user preferences
const saveUserPreferences = (req, res) => {
  try {
    const { userId, preferences } = req.body;
    
    if (!userId || !preferences) {
      return res.status(400).json({
        success: false,
        message: 'User ID and preferences are required'
      });
    }

    if (!userData.has(userId)) {
      userData.set(userId, { quizResults: [], preferences: {} });
    }
    
    const user = userData.get(userId);
    user.preferences = { ...user.preferences, ...preferences };
    userData.set(userId, user);

    res.json({
      success: true,
      message: 'Preferences saved successfully',
      data: user.preferences
    });
  } catch (error) {
    console.error('Error saving user preferences:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get user preferences
const getUserPreferences = (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userData.has(userId)) {
      return res.json({
        success: true,
        data: {
          preferences: {}
        }
      });
    }

    const user = userData.get(userId);
    
    res.json({
      success: true,
      data: {
        preferences: user.preferences
      }
    });
  } catch (error) {
    console.error('Error getting user preferences:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get user dashboard data
const getDashboardData = (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userData.has(userId)) {
      return res.json({
        success: true,
        data: {
          quizResults: [],
          preferences: {},
          totalQuizzes: 0,
          lastQuizDate: null
        }
      });
    }

    const user = userData.get(userId);
    const lastQuiz = user.quizResults[user.quizResults.length - 1];
    
    res.json({
      success: true,
      data: {
        quizResults: user.quizResults,
        preferences: user.preferences,
        totalQuizzes: user.quizResults.length,
        lastQuizDate: lastQuiz ? lastQuiz.timestamp : null
      }
    });
  } catch (error) {
    console.error('Error getting dashboard data:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  saveQuizResults,
  getQuizHistory,
  saveUserPreferences,
  getUserPreferences,
  getDashboardData
};
