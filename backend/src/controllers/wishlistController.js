const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');
const mongoose = require('mongoose');
const crypto = require('crypto');

// @desc    Get user's wishlist
// @route   GET /api/wishlist
// @access  Private
const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id })
      .populate('items.product', 'name price images slug')
      .sort({ 'items.addedAt': -1 });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: 'Wishlist not found'
      });
    }

    res.status(200).json({
      success: true,
      data: wishlist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Add item to wishlist
// @route   POST /api/wishlist/items
// @access  Private
const addToWishlist = async (req, res) => {
  try {
    const { productId, note } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    let wishlist = await Wishlist.findOne({ user: req.user.id });

    // Create wishlist if it doesn't exist
    if (!wishlist) {
      wishlist = new Wishlist({
        user: req.user.id,
        items: []
      });
    }

    // Check if product already exists in wishlist
    const existingItemIndex = wishlist.items.findIndex(
      item => item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Update existing item
      wishlist.items[existingItemIndex].note = note;
      wishlist.items[existingItemIndex].addedAt = new Date();
    } else {
      // Add new item
      wishlist.items.push({
        product: productId,
        note: note
      });
    }

    await wishlist.save();

    // Populate the product details
    await wishlist.populate('items.product', 'name price images slug');

    res.status(200).json({
      success: true,
      message: 'Item added to wishlist',
      data: wishlist
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

// @desc    Remove item from wishlist
// @route   DELETE /api/wishlist/items/:productId
// @access  Private
const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: 'Wishlist not found'
      });
    }

    // Remove the item
    wishlist.items = wishlist.items.filter(
      item => item.product.toString() !== productId
    );

    await wishlist.save();

    res.status(200).json({
      success: true,
      message: 'Item removed from wishlist',
      data: wishlist
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

// @desc    Clear wishlist
// @route   DELETE /api/wishlist/items
// @access  Private
const clearWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: 'Wishlist not found'
      });
    }

    wishlist.items = [];
    await wishlist.save();

    res.status(200).json({
      success: true,
      message: 'Wishlist cleared successfully',
      data: wishlist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Toggle wishlist privacy
// @route   PATCH /api/wishlist/privacy
// @access  Private
const toggleWishlistPrivacy = async (req, res) => {
  try {
    const { isPublic } = req.body;

    const wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: 'Wishlist not found'
      });
    }

    wishlist.isPublic = isPublic;
    await wishlist.save();

    res.status(200).json({
      success: true,
      message: `Wishlist is now ${isPublic ? 'public' : 'private'}`,
      data: wishlist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get public wishlist by share token
// @route   GET /api/wishlist/shared/:token
// @access  Public
const getSharedWishlist = async (req, res) => {
  try {
    const { token } = req.params;

    const wishlist = await Wishlist.findOne({ shareToken: token, isPublic: true })
      .populate('items.product', 'name price images slug')
      .populate('user', 'firstName lastName')
      .select('-shareToken');

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: 'Wishlist not found or is private'
      });
    }

    res.status(200).json({
      success: true,
      data: wishlist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get share token
// @route   GET /api/wishlist/share-token
// @access  Private
const getShareToken = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id, isPublic: true });

    if (!wishlist) {
      return res.status(400).json({
        success: false,
        message: 'Wishlist must be public to get share token'
      });
    }

    if (!wishlist.shareToken) {
      wishlist.shareToken = crypto.randomBytes(16).toString('hex');
      await wishlist.save();
    }

    res.status(200).json({
      success: true,
      data: {
        shareToken: wishlist.shareToken,
        shareUrl: `${req.protocol}://${req.get('host')}/api/wishlist/shared/${wishlist.shareToken}`
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Check if product is in wishlist
// @route   GET /api/wishlist/check/:productId
// @access  Private
const checkProductInWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({
      user: req.user.id,
      'items.product': productId
    });

    const isInWishlist = !!wishlist;

    res.status(200).json({
      success: true,
      data: {
        isInWishlist,
        productId
      }
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

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  toggleWishlistPrivacy,
  getSharedWishlist,
  getShareToken,
  checkProductInWishlist
};