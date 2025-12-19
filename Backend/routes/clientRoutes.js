const express = require('express');
const router = express.Router();
const { addClient, getAllClients } = require('../controllers/clientController');
const { upload, processImage } = require('../middleware/upload');

// Add new client (with image upload)
router.post('/', upload.single('image'), processImage, addClient);

// Get all clients
router.get('/', getAllClients);

module.exports = router;