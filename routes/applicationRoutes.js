const express = require("express");
const { applyForJob, getApplicationsForJob } = require("../controllers/applicationController");
const authMiddleware = require("../middlewares/authMiddleware");
const {upload}  = require("../middlewares/fileUploadMiddleware"); // FIXED!

const router = express.Router();

// Apply for a job with a resume file
router.post("/", authMiddleware, upload.single("resume"), applyForJob);

// Get all applications for a job (Only Job Owner)
router.get("/:jobId", authMiddleware, getApplicationsForJob);

module.exports = router;
