const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');

// Configure multer for temporary storage
const storage = multer.memoryStorage();

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

// Create multer upload instance
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: fileFilter
});

// Image processing middleware using sharp
const processImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(req.file.originalname)}`;
    const outputPath = path.join(__dirname, '../uploads', filename);

    // Ensure uploads directory exists
    const uploadsDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Crop and resize image to 450x350
    await sharp(req.file.buffer)
      .resize(450, 350, {
        fit: 'cover',
        position: 'center'
      })
      .toFile(outputPath);

    // Store the filename in req.file for later use
    req.file.filename = filename;
    req.file.path = `/uploads/${filename}`;

    next();
  } catch (error) {
    console.error('Image processing error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error processing image',
      error: error.message 
    });
  }
};

module.exports = { upload, processImage };