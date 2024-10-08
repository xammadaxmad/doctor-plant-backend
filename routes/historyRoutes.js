const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const timestamp = Date.now();
        cb(null,  `${timestamp}__${file.originalname}`);
    }
});
const upload = multer({ storage });

router.post('/api/history/upload-image', authMiddleware.authenticateToken, upload.single('image'), historyController.uploadImage);
router.get('/api/history/get', authMiddleware.authenticateToken, historyController.getHistory);
router.delete('/api/history/:id', authMiddleware.authenticateToken, historyController.deleteHistory);

module.exports = router;
