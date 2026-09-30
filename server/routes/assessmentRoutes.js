const express = require('express');
const router = express.Router();
const assessmentController = require('../controllers/assessmentController');

// Start assessment session
router.post('/start', assessmentController.startAssessment);

// Submit answer for current question
router.post('/answer', assessmentController.submitAnswer);

// Get final results & trajectory chart data
router.get('/:id/results', assessmentController.getResults);

module.exports = router;
