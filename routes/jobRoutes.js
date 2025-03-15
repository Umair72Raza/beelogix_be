const express = require("express");
const { createJob, getAllJobs, updateJob, deleteJob } = require("../controllers/jobController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Public Route - Get all jobs with pagination
router.get("/", getAllJobs);

// Protected Routes
router.post("/", authMiddleware, createJob);
router.put("/:id", authMiddleware, updateJob);
router.delete("/:id", authMiddleware, deleteJob);

module.exports = router;
