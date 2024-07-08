const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/forgot-password', userController.forgotPassword);
router.put('/profile', authMiddleware.authenticateToken, userController.updateUserProfile);
router.put('/change-password', authMiddleware.authenticateToken, userController.changePassword);

module.exports = router;
