const express = require("express");
const { applyForJob, getApplicationsForJob } = require("../controllers/applicationController");
const authMiddleware = require("../middlewares/authMiddleware");
// const {upload}  = require("../middlewares/fileUploadMiddleware"); // FIXED!
const multer = require("multer");
const path = require('path');

const router = express.Router();

// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Set the destination folder for uploaded files
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      // Set the file name to be the current timestamp + original file name
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  // Initialize upload variable with the storage engine
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 1000000 }, // Limit file size to 1MB
    fileFilter: function (req, file, cb) {
      // Accept only image files
      const filetypes = /pdf|docx/;
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = filetypes.test(file.mimetype);
  
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb('Error: Images Only!');
      }
    }
  }).single('resume'); // 'file' is the field name in the form

  
  // Middleware to handle file upload
const uploadMiddleware = (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        // Handle errors
        return res.status(400).json({ message: err });
      } else if (!req.file) {
        // Handle case where no file was uploaded
        return res.status(400).json({ message: 'No file uploaded' });
      } else {
        // File uploaded successfully
        next();
      }
    });
  };

// Apply for a job with a resume file
router.post("/", authMiddleware, uploadMiddleware, (req, res, next) => {
  console.log("Request Body:", req.body); // Debug log
  console.log("Uploaded File:", req.file); // Debug log

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  next();
}, applyForJob);

// Route to handle file upload
router.post('/upload', uploadMiddleware, (req, res) => {
    res.json({ 
      message: 'File uploaded successfully!',
      file: req.file 
    });
  });
  
// Get all applications for a job (Only Job Owner)
router.get("/:jobId", authMiddleware, getApplicationsForJob);

module.exports = router;
