// models/ShippingMethod.js
const mongoose = require('mongoose');

const shippingMethodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Shipping method name is required'],
    trim: true
  },
  description: String,
  type: {
    type: String,
    enum: ['flat_rate', 'free', 'local_pickup', 'calculated'],
    required: true
  },
  cost: {
    type: Number,
    default: 0,
    min: 0
  },
  minimumOrder: {
    type: Number,
    min: 0
  },
  maximumOrder: {
    type: Number,
    min: 0
  },
  countries: [{
    code: String,
    name: String,
    cost: Number
  }],
  zones: [{
    name: String,
    countries: [String],
    cost: Number
  }],
  handlingFee: {
    type: Number,
    default: 0,
    min: 0
  },
  estimatedDelivery: {
    min: Number, // days
    max: Number  // days
  },
  isActive: {
    type: Boolean,
    default: true
  },
  sortOrder: {
    type: Number,
    default: 0
  },
  weightLimit: {
    min: Number,
    max: Number
  },
  dimensionLimit: {
    length: Number,
    width: Number,
    height: Number
  }
}, {
  timestamps: true
});

// Indexes
shippingMethodSchema.index({ isActive: 1, type: 1 });
shippingMethodSchema.index({ sortOrder: 1 });

module.exports = mongoose.model('ShippingMethod', shippingMethodSchema);