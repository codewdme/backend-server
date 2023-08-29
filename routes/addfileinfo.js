const express = require("express");
const router = express.Router();
const fileInfo = require("../models/fileInfo");
const { body, validationResult } = require("express-validator");

// get all fileInfo using GET : "/api/fileInfo/fetchallfileInfo" . login required.
router.post(
  "/addfileinfo",

  async (req, res) => {
    // if errors, return bad request and the errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // checks whether there exists a fileInfo with that description already.
    let filesData = await fileInfo.findOne({ fileName: req.body.fileName });
    if (filesData) {
      return res.status(400).json({ message: "file already exists" });
    }
    //  creates a new fileInfo if one doesn't exist
    try {
      let originalString = req.body.course;
      let courseName = originalString.replace(/\./g, "").toUpperCase();

      filesData = await fileInfo.create({
        fileName: req.body.fileName,
        fileUrl: req.body.fileUrl,
        fileDownloadUrl: req.body.fileDownloadUrl,
        year: req.body.year,
        course: courseName,
        semester: req.body.semester,
        examName: req.body.examName,
      });
      res.send(filesData);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error Occured");
    }
  }
);

module.exports = router;
