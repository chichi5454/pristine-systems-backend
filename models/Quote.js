const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
  name:      { type: String, required: true, trim: true },
  email:     { type: String, required: true, trim: true, lowercase: true },
  phone:     { type: String, trim: true, default: '' },
  company:   { type: String, trim: true, default: '' },
  service:   { type: String, trim: true, default: '' },
  message:   { type: String, required: true, trim: true },
  budget:    { type: String, trim: true, default: '' },
  timeframe: { type: String, trim: true, default: '' },
  ipAddress: { type: String, trim: true, default: '' },
  userAgent: { type: String, trim: true, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Quote', QuoteSchema);