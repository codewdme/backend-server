const express = require("express");
const router = express.Router();
const fileInfo = require("../models/fileInfo");

// using get request to fetch file info from mongo db by passing query parameters in params.
router.get(
  "/fetchfileinfo/:category/:course/:semester/:subjectCode",
  async (req, res) => {
    // converting params value to the value that database can read
    let recievedCourseName = req.params["course"];
    let courseName = recievedCourseName.replace(/\./g, "").toUpperCase();
    console.log("receivedCourseName", recievedCourseName);

    // setting value of sem from params
    let recievedSem = req.params["semester"];
    console.log("recievedSem", typeof recievedSem);
    let recievedSubjectCode = req.params["subjectCode"];
    console.log("subjectcode", typeof recievedSubjectCode);

    // converting params value to the value that database can read
    let recievedCategoryName = req.params["category"];
    console.log("recievedCategoryName", recievedCategoryName);
    let categoryName = recievedCategoryName.replace(/\./g, "").toUpperCase();

    // descending order sort
    const sort = { year: -1 };

    // query for mongo db
    let filesData = await fileInfo
      .find({
        category: categoryName,
        semester: recievedSem,
        course: courseName,
        subjectCode: recievedSubjectCode,
      })
      .sort(sort);

    try {
      res.send(filesData);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error Occured");
    }
  }
);

module.exports = router;
