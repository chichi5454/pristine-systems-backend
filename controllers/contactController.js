const Contact = require('../models/Contact');

// Save a simple contact message
exports.createContact = async (req, res) => {
	try {
	const { name, email, message, terms } = req.body;
		console.log('createContact body:', req.body);
		if (!name || !email || !message || terms !== true) {
			console.log('createContact validation failed: missing fields or terms not accepted');
			return res.status(400).json({ error: 'Name, email, message, and consent are required.' });
		}
		const contact = await Contact.create({
			firstName: name,
			lastName: '',
			email,
			message,
			phone: '',
			company: '',
			country: '',
			enquiryType: '',
			terms: true,
			ipAddress: '',
			userAgent: ''
		});
		console.log('createContact saved:', contact._id);
		return res.status(201).json({ success: true, contact });
	} catch (err) {
		console.error('createContact error:', err && err.message ? err.message : err);
		return res.status(500).json({ error: 'Failed to save contact.' });
	}
};