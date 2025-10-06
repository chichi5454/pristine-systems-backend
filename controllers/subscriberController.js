const Subscriber = require('../models/Subscriber');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');

// @desc    Subscribe to newsletter
// @route   POST /api/subscribe
// @access  Public
const subscribe = async (req, res) => {
  const { email } = req.body;

  // Check if email already exists
  const existingSubscriber = await Subscriber.findOne({ email });
  
  if (existingSubscriber) {
    if (existingSubscriber.isActive) {
      throw new BadRequestError('This email is already subscribed');
    } else {
      // Reactivate unsubscribed email
      existingSubscriber.isActive = true;
      existingSubscriber.unsubscribedAt = undefined;
      await existingSubscriber.save();
      
      return res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'Successfully resubscribed to our newsletter!',
        data: {
          subscriber: {
            email: existingSubscriber.email,
            subscribedAt: existingSubscriber.subscribedAt,
          },
        },
      });
    }
  }

  // Create new subscriber
  const subscriber = await Subscriber.create({ email });

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    message: 'Successfully subscribed to our newsletter!',
    data: {
      subscriber: {
        email: subscriber.email,
        subscribedAt: subscriber.subscribedAt,
      },
    },
  });
};

// @desc    Unsubscribe from newsletter
// @route   POST /api/subscribe/unsubscribe
// @access  Public
const unsubscribe = async (req, res) => {
  const { email } = req.body;

  const subscriber = await Subscriber.findOne({ email });
  
  if (!subscriber) {
    throw new BadRequestError('No subscription found with this email');
  }

  if (!subscriber.isActive) {
    throw new BadRequestError('This email is already unsubscribed');
  }

  subscriber.isActive = false;
  subscriber.unsubscribedAt = new Date();
  await subscriber.save();

  res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'Successfully unsubscribed from our newsletter',
  });
};

// @desc    Get all subscribers (for admin)
// @route   GET /api/subscribe
// @access  Private/Admin
const getAllSubscribers = async (req, res) => {
  const { status, search } = req.query;
  const queryObj = {};

  // Filter by status
  if (status === 'active') {
    queryObj.isActive = true;
  } else if (status === 'inactive') {
    queryObj.isActive = false;
  }

  // Search functionality
  if (search) {
    queryObj.email = { $regex: search, $options: 'i' };
  }

  // Execute query
  let result = Subscriber.find(queryObj);

  // Sort by subscription date (newest first)
  result = result.sort('-subscribedAt');

  // Pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 50;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const subscribers = await result;
  const totalSubscribers = await Subscriber.countDocuments(queryObj);
  const totalPages = Math.ceil(totalSubscribers / limit);

  res.status(StatusCodes.OK).json({
    status: 'success',
    results: subscribers.length,
    total: totalSubscribers,
    totalPages,
    currentPage: page,
    data: {
      subscribers,
    },
  });
};

module.exports = {
  subscribe,
  unsubscribe,
  getAllSubscribers,
};
