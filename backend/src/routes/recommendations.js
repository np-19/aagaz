const express = require('express');
const { 
  getPersonalizedRecommendations, 
  getTrendingCareers 
} = require('../controllers/recommendationController');

const router = express.Router();

// Get personalized recommendations
router.post('/personalized', getPersonalizedRecommendations);

// Get trending careers
router.get('/trending', getTrendingCareers);

module.exports = router;
