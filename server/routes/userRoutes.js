const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User Dashboard & Progress Stats
router.get('/:userId/dashboard', userController.getUserDashboard);

module.exports = router;
