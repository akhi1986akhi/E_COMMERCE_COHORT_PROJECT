const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  getCategory,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryTree,
  getCategoriesWithProductCount
} = require('../controllers/categoryController');
const { protect, authorize } = require('../middleware/auth');
// Public routes
router.get('/', getAllCategories);
router.get('/tree', getCategoryTree);
router.get('/stats/products', getCategoriesWithProductCount);
router.get('/slug/:slug', getCategoryBySlug);
router.get('/:id', getCategory);

// Admin routes (protected - add authentication middleware as needed)
router.post('/',protect, createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;