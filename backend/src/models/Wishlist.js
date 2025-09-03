// models/Wishlist.js
const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    addedAt: {
      type: Date,
      default: Date.now
    },
    note: String
  }],
  isPublic: {
    type: Boolean,
    default: false
  },
  shareToken: {
    type: String,
    unique: true,
    sparse: true
  }
}, {
  timestamps: true
});

// Indexes
// wishlistSchema.index({ user: 1 });
// wishlistSchema.index({ shareToken: 1 });
wishlistSchema.index({ 'items.addedAt': -1 });

// Pre-save middleware to generate share token
wishlistSchema.pre('save', function(next) {
  if (this.isPublic && !this.shareToken) {
    this.shareToken = require('crypto').randomBytes(16).toString('hex');
  } else if (!this.isPublic) {
    this.shareToken = undefined;
  }
  next();
});

module.exports = mongoose.model('Wishlist', wishlistSchema);