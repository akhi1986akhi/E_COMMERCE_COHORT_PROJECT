const Product = require('../models/Product');
const Category = require('../models/Category');
const Brand = require('../models/Brand');
const mongoose = require('mongoose');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      sort = '-createdAt',
      category,
      brand,
      minPrice,
      maxPrice,
      inStock,
      isActive,
      search,
      tags
    } = req.query;

    // Build filter object
    const filter = {};

    if (category) {
      const categories = await Category.find({
        $or: [
          { _id: category },
          { slug: category },
          { name: new RegExp(category, 'i') }
        ]
      });
      filter.categories = { $in: categories.map(cat => cat._id) };
    }

    if (brand) {
      const brands = await Brand.find({
        $or: [
          { _id: brand },
          { slug: brand },
          { name: new RegExp(brand, 'i') }
        ]
      });
      filter.brand = { $in: brands.map(b => b._id) };
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    if (inStock === 'true') {
      filter.$or = [
        { stock: { $gt: 0 } },
        { 'variants.stock': { $gt: 0 } }
      ];
    }

    if (isActive !== undefined) {
      filter.isActive = isActive === 'true';
    }

    if (search) {
      filter.$or = [
        { name: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { sku: new RegExp(search, 'i') },
        { tags: new RegExp(search, 'i') }
      ];
    }

    if (tags) {
      const tagArray = tags.split(',');
      filter.tags = { $in: tagArray };
    }

    // Execute query
    const products = await Product.find(filter)
      .populate('categories', 'name slug')
      .populate('brand', 'name slug')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // Get total count for pagination
    const total = await Product.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      $or: [
        { _id: req.params.id },
        { slug: req.params.id },
        { sku: req.params.id.toUpperCase() }
      ]
    })
      .populate('categories', 'name slug')
      .populate('brand', 'name slug')
      .populate('vendor', 'firstName lastName');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    // Check if SKU already exists
    const existingProduct = await Product.findOne({ sku: req.body.sku?.toUpperCase() });
    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: 'SKU already exists'
      });
    }

    // Validate categories
    if (req.body.categories && req.body.categories.length > 0) {
      const categories = await Category.find({ _id: { $in: req.body.categories } });
      if (categories.length !== req.body.categories.length) {
        return res.status(400).json({
          success: false,
          message: 'One or more categories are invalid'
        });
      }
    }

    // Validate brand
    if (req.body.brand) {
      const brand = await Brand.findById(req.body.brand);
      if (!brand) {
        return res.status(400).json({
          success: false,
          message: 'Brand not found'
        });
      }
    }

    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if SKU is being changed and if it already exists
    if (req.body.sku && req.body.sku !== product.sku) {
      const existingProduct = await Product.findOne({ sku: req.body.sku.toUpperCase() });
      if (existingProduct) {
        return res.status(400).json({
          success: false,
          message: 'SKU already exists'
        });
      }
    }

    // Validate categories
    if (req.body.categories && req.body.categories.length > 0) {
      const categories = await Category.find({ _id: { $in: req.body.categories } });
      if (categories.length !== req.body.categories.length) {
        return res.status(400).json({
          success: false,
          message: 'One or more categories are invalid'
        });
      }
    }

    // Validate brand
    if (req.body.brand) {
      const brand = await Brand.findById(req.body.brand);
      if (!brand) {
        return res.status(400).json({
          success: false,
          message: 'Brand not found'
        });
      }
    }

    product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate('categories', 'name slug')
     .populate('brand', 'name slug');

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: {}
    });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Toggle product status
// @route   PATCH /api/products/:id/status
// @access  Private/Admin
const toggleProductStatus = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    product.isActive = !product.isActive;
    await product.save();

    res.status(200).json({
      success: true,
      message: `Product is now ${product.isActive ? 'active' : 'inactive'}`,
      data: product
    });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Update product stock
// @route   PATCH /api/products/:id/stock
// @access  Private/Admin
const updateStock = async (req, res) => {
  try {
    const { stock, variantSku } = req.body;

    if (stock === undefined || stock < 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid stock quantity is required'
      });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (variantSku) {
      // Update variant stock
      const variant = product.variants.find(v => v.sku === variantSku.toUpperCase());
      if (!variant) {
        return res.status(404).json({
          success: false,
          message: 'Variant not found'
        });
      }
      variant.stock = stock;
    } else {
      // Update main product stock
      product.stock = stock;
    }

    await product.save();

    res.status(200).json({
      success: true,
      message: 'Stock updated successfully',
      data: product
    });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Add product variant
// @route   POST /api/products/:id/variants
// @access  Private/Admin
const addVariant = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if variant SKU already exists
    const existingVariant = product.variants.find(
      v => v.sku === req.body.sku?.toUpperCase()
    );
    if (existingVariant) {
      return res.status(400).json({
        success: false,
        message: 'Variant SKU already exists'
      });
    }

    product.variants.push(req.body);
    await product.save();

    res.status(200).json({
      success: true,
      message: 'Variant added successfully',
      data: product
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true })
      .sort({ 'rating.average': -1, sales: -1 })
      .limit(10)
      .populate('categories', 'name slug')
      .populate('brand', 'name slug');

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductStatus,
  updateStock,
  addVariant,
  getFeaturedProducts
};