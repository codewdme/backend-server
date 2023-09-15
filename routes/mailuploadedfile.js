// fileUploadRoutes.js
const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const path = require("path");

const router = express.Router();

const AWS = require("aws-sdk");

// Configure AWS SDK with your credentials
AWS.config.update({
  accessKeyId: "ASIAT3QG5RJK5CQQ2GY4",
  secretAccessKey: "5ZLuty8kP2Czrhu6vUxtlBUeqRjREJeAmvsgZIsY",
  region: "eu-central-1",
});

// Create an S3 instance
const s3 = new AWS.S3();

const upload = multer();

const bucketName = "cyclic-naughty-lion-train-eu-central-1";

const transporter = nodemailer.createTransport({
  service: "Gmail", // Use your email service
  auth: {
    user: "junexus.edgerunners@gmail.com", // Replace with your email
    pass: "@-junexus-11", // Replace with your email password
  },
});

router.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  // Define the file key and upload parameters
  const fileKey = `uploads/${Date.now()}-${req.file.originalname}`;
  const params = {
    Bucket: bucketName,
    Key: fileKey,
    Body: req.file.buffer, // Use req.file.buffer to access the uploaded file data
  };

  try {
    await s3.upload(params).promise();
    res.json({ message: "File uploaded to S3 successfully." });
  } catch (error) {
    console.error("S3 upload error:", error);
    res.status(500).json({ message: "Error uploading file to S3." });
  }
});

const mailOptions = {
  from: "junexus.edgerunners@gmail.com",
  to: "creator.techwhiz@gmail.com", // Replace with the recipient's email
  subject: "File Attachment",
  text: "Please find the attached file.",
  attachments: [
    {
      filename: req.file.filename,
      path: req.file.path,
    },
  ],
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("Email error:", error);
    return res
      .status(500)
      .json({ message: "File upload and email sending failed." });
  }
  console.log("Email sent:", info.response);
  res.json({ message: "File uploaded and email sent successfully." });
});

module.exports = router;
