const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductStatus,
  updateStock,
  addVariant,
  getFeaturedProducts
} = require('../controllers/productController');

// Import middleware
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.route('/')
  .get(getProducts); // GET /api/products - Get all products

router.route('/featured')
  .get(getFeaturedProducts); // GET /api/products/featured - Get featured products

router.route('/:id')
  .get(getProduct); // GET /api/products/:id - Get single product

// Protected admin routes
router.use(protect);
// router.use(authorize('admin'));

router.route('/')
  .post(createProduct); // POST /api/products - Create new product

router.route('/:id')
  .put(updateProduct) // PUT /api/products/:id - Update product
  .delete(deleteProduct); // DELETE /api/products/:id - Delete product

router.route('/:id/status')
  .patch(toggleProductStatus); // PATCH /api/products/:id/status - Toggle product status

router.route('/:id/stock')
  .patch(updateStock); // PATCH /api/products/:id/stock - Update stock

router.route('/:id/variants')
  .post(addVariant); // POST /api/products/:id/variants - Add variant

module.exports = router;