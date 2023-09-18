const express = require("express");
const router = express.Router();
let mailId = require("../models/mailid");

// using get request to fetch file info from mongo db by passing query parameters in params.
router.get("/verifymailid/:mailid", async (req, res) => {
  // converting params value to the value that database can read
  let recievedEmailId = req.params["mailid"];

  // query for mongo db
  let verificationData = await mailId.find({
    emailId: recievedEmailId,
  });

  try {
    if (verificationData.length === 1) {
      res.status(200).send({ verified: "true" });
    } else {
      res.status(200).send({ verified: "false" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("false");
  }
});

module.exports = router;
