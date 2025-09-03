// models/Category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true,
    trim: true,
    maxlength: 50
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    maxlength: 500
  },
  image: {
    url: String,
    alt: String
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null,
    validate: {
      validator: async function(value) {
        if (!value) return true; // null is allowed
        const category = await mongoose.model('Category').findById(value);
        return category !== null;
      },
      message: 'Parent category does not exist'
    }
  },
  ancestors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  sortOrder: {
    type: Number,
    default: 0
  },
  metaTitle: String,
  metaDescription: String,
  attributes: [{
    name: String,
    values: [String]
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for subcategories
categorySchema.virtual('subcategories', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'parent'
});

// Virtual for products count
categorySchema.virtual('productsCount', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'categories',
  count: true
});

// Pre-save middleware to generate slug and set ancestors
categorySchema.pre('save', async function(next) {
  try {
    if (this.isModified('name')) {
      this.slug = this.name
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
    }

    if (this.isModified('parent')) {
      if (this.parent) {
        const parentCategory = await this.constructor.findById(this.parent);
        if (!parentCategory) {
          throw new Error('Parent category not found');
        }
        this.ancestors = [...parentCategory.ancestors, this.parent];
      } else {
        this.ancestors = [];
      }
    }
    
    next();
  } catch (error) {
    next(error);
  }
});

// Indexes
// categorySchema.index({ slug: 1 });
categorySchema.index({ parent: 1 });
categorySchema.index({ isActive: 1 });

module.exports = mongoose.model('Category', categorySchema);