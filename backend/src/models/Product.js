// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: 200
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  sku: {
    type: String,
    unique: true,
    required: [true, 'SKU is required'],
    uppercase: true
  },
  description: {
    type: String,
    required: [true, 'Product description is required']
  },
  shortDescription: {
    type: String,
    maxlength: 300
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: 0
  },
  comparePrice: {
    type: Number,
    min: 0,
    validate: {
      validator: function(value) {
        return value === 0 || value > this.price;
      },
      message: 'Compare price must be greater than price'
    }
  },
  cost: {
    type: Number,
    min: 0
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }],
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand'
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  variants: [{
    sku: {
      type: String,
      required: true,
      uppercase: true
    },
    attributes: {
      type: Map,
      of: String
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    comparePrice: Number,
    stock: {
      type: Number,
      default: 0,
      min: 0
    },
    weight: Number,
    dimensions: {
      length: Number,
      width: Number,
      height: Number
    },
    image: {
      url: String,
      alt: String
    },
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  attributes: {
    type: Map,
    of: [String]
  },
  stock: {
    type: Number,
    default: 0,
    min: 0
  },
  lowStockThreshold: {
    type: Number,
    default: 5
  },
  weight: {
    type: Number,
    min: 0
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isDigital: {
    type: Boolean,
    default: false
  },
  digitalFile: {
    url: String,
    filename: String,
    size: Number
  },
  downloadLimit: {
    type: Number,
    default: 1
  },
  downloadExpiry: {
    type: Number,
    default: 30 // days
  },
  taxClass: {
    type: String,
    enum: ['standard', 'reduced', 'zero'],
    default: 'standard'
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    canonicalUrl: String
  },
  tags: [String],
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    },
    distribution: {
      1: { type: Number, default: 0 },
      2: { type: Number, default: 0 },
      3: { type: Number, default: 0 },
      4: { type: Number, default: 0 },
      5: { type: Number, default: 0 }
    }
  },
  sales: {
    total: {
      type: Number,
      default: 0
    },
    last30Days: {
      type: Number,
      default: 0
    }
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for inStock
productSchema.virtual('inStock').get(function() {
  return this.stock > 0 || this.variants.some(v => v.stock > 0);
});

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function() {
  if (this.comparePrice && this.comparePrice > this.price) {
    return Math.round(((this.comparePrice - this.price) / this.comparePrice) * 100);
  }
  return 0;
});

// Pre-save middleware
productSchema.pre('save', async function(next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  // Ensure only one primary image
  if (this.isModified('images')) {
    const primaryImages = this.images.filter(img => img.isPrimary);
    if (primaryImages.length > 1) {
      throw new Error('Only one image can be set as primary');
    }
  }
  
  next();
});

// Indexes
// productSchema.index({ slug: 1 });
// productSchema.index({ sku: 1 });
productSchema.index({ categories: 1 });
productSchema.index({ price: 1 });
productSchema.index({ rating: -1 });
productSchema.index({ 'variants.sku': 1 });
productSchema.index({ isActive: 1, stock: 1 });

// Static method to update rating
productSchema.statics.updateRating = async function(productId) {
  const reviews = await mongoose.model('Review').find({ product: productId });
  
  if (reviews.length === 0) return;
  
  const rating = {
    average: 0,
    count: reviews.length,
    distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  };
  
  reviews.forEach(review => {
    rating.average += review.rating;
    rating.distribution[review.rating]++;
  });
  
  rating.average = parseFloat((rating.average / reviews.length).toFixed(1));
  
  await this.findByIdAndUpdate(productId, { rating });
};

module.exports = mongoose.model('Product', productSchema);