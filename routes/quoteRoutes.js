const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');

// POST /api/quote
router.post('/', quoteController.createQuote);

module.exports = router;