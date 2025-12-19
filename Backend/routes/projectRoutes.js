const express = require('express');
const router = express.Router();
const { addProject, getAllProjects } = require('../controllers/projectController');
const { upload, processImage } = require('../middleware/upload');

// Add new project (with image upload)
router.post('/', upload.single('image'), processImage, addProject);

// Get all projects
router.get('/', getAllProjects);

module.exports = router;