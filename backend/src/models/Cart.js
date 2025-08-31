// models/Cart.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
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
    },
    price: Number
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    max: 100
  },
  price: {
    type: Number,
    required: true,
    min: 0
  }
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [cartItemSchema],
  coupon: {
    code: String,
    discount: Number,
    type: {
      type: String,
      enum: ['percentage', 'fixed', 'free_shipping']
    }
  },
  shippingMethod: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShippingMethod'
  },
  notes: String
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for total items count
cartSchema.virtual('itemsCount').get(function() {
  return this.items.reduce((total, item) => total + item.quantity, 0);
});

// Virtual for subtotal
cartSchema.virtual('subtotal').get(function() {
  return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
});

// Virtual for total
cartSchema.virtual('total').get(function() {
  let total = this.subtotal;
  
  if (this.coupon) {
    if (this.coupon.type === 'percentage') {
      total -= (this.subtotal * this.coupon.discount) / 100;
    } else if (this.coupon.type === 'fixed') {
      total -= this.coupon.discount;
    }
  }
  
  return Math.max(0, total);
});

// Virtual for discount amount
cartSchema.virtual('discountAmount').get(function() {
  if (!this.coupon) return 0;
  
  if (this.coupon.type === 'percentage') {
    return (this.subtotal * this.coupon.discount) / 100;
  } else if (this.coupon.type === 'fixed') {
    return this.coupon.discount;
  }
  return 0;
});

// Index
cartSchema.index({ user: 1 });
cartSchema.index({ updatedAt: 1 }, { expireAfterSeconds: 30 * 24 * 60 * 60 }); // 30 days TTL

module.exports = mongoose.model('Cart', cartSchema);