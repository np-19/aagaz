const express = require('express');
const { 
  getAllColleges, 
  getCollegesByType, 
  searchColleges, 
  getCollegeDetails 
} = require('../controllers/collegeController');

const router = express.Router();

// Get all colleges
router.get('/', getAllColleges);

// Search colleges
router.get('/search', searchColleges);

// Get colleges by type
router.get('/type/:type', getCollegesByType);

// Get specific college details
router.get('/:collegeName', getCollegeDetails);

module.exports = router;
