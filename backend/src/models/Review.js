// models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: 1,
    max: 5
  },
  title: {
    type: String,
    required: [true, 'Review title is required'],
    trim: true,
    maxlength: 100
  },
  comment: {
    type: String,
    required: [true, 'Review comment is required'],
    maxlength: 1000
  },
  images: [{
    url: String,
    alt: String
  }],
  isVerifiedPurchase: {
    type: Boolean,
    default: false
  },
  helpful: {
    votes: {
      type: Number,
      default: 0
    },
    voters: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  response: {
    comment: String,
    respondedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    respondedAt: Date
  }
}, {
  timestamps: true
});

// Compound index to ensure one review per product per user
reviewSchema.index({ user: 1, product: 1 }, { unique: true });
reviewSchema.index({ product: 1, rating: 1 });
reviewSchema.index({ isApproved: 1, createdAt: -1 });

// Pre-save middleware to mark as verified purchase
reviewSchema.pre('save', async function(next) {
  const order = await mongoose.model('Order').findOne({
    _id: this.order,
    user: this.user,
    status: 'delivered',
    'items.product': this.product
  });
  
  this.isVerifiedPurchase = !!order;
  next();
});

// Post-save middleware to update product rating
reviewSchema.post('save', async function() {
  if (this.isApproved) {
    await mongoose.model('Product').updateRating(this.product);
  }
});

// Post-remove middleware to update product rating
reviewSchema.post('remove', async function() {
  await mongoose.model('Product').updateRating(this.product);
});

module.exports = mongoose.model('Review', reviewSchema);