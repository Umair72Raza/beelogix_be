const mongoose = require("mongoose");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const dotenv = require("dotenv");

dotenv.config();

// Debug log to verify DATABASE URI is loaded
console.log("DEBUG: MongoDB URI from .env:", process.env.DATABASE);

if (!process.env.DATABASE) {
  throw new Error("❌ ERROR: DATABASE environment variable is missing!");
}

// MongoDB Connection URI
const mongoURI = process.env.DATABASE;

// Connect to MongoDB
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

conn.on("error", (err) => {
  console.error("❌ MongoDB Connection Error:", err);
});

conn.once("open", () => {
  console.log("✅ MongoDB GridFS Connection Established!");
});

// GridFS Storage
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => ({
    filename: `${Date.now()}-${file.originalname}`,
    bucketName: "resumes",
  }),
});

const upload = multer({ storage });

module.exports = {upload, conn};
