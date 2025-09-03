// routes/brandRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllBrands,
  getBrandById,
  getBrandBySlug,
  createBrand,
  updateBrand,
  deleteBrand,
  hardDeleteBrand,
  getActiveBrands
} = require('../controllers/brandController');

// Public routes
router.get('/', getAllBrands);
router.get('/active', getActiveBrands);
router.get('/slug/:slug', getBrandBySlug);
router.get('/:id', getBrandById);

// Protected routes (add authentication middleware as needed)
router.post('/', createBrand);
router.put('/:id', updateBrand);
router.delete('/:id', deleteBrand);
router.delete('/:id/hard', hardDeleteBrand);

module.exports = router;