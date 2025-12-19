const express = require('express');
const router = express.Router();
const { subscribe, getAllSubscribers } = require('../controllers/subscriberController');

// Subscribe to newsletter
router.post('/', subscribe);

// Get all subscribers (for admin)
router.get('/', getAllSubscribers);

module.exports = router;