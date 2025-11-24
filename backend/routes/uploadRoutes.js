const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ POST /api/upload - Handle file upload
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }
  res.status(200).json({ filename: req.file.filename });
});

// ✅ GET /api/files - Return list of uploaded files
router.get('/files', (req, res) => {
  const uploadDir = path.join(__dirname, '../uploads');

  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to read upload directory.' });
    }

    const fileList = files.map((filename) => ({
      name: filename,
      url: `/uploads/${filename}`,
    }));

    res.json(fileList);
  });
});
// In uploadRoutes.js
router.delete('/files/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../uploads', filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Failed to delete file:", err);
      return res.status(500).json({ message: "Failed to delete file." });
    }
    res.json({ message: "File deleted successfully." });
  });
});

module.exports = router;
