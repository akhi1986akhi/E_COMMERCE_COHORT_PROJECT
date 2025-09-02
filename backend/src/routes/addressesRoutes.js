const express = require('express');
const router = express.Router();
const {
    getAddresses,
    getAddress,
    createAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    getDefaultAddress
} = require('../controllers/addressController');

// Import middleware
const { protect, authorize } = require('../middleware/auth');

// All routes are protected and require authentication
router.use(protect);

// Route definitions
router.route('/')
    .get(getAddresses)          // GET /api/addresses - Get all addresses for user
    .post(createAddress);       // POST /api/addresses - Create new address

router.route('/default')
    .get(getDefaultAddress);    // GET /api/addresses/default - Get default address

router.route('/:id')
    .get(getAddress)           // GET /api/addresses/:id - Get single address
    .put(updateAddress)        // PUT /api/addresses/:id - Update address
    .delete(deleteAddress);    // DELETE /api/addresses/:id - Delete address

router.route('/:id/set-default')
    .patch(setDefaultAddress); // PATCH /api/addresses/:id/set-default - Set address as default

module.exports = router;