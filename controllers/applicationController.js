const Application = require("../models/Application");
const Job = require("../models/Job");
const { sendJobApplicationEmail } = require("../utilities/emailService");

// Apply for a Job with Resume Upload & Send Email
exports.applyForJob = async (req, res) => {
  try {
    const { jobId, applicantName, applicantEmail } = req.body;

    if (!jobId || !applicantName || !applicantEmail || !req.file) {
      return res.status(400).json({ message: "All fields including a resume file are required" });
    }

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const jobOwner = await User.findById(job.createdBy);
    if (!jobOwner) return res.status(404).json({ message: "Job owner not found" });

    // Save the job application
    const application = new Application({
      jobId,
      applicantName,
      applicantEmail,
      resumeFileName: req.file.filename, // FIXED: Store filename instead of ID
    });

    await application.save();

    // Construct the resume download link
    const resumeLink = `${process.env.BASE_URL}/uploads/${req.file.filename}`; // FIXED: Use filename

    // Send email notification to job owner
    await sendJobApplicationEmail(jobOwner.email, applicantName, job.title, resumeLink);

    res.status(201).json({ message: "Application submitted successfully", application });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Get All Applications for a Job (Only Job Owner)
exports.getApplicationsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to view applications for this job" });
    }

    const applications = await Application.find({ jobId });
    res.status(200).json({ totalApplications: applications.length, applications });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
