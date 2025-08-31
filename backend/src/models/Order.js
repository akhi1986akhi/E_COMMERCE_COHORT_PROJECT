// models/Order.js
const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  variant: {
    sku: String,
    attributes: {
      type: Map,
      of: String
    }
  },
  name: {
    type: String,
    required: true
  },
  image: {
    url: String,
    alt: String
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  weight: Number,
  digitalFile: {
    url: String,
    filename: String,
    size: Number
  },
  downloads: [{
    downloadedAt: Date,
    ip: String,
    userAgent: String
  }]
});

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [orderItemSchema],
  status: {
    type: String,
    enum: [
      'pending',
      'confirmed',
      'processing',
      'shipped',
      'delivered',
      'cancelled',
      'refunded',
      'failed'
    ],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded', 'partially_refunded'],
    default: 'pending'
  },
  subtotal: {
    type: Number,
    required: true,
    min: 0
  },
  discount: {
    amount: {
      type: Number,
      default: 0
    },
    code: String,
    type: {
      type: String,
      enum: ['percentage', 'fixed', 'free_shipping']
    }
  },
  shipping: {
    method: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ShippingMethod'
    },
    cost: {
      type: Number,
      default: 0,
      min: 0
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address'
    },
    tracking: {
      number: String,
      carrier: String,
      url: String
    }
  },
  tax: {
    amount: {
      type: Number,
      default: 0
    },
    rate: Number
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'USD',
    uppercase: true
  },
  payment: {
    method: {
      type: String,
      enum: ['credit_card', 'paypal', 'stripe', 'bank_transfer', 'cash_on_delivery'],
      required: true
    },
    transactionId: String,
    gateway: String,
    details: mongoose.Schema.Types.Mixed
  },
  billingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: true
  },
  shippingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: true
  },
  customerNote: String,
  internalNotes: [{
    note: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  refunds: [{
    amount: {
      type: Number,
      required: true
    },
    reason: String,
    processedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    processedAt: {
      type: Date,
      default: Date.now
    },
    transactionId: String
  }],
  history: [{
    status: String,
    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    changedAt: {
      type: Date,
      default: Date.now
    },
    note: String
  }],
  estimatedDelivery: Date,
  ip: String,
  userAgent: String
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for isDigital
orderSchema.virtual('isDigital').get(function() {
  return this.items.every(item => item.digitalFile);
});

// Pre-save middleware to generate order number
orderSchema.pre('save', async function(next) {
  if (this.isNew) {
    const count = await this.constructor.countDocuments();
    this.orderNumber = `ORD-${Date.now()}-${(count + 1).toString().padStart(6, '0')}`;
  }
  next();
});

// Post-save middleware to update product stock
orderSchema.post('save', async function(doc) {
  if (doc.status === 'cancelled' || doc.status === 'refunded') {
    // Restore stock
    for (const item of doc.items) {
      await mongoose.model('Product').updateOne(
        { _id: item.product },
        { $inc: { stock: item.quantity } }
      );
    }
  } else if (doc.status === 'confirmed') {
    // Reduce stock
    for (const item of doc.items) {
      await mongoose.model('Product').updateOne(
        { _id: item.product },
        { $inc: { stock: -item.quantity } }
      );
    }
  }
});

// Indexes
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ user: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ 'payment.transactionId': 1 });

module.exports = mongoose.model('Order', orderSchema);