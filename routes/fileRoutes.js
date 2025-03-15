const express = require("express");
const { getResume } = require("../controllers/fileController");

const router = express.Router();

// Route to fetch resume file
router.get("/:id", getResume);

module.exports = router;
