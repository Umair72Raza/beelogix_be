const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

// Send Job Application Email
exports.sendJobApplicationEmail = async (jobOwnerEmail, applicantName, jobTitle, resumeLink) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: jobOwnerEmail,
      subject: `New Job Application for ${jobTitle}`,
      html: `
        <h3>New Job Application Received</h3>
        <p><b>Applicant Name:</b> ${applicantName}</p>
        <p><b>Job Title:</b> ${jobTitle}</p>
        <p><b>Resume:</b> <a href="${resumeLink}" target="_blank">Download Resume</a></p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${jobOwnerEmail}`);
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};
