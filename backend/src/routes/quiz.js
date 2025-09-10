const express = require('express');
const { getQuizQuestions, submitQuizAnswers } = require('../controllers/quizController');

const router = express.Router();

// Get quiz questions for a specific grade
router.get('/:grade', getQuizQuestions);

// Submit quiz answers and get recommendations
router.post('/submit', submitQuizAnswers);

module.exports = router;
