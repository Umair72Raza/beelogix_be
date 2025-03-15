const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const dotenv = require("dotenv");

dotenv.config();

const mongoURI = process.env.DATABASE;
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads"); // Collection name
});

// Get a Resume File by ID
exports.getResume = async (req, res) => {
  try {
    gfs.files.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) }, (err, file) => {
      if (!file || file.length === 0) {
        return res.status(404).json({ message: "File not found" });
      }

      // Set response headers for file download
      res.set("Content-Type", file.contentType);
      const readstream = gfs.createReadStream(file._id);
      readstream.pipe(res);
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
