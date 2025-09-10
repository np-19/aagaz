const express = require('express');
const { 
  getCareerClusters, 
  getCareersByCluster, 
  getCareerDetails, 
  searchCareers 
} = require('../controllers/careerController');

const router = express.Router();

// Get all career clusters
router.get('/clusters', getCareerClusters);

// Search careers
router.get('/search', searchCareers);

// Get careers by cluster
router.get('/cluster/:clusterName', getCareersByCluster);

// Get specific career details
router.get('/:careerCode', getCareerDetails);

module.exports = router;
