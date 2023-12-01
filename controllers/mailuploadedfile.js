// fileUploadRoutes.js
const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const path = require("path");
const os = require("os");
const fs = require("fs");

const router = express.Router();

const tempDir = os.tmpdir();

const storage = multer.diskStorage({
  destination: `${tempDir}/uploads/`,
  filename: (req, file, callback) => {
    console.log("Check");
    callback(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });

const transporter = nodemailer.createTransport({
  service: "Gmail", // Use your email service
  auth: {
    user: "junexus.edgerunners@gmail.com", // Replace with your email
    pass: "zxcw vinh mfyy jrej", // Replace with your email password
  },
});

router.post("/mailuploadedfile", upload.single("file"), (req, res) => {
  console.log(req.file);
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

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
    // delete file code.
    const filePath = req.file.path; // Replace with the path to your file

    // Use the fs.unlink method to delete the file
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err}`);
      } else {
        console.log(`File deleted: ${filePath}`);
      }
    });
    console.log("Email sent:", info.response);
    res.json({ message: "File uploaded and email sent successfully." });
  });
});

module.exports = router;
