const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator');

const subscriberSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: 'Please provide a valid email address',
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    subscribedAt: {
      type: Date,
      default: Date.now,
    },
    unsubscribedAt: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Index for faster email lookups
subscriberSchema.index({ email: 1 }, { unique: true });

// Static method to check if email exists
subscriberSchema.statics.isEmailTaken = async function (email) {
  const subscriber = await this.findOne({ email });
  return !!subscriber;
};

// Pre-save hook to normalize email
subscriberSchema.pre('save', function (next) {
  if (this.isModified('email')) {
    this.email = this.email.trim().toLowerCase();
  }
  next();
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = Subscriber;
