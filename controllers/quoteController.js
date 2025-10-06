const Quote = require('../models/Quote');

// Save a simple quote request
exports.createQuote = async (req, res) => {
	try {
		const { name, email, phone, company, projectDetails } = req.body;
		if (!name || !email || !projectDetails) {
			return res.status(400).json({ error: 'Name, email, and project details are required.' });
		}
		const quote = await Quote.create({
			name,
			email,
			phone: phone || '',
			company: company || '',
			message: projectDetails
		});
		return res.status(201).json({ success: true, quote });
	} catch (err) {
		return res.status(500).json({ error: 'Failed to save quote.' });
	}
};