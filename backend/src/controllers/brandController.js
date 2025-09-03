// controllers/brandController.js
const Brand = require('../models/Brand');

// Get all brands with pagination and filtering
const getAllBrands = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'sortOrder',
      sortOrder = 'asc',
      isActive,
      search
    } = req.query;

    // Build filter object
    const filter = {};
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    
    // Search functionality
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calculate skip value
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get brands with pagination
    const brands = await Brand.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination info
    const totalItems = await Brand.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / parseInt(limit));

    res.json({
      success: true,
      data: brands,
      pagination: {
        page: parseInt(page),
        totalPages,
        totalItems,
        hasNext: parseInt(page) < totalPages,
        hasPrev: parseInt(page) > 1,
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get all brands error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching brands'
    });
  }
};

// Get single brand by ID
const getBrandById = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    
    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Brand not found'
      });
    }

    res.json({
      success: true,
      data: brand
    });
  } catch (error) {
    console.error('Get brand by ID error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid brand ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while fetching brand'
    });
  }
};

// Get single brand by slug
const getBrandBySlug = async (req, res) => {
  try {
    const brand = await Brand.findOne({ slug: req.params.slug });
    
    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Brand not found'
      });
    }

    res.json({
      success: true,
      data: brand
    });
  } catch (error) {
    console.error('Get brand by slug error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching brand'
    });
  }
};

// Create new brand
const createBrand = async (req, res) => {
  try {
    const brandData = req.body;
    
    // Check if brand with same name already exists
    const existingBrand = await Brand.findOne({ 
      $or: [
        { name: brandData.name },
        { slug: brandData.slug || brandData.name.toLowerCase().replace(/\s+/g, '-') }
      ]
    });

    if (existingBrand) {
      return res.status(409).json({
        success: false,
        message: 'Brand with this name or slug already exists'
      });
    }

    const brand = new Brand(brandData);
    await brand.save();

    res.status(201).json({
      success: true,
      message: 'Brand created successfully',
      data: brand
    });
  } catch (error) {
    console.error('Create brand error:', error);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while creating brand'
    });
  }
};

// Update brand
const updateBrand = async (req, res) => {
  try {
    const brand = await Brand.findByIdAndUpdate(
      req.params.id,
      req.body,
      { 
        new: true, 
        runValidators: true 
      }
    );

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Brand not found'
      });
    }

    res.json({
      success: true,
      message: 'Brand updated successfully',
      data: brand
    });
  } catch (error) {
    console.error('Update brand error:', error);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid brand ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while updating brand'
    });
  }
};

// Delete brand (soft delete by setting isActive to false)
const deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Brand not found'
      });
    }

    res.json({
      success: true,
      message: 'Brand deleted successfully',
      data: brand
    });
  } catch (error) {
    console.error('Delete brand error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid brand ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while deleting brand'
    });
  }
};

// Hard delete brand (permanent removal)
const hardDeleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Brand not found'
      });
    }

    res.json({
      success: true,
      message: 'Brand permanently deleted successfully'
    });
  } catch (error) {
    console.error('Hard delete brand error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid brand ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while deleting brand'
    });
  }
};

// Get active brands only
const getActiveBrands = async (req, res) => {
  try {
    const brands = await Brand.find({ isActive: true })
      .sort({ sortOrder: 1, name: 1 });

    res.json({
      success: true,
      data: brands
    });
  } catch (error) {
    console.error('Get active brands error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching active brands'
    });
  }
};

module.exports = {
  getAllBrands,
  getBrandById,
  getBrandBySlug,
  createBrand,
  updateBrand,
  deleteBrand,
  hardDeleteBrand,
  getActiveBrands
};