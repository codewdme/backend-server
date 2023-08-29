const express = require("express");
const router = express.Router();
const projectInfo = require("../../models/projectInfo");

// using get request to fetch file info from mongo db by passing query parameters in params.
router.get(
  "/fetchprojectinfo",

  async (req, res) => {
    let data = await projectInfo.find({});

    try {
      res.send(data);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error Occured");
    }
  }
);

module.exports = router;
