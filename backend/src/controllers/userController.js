const User = require('../models/User');

// MongoDB-based user controller

// Create or update user profile
const createOrUpdateUser = async (req, res) => {
  try {
    console.log('Received user data:', req.body);
    const { clerkId, email, firstName, lastName, role, grade, profileImage } = req.body;
    
    if (!clerkId || !email || !firstName) {
      console.log('Missing required fields:', { clerkId: !!clerkId, email: !!email, firstName: !!firstName });
      return res.status(400).json({
        success: false,
        message: 'Clerk ID, email, and first name are required'
      });
    }

    console.log('Looking for user with clerkId:', clerkId);
    let user = await User.findOne({ clerkId });
    console.log('Found existing user:', !!user);
    
    if (user) {
      // Update existing user
      console.log('Updating existing user');
      user.email = email;
      user.firstName = firstName;
      user.lastName = lastName || user.lastName;
      user.role = role || user.role;
      user.grade = grade || user.grade;
      user.profileImage = profileImage || user.profileImage;
      await user.save();
      console.log('User updated successfully');
    } else {
      // Create new user
      console.log('Creating new user');
      user = new User({
        clerkId,
        email,
        firstName,
        lastName,
        role: role || 'student',
        grade,
        profileImage,
        preferences: {},
        quizResults: [],
        savedColleges: [],
        savedCareers: []
      });
      await user.save();
      console.log('New user created successfully');
    }

    // Return dashboard data format
    const lastQuiz = user.quizResults[user.quizResults.length - 1];
    
    const dashboardData = {
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        grade: user.grade,
        profileImage: user.profileImage
      },
      quizResults: user.quizResults,
      preferences: user.preferences,
      totalQuizzes: user.quizResults.length,
      lastQuizDate: lastQuiz ? lastQuiz.completedAt : null,
      savedColleges: user.savedColleges.length,
      savedCareers: user.savedCareers.length
    };

    console.log('Returning dashboard data:', dashboardData);

    res.json({
      success: true,
      message: user.isNew ? 'User created successfully' : 'User updated successfully',
      data: dashboardData
    });
  } catch (error) {
    console.error('Error creating/updating user:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Save user quiz results
const saveQuizResults = async (req, res) => {
  try {
    const { clerkId, quizId, score, results } = req.body;
    
    if (!clerkId || !quizId || !results) {
      return res.status(400).json({
        success: false,
        message: 'Clerk ID, quiz ID, and results are required'
      });
    }

    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.quizResults.push({
      quizId,
      score,
      results,
      completedAt: new Date()
    });
    
    await user.save();

    res.json({
      success: true,
      message: 'Quiz results saved successfully',
      data: {
        resultId: user.quizResults.length - 1,
        timestamp: new Date().toISOString()
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

// Get user by Clerk ID
const getUserByClerkId = async (req, res) => {
  try {
    const { clerkId } = req.params;
    
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get user quiz history
const getQuizHistory = async (req, res) => {
  try {
    const { clerkId } = req.params;
    
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.json({
        success: true,
        data: {
          quizResults: [],
          total: 0
        }
      });
    }
    
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
const saveUserPreferences = async (req, res) => {
  try {
    const { clerkId, preferences } = req.body;
    
    if (!clerkId || !preferences) {
      return res.status(400).json({
        success: false,
        message: 'Clerk ID and preferences are required'
      });
    }

    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    user.preferences = { ...user.preferences, ...preferences };
    await user.save();

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
const getUserPreferences = async (req, res) => {
  try {
    const { clerkId } = req.params;
    
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.json({
        success: true,
        data: {
          preferences: {}
        }
      });
    }
    
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
const getDashboardData = async (req, res) => {
  try {
    const { clerkId } = req.params;
    
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.json({
        success: true,
        data: {
          user: null,
          quizResults: [],
          preferences: {},
          totalQuizzes: 0,
          lastQuizDate: null,
          savedColleges: 0,
          savedCareers: 0
        }
      });
    }

    const lastQuiz = user.quizResults[user.quizResults.length - 1];
    
    res.json({
      success: true,
      data: {
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          grade: user.grade,
          profileImage: user.profileImage
        },
        quizResults: user.quizResults,
        preferences: user.preferences,
        totalQuizzes: user.quizResults.length,
        lastQuizDate: lastQuiz ? lastQuiz.completedAt : null,
        savedColleges: user.savedColleges.length,
        savedCareers: user.savedCareers.length
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
  createOrUpdateUser,
  getUserByClerkId,
  saveQuizResults,
  getQuizHistory,
  saveUserPreferences,
  getUserPreferences,
  getDashboardData
};
