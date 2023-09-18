const express = require("express");
const router = express.Router();
const mailId = require("../models/mailid");
const { body, validationResult } = require("express-validator");

// crating new registered mailId
router.post(
  "/addmailid",

  async (req, res) => {
    // if errors, return bad request and the errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // checks whether there exists a fileInfo with that description already.
    let mailIdData = await mailId.findOne({ emailId: req.body.emailId });
    if (mailIdData) {
      return res.status(400).json({ message: "Email-Id already exists" });
    }
    //  creates a new  regisetered mail Id if one doesn't exist
    try {
      mailIdData = await mailId.create({
        emailId: req.body.emailId,
        username: req.body.username,
      });
      res.send(mailIdData);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error Occured");
    }
  }
);

module.exports = router;
