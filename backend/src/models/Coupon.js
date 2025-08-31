// models/Coupon.js
const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Coupon code is required'],
    unique: true,
    uppercase: true,
    trim: true
  },
  description: String,
  type: {
    type: String,
    enum: ['percentage', 'fixed', 'free_shipping'],
    required: true
  },
  value: {
    type: Number,
    required: [true, 'Coupon value is required'],
    min: 0
  },
  minimumOrder: {
    type: Number,
    min: 0
  },
  maximumDiscount: {
    type: Number,
    min: 0
  },
  usageLimit: {
    type: Number,
    min: 0
  },
  usageCount: {
    type: Number,
    default: 0
  },
  usersUsed: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  excludedProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  excludedCategories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  singleUse: {
    type: Boolean,
    default: false
  },
  freeShipping: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Virtual for isExpired
couponSchema.virtual('isExpired').get(function() {
  return this.endDate < new Date();
});

// Virtual for isUsageLimitReached
couponSchema.virtual('isUsageLimitReached').get(function() {
  return this.usageLimit && this.usageCount >= this.usageLimit;
});

// Virtual for isValid
couponSchema.virtual('isValid').get(function() {
  return this.isActive && !this.isExpired && !this.isUsageLimitReached;
});

// Indexes
couponSchema.index({ code: 1 });
couponSchema.index({ isActive: 1, startDate: 1, endDate: 1 });
couponSchema.index({ type: 1 });

module.exports = mongoose.model('Coupon', couponSchema);