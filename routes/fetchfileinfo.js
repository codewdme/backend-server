const express = require("express");
const router = express.Router();
const fileInfo = require("../models/fileInfo");

// using get request to fetch file info from mongo db by passing query parameters in params.
router.get("/fetchfileinfo/:category/:course/:semester", async (req, res) => {
  // converting params value to the value that database can read
  let recievedCourseName = req.params["course"];
  let courseName = recievedCourseName.replace(/\./g, "").toUpperCase();

  // setting value of sem from params
  let sem = req.params["semester"];
  let recievedCategoryName = req.params["category"];
  let categoryName = recievedCategoryName.replace(/\./g, "").toUpperCase();
  // descending order sort
  const sort = { year: -1 };
  // query for mongo db

  let filesData = await fileInfo
    .find({
      category: categoryName,
      semester: sem,
      course: courseName,
    })
    .sort(sort);

  try {
    res.send(filesData);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error Occured");
  }
});

module.exports = router;
