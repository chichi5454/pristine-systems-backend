const express = require('express');
const router = express.Router();
const subscriberController = require('../controllers/subscriberController');

// Public routes
router.post('/', subscriberController.subscribe);
router.post('/unsubscribe', subscriberController.unsubscribe);
router.get('/', subscriberController.getAllSubscribers);

module.exports = router;
