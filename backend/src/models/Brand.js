// models/Brand.js
const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Brand name is required'],
    unique: true,
    trim: true,
    maxlength: 100
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  description: String,
  logo: {
    url: String,
    alt: String
  },
  website: {
    type: String,
    validate: {
      validator: function(url) {
        return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(url);
      },
      message: 'Please provide a valid website URL'
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  sortOrder: {
    type: Number,
    default: 0
  },
  metaTitle: String,
  metaDescription: String
}, {
  timestamps: true
});

// Pre-save middleware to generate slug
brandSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
  next();
});

// Indexes
brandSchema.index({ slug: 1 });
brandSchema.index({ isActive: 1 });

module.exports = mongoose.model('Brand', brandSchema);