const express = require('express');
const router = express.Router();
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  toggleWishlistPrivacy,
  getSharedWishlist,
  getShareToken,
  checkProductInWishlist
} = require('../controllers/wishlistController');

// Import middleware
const { protect } = require('../middleware/auth');

// Protected routes
router.use(protect);

router.route('/')
  .get(getWishlist); // GET /api/wishlist - Get user's wishlist

router.route('/items')
  .post(addToWishlist)    // POST /api/wishlist/items - Add item to wishlist
  .delete(clearWishlist); // DELETE /api/wishlist/items - Clear wishlist

router.route('/items/:productId')
  .delete(removeFromWishlist); // DELETE /api/wishlist/items/:productId - Remove item

router.route('/privacy')
  .patch(toggleWishlistPrivacy); // PATCH /api/wishlist/privacy - Toggle privacy

router.route('/share-token')
  .get(getShareToken); // GET /api/wishlist/share-token - Get share token

router.route('/check/:productId')
  .get(checkProductInWishlist); // GET /api/wishlist/check/:productId - Check if product is in wishlist

// Public route (no authentication required)
router.route('/shared/:token')
  .get(getSharedWishlist); // GET /api/wishlist/shared/:token - Get public wishlist

module.exports = router;