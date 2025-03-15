const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  applicantName: { type: String, required: true },
  applicantEmail: { type: String, required: true },
  resumeLink: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Application", ApplicationSchema);
