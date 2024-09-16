const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/api/user/forgot-password', userController.forgotPassword);
router.put('/api/user/profile', authMiddleware.authenticateToken, userController.updateUserProfile);
router.put('/api/user/change-password', authMiddleware.authenticateToken, userController.changePassword);

module.exports = router;
