const Category = require('../models/Category');

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getAllCategories = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'sortOrder',
      sortOrder = 'asc',
      isActive,
      parent,
      search
    } = req.query;

    // Build filter object
    const filter = {};
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    if (parent !== undefined) filter.parent = parent === 'null' ? null : parent;
    
    // Search functionality
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calculate skip value
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get categories with pagination
    const categories = await Category.find(filter)
      .populate([
        { path: 'parent', select: 'name' },
        { path: 'ancestors', select: 'name' }
      ])
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination info
    const totalItems = await Category.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / parseInt(limit));

    res.json({
      success: true,
      data: categories,
      pagination: {
        page: parseInt(page),
        totalPages,
        totalItems,
        hasNext: parseInt(page) < totalPages,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Get all categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching categories'
    });
  }
};

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public
const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
      .populate('parent', 'name')
      .populate('ancestors', 'name')
      .populate('subcategories')
      .populate('productsCount');

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Get category error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid category ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while fetching category'
    });
  }
};

// @desc    Get category by slug
// @route   GET /api/categories/slug/:slug
// @access  Public
const getCategoryBySlug = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug })
      .populate('parent', 'name')
      .populate('ancestors', 'name')
      .populate('subcategories')
      .populate('productsCount');

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Get category by slug error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching category'
    });
  }
};

// @desc    Create new category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = async (req, res) => {
  try {
    const {
      name,
      description,
      parent,
      isActive,
      sortOrder,
      metaTitle,
      metaDescription,
      attributes,
      image
    } = req.body;

    // Validation
    if (!name || name.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Category name is required'
      });
    }

    if (name.length > 50) {
      return res.status(400).json({
        success: false,
        message: 'Category name must be less than 50 characters'
      });
    }

    if (description && description.length > 500) {
      return res.status(400).json({
        success: false,
        message: 'Description must be less than 500 characters'
      });
    }

    // Validate parent category exists if provided
    if (parent && parent !== 'null') {
      const parentCategory = await Category.findById(parent);
      if (!parentCategory) {
        return res.status(400).json({
          success: false,
          message: 'Parent category not found'
        });
      }
    }

    const categoryData = {
      name: name.trim(),
      description: description ? description.trim() : undefined,
      parent: parent && parent !== 'null' ? parent : null,
      isActive: isActive !== undefined ? isActive : true,
      sortOrder: sortOrder || 0,
      metaTitle: metaTitle ? metaTitle.trim() : undefined,
      metaDescription: metaDescription ? metaDescription.trim() : undefined,
      attributes: attributes || [],
      image: image || {}
    };

    const category = new Category(categoryData);
    const savedCategory = await category.save();
    
    // Populate the saved category
    await savedCategory.populate([
      { path: 'parent', select: 'name' },
      { path: 'ancestors', select: 'name' }
    ]);

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: savedCategory
    });
  } catch (error) {
    console.error('Create category error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Category name already exists'
      });
    }
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }
    
    if (error.message === 'Parent category not found') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while creating category'
    });
  }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = async (req, res) => {
  try {
    const {
      name,
      description,
      parent,
      isActive,
      sortOrder,
      metaTitle,
      metaDescription,
      attributes,
      image
    } = req.body;

    // Check if category exists
    const existingCategory = await Category.findById(req.params.id);
    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    // Validation
    if (name !== undefined) {
      if (!name || name.trim() === '') {
        return res.status(400).json({
          success: false,
          message: 'Category name cannot be empty'
        });
      }
      if (name.length > 50) {
        return res.status(400).json({
          success: false,
          message: 'Category name must be less than 50 characters'
        });
      }
    }

    if (description !== undefined && description.length > 500) {
      return res.status(400).json({
        success: false,
        message: 'Description must be less than 500 characters'
      });
    }

    // Prepare update data
    const updateData = {};
    if (name !== undefined) updateData.name = name.trim();
    if (description !== undefined) updateData.description = description.trim();
    if (parent !== undefined) updateData.parent = parent || null;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (sortOrder !== undefined) updateData.sortOrder = sortOrder;
    if (metaTitle !== undefined) updateData.metaTitle = metaTitle ? metaTitle.trim() : null;
    if (metaDescription !== undefined) updateData.metaDescription = metaDescription ? metaDescription.trim() : null;
    if (attributes !== undefined) updateData.attributes = attributes;
    if (image !== undefined) updateData.image = image;

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate([
      { path: 'parent', select: 'name' },
      { path: 'ancestors', select: 'name' }
    ]);

    res.json({
      success: true,
      message: 'Category updated successfully',
      data: category
    });
  } catch (error) {
    console.error('Update category error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid category ID'
      });
    }
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Category name already exists'
      });
    }
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while updating category'
    });
  }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    // Check if category has subcategories
    const subcategories = await Category.countDocuments({ parent: req.params.id });
    if (subcategories > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete category with subcategories. Please delete subcategories first.'
      });
    }

    await Category.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    console.error('Delete category error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid category ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while deleting category'
    });
  }
};

// @desc    Get category tree
// @route   GET /api/categories/tree
// @access  Public
const getCategoryTree = async (req, res) => {
  try {
    const { includeInactive = 'false' } = req.query;
    const filter = includeInactive === 'true' ? {} : { isActive: true };

    const categories = await Category.find(filter)
      .select('name slug parent sortOrder isActive')
      .sort({ sortOrder: 1, name: 1 });

    // Build tree structure
    const buildTree = (parentId = null) => {
      return categories
        .filter(cat => {
          if (parentId === null) return cat.parent === null;
          return cat.parent && cat.parent.toString() === parentId;
        })
        .map(cat => ({
          _id: cat._id,
          name: cat.name,
          slug: cat.slug,
          parent: cat.parent,
          sortOrder: cat.sortOrder,
          isActive: cat.isActive,
          subcategories: buildTree(cat._id.toString())
        }));
    };

    const tree = buildTree();

    res.json({
      success: true,
      data: tree
    });
  } catch (error) {
    console.error('Get category tree error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching category tree'
    });
  }
};

// @desc    Get categories with products count
// @route   GET /api/categories/stats/products
// @access  Public
const getCategoriesWithProductCount = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true })
      .populate('productsCount')
      .select('name slug productsCount')
      .sort({ name: 1 });

    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Get categories with product count error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching categories stats'
    });
  }
};

module.exports = {
  getAllCategories,
  getCategory,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryTree,
  getCategoriesWithProductCount
};