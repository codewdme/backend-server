const fileInfo = require("../models/fileInfo");
const { body, validationResult } = require("express-validator");

// get all fileInfo using GET : "/api/fileInfo/fetchallfileInfo" . login required.
const addFileInfo = async (req, res) => {
  // if errors, return bad request and the errors.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // checks whether there exists a fileInfo with that description already.
  let filesData = await fileInfo.findOne({ fileUrl: req.body.fileUrl });
  if (filesData) {
    return res.status(400).json({ message: "file already exists" });
  }
  //  creates a new fileInfo if one doesn't exist
  try {
    let originalCourseName = req.body.course;
    let originalCategoryName = req.body.category;
    let courseName = originalCourseName.replace(/\./g, "").toUpperCase();
    let categoryName = originalCategoryName.replace(/\./g, "").toUpperCase();
    console.log("check");

    filesData = await fileInfo.create({
      subject: req.body.subject,
      subjectCode: req.body.subjectCode,
      fileUrl: req.body.fileUrl,
      fileDownloadUrl: req.body.fileDownloadUrl,
      year: req.body.year,
      course: courseName,
      category: categoryName,
      author: req.body.author,
      semester: req.body.semester,
      examName: req.body.examName,
      unitNo: req.body.unitNo,
      assignmentNo: req.body.assignmentNo,
    });
    res.send(filesData);
  } catch (error) {
    console.error(error.message);
    res.status(400).send("some error Occured");
  }
};

module.exports = { addFileInfo };
