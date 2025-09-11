const express = require('express');
const router = express.Router();
const { 
  createOrUpdateUser,
  getUserByClerkId,
  saveQuizResults, 
  getQuizHistory, 
  saveUserPreferences, 
  getUserPreferences, 
  getDashboardData 
} = require('../controllers/userController');

// Create or update user
router.post('/profile', createOrUpdateUser);

// Get user by Clerk ID
router.get('/clerk/:clerkId', getUserByClerkId);

// Save quiz results
router.post('/quiz-results', saveQuizResults);

// Get quiz history
router.get('/clerk/:clerkId/quiz-history', getQuizHistory);

// Save user preferences
router.post('/preferences', saveUserPreferences);

// Get user preferences
router.get('/clerk/:clerkId/preferences', getUserPreferences);

// Get dashboard data
router.get('/clerk/:clerkId/dashboard', getDashboardData);

module.exports = router;

