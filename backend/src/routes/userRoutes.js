// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {
  createNew,
  loginUser,
  getMe,
  getUser,
  getUsers,
  updateUser,
  updateUserAdmin,
  deleteUser,
  deleteUserAdmin,
  changePassword,
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendVerification,
  getUserStats
} = require('../controllers/userController');

// Middleware
const { protect, authorize } = require('../middleware/auth');
const { validateChangePassword, validateForgotPassword } = require('../middleware/validation');


// Public routes
router.post('/',  createNew);
router.post('/login',  loginUser);
router.post('/forgot-password', validateForgotPassword, forgotPassword);
router.patch('/reset-password/:token', resetPassword);
router.get('/verify-email/:token', verifyEmail);

// Protected routes (require authentication)
router.use(protect);

router.get('/me', getMe);
router.put('/me', updateUser);
router.delete('/me', deleteUser);
router.put('/change-password', validateChangePassword, changePassword);
router.post('/resend-verification', resendVerification);

// Admin routes (require admin role)
router.use(authorize('admin'));

router.get('/', getUsers);
router.get('/stats', getUserStats);
router.get('/:id', getUser);
router.put('/:id', updateUserAdmin);
router.delete('/:id', deleteUserAdmin);

module.exports = router;