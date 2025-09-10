const express = require('express');
const { 
  saveQuizResults, 
  getQuizHistory, 
  saveUserPreferences, 
  getUserPreferences, 
  getDashboardData 
} = require('../controllers/userController');

const router = express.Router();

// Save quiz results
router.post('/quiz-results', saveQuizResults);

// Get quiz history
router.get('/:userId/quiz-history', getQuizHistory);

// Save user preferences
router.post('/preferences', saveUserPreferences);

// Get user preferences
router.get('/:userId/preferences', getUserPreferences);

// Get dashboard data
router.get('/:userId/dashboard', getDashboardData);

module.exports = router;

