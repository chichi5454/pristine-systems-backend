const { validationResult } = require('express-validator');
const { ValidationError } = require('../errors');

// Middleware to validate request using express-validator
const validateRequest = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    // Format errors
    const formattedErrors = errors.array().reduce((acc, error) => {
      // If the param is _error, it's a general error
      if (error.param === '_error') {
        acc._error = error.msg;
      } else {
        if (!acc[error.param]) {
          acc[error.param] = [];
        }
        acc[error.param].push(error.msg);
      }
      return acc;
    }, {});

    throw new ValidationError(formattedErrors);
  };
};

// Validation schemas
const blogValidations = {
  createBlog: [
    body('title').trim().notEmpty().withMessage('Title is required')
      .isLength({ max: 200 }).withMessage('Title cannot be more than 200 characters'),
    body('content').trim().notEmpty().withMessage('Content is required'),
    body('excerpt').optional().trim()
      .isLength({ max: 300 }).withMessage('Excerpt cannot be more than 300 characters'),
    body('tags').optional().isArray().withMessage('Tags must be an array of strings'),
    body('status').optional().isIn(['draft', 'published', 'archived'])
      .withMessage('Invalid status value'),
  ],
  updateBlog: [
    body('title').optional().trim().notEmpty().withMessage('Title cannot be empty')
      .isLength({ max: 200 }).withMessage('Title cannot be more than 200 characters'),
    body('content').optional().trim().notEmpty().withMessage('Content cannot be empty'),
    body('excerpt').optional().trim()
      .isLength({ max: 300 }).withMessage('Excerpt cannot be more than 300 characters'),
    body('tags').optional().isArray().withMessage('Tags must be an array of strings'),
    body('status').optional().isIn(['draft', 'published', 'archived'])
      .withMessage('Invalid status value'),
  ],
};

const contactValidations = {
  submitContact: [
    body('name').trim().notEmpty().withMessage('Name is required')
      .isLength({ max: 100 }).withMessage('Name cannot be more than 100 characters'),
    body('email').trim().isEmail().withMessage('Please provide a valid email')
      .isLength({ max: 100 }).withMessage('Email cannot be more than 100 characters'),
    body('phone').optional().trim()
      .isLength({ max: 20 }).withMessage('Phone number cannot be more than 20 characters'),
    body('subject').optional().trim()
      .isLength({ max: 200 }).withMessage('Subject cannot be more than 200 characters'),
    body('message').trim().notEmpty().withMessage('Message is required')
      .isLength({ max: 5000 }).withMessage('Message cannot be more than 5000 characters'),
  ],
  updateContactStatus: [
    body('status').isIn(['new', 'in_progress', 'resolved', 'spam'])
      .withMessage('Invalid status value'),
  ],
};

const subscribeValidations = {
  subscribe: [
    body('email').trim().isEmail().withMessage('Please provide a valid email')
      .isLength({ max: 100 }).withMessage('Email cannot be more than 100 characters'),
  ],
  unsubscribe: [
    body('email').trim().isEmail().withMessage('Please provide a valid email')
      .isLength({ max: 100 }).withMessage('Email cannot be more than 100 characters'),
  ],
};

module.exports = {
  validateRequest,
  blogValidations,
  contactValidations,
  subscribeValidations,
};
