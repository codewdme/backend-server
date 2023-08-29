const express = require("express");
const router = express.Router();
const fileInfo = require("../models/fileInfo");

// using get request to fetch file info from mongo db by passing query parameters in params.
router.get(
  "/fetchfileinfo/:course/:semester",

  async (req, res) => {
    // converting params value to the value that database can read
    let originalString = req.params["course"];
    let courseName = originalString.replace(/\./g, "").toUpperCase();

    // setting value of sem from params
    let sem = req.params["semester"];

    // query for mongo db

    let filesData = await fileInfo.find({ semester: sem, course: courseName });

    try {
      res.send(filesData);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error Occured");
    }
  }
);

module.exports = router;
