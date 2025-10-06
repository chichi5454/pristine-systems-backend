const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName:  { type: String, required: false, trim: true, default: '' },
  email:     { type: String, required: true, trim: true, lowercase: true },
  phone:     { type: String, trim: true, default: '' },
  company:   { type: String, trim: true, default: '' },
  country:   { type: String, trim: true, default: '' },
  enquiryType:{ type: String, trim: true, default: '' },
  message:   { type: String, required: true, trim: true },
  terms:     { type: Boolean, default: false },
  ipAddress: { type: String, trim: true, default: '' },
  userAgent: { type: String, trim: true, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Contact', ContactSchema);