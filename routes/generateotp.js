const express = require("express");
const { options } = require("./verifymailid");
const router = express.Router();
const nodemailer = require("nodemailer");
let emailIdUnderVerification = "creator.techwhiz@gmail.com";
const mailId = require("../models/mailId");

const transporter = nodemailer.createTransport({
  service: "Gmail", // Use your email service
  auth: {
    user: "junexus.edgerunners@gmail.com", // Replace with your email
    pass: "zxcw vinh mfyy jrej", // Replace with your email password
  },
});
var otp;
async function generateotp() {
  otp = Math.floor((Math.random() + 1) * 100000);
  console.log(otp);
  generateMail();
}

async function generateMail() {
  const mailOptions = {
    from: "junexus.edgerunners@gmail.com",
    to: emailIdUnderVerification, // Replace with the recipient's email
    subject: "OTP for Email Verification",
    text: `Please use this OTP: ${otp} to verify your Email-Id to proceed with file uploading at JU NEXUS.`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email error:", error);
      return {
        message:
          "OTP generation failed due to heavy traffic, please try again after some time.",
      };
    }
    console.log(`Email sent: ${emailIdUnderVerification}`, info.response);
    // res.json({ message: "OTP sent Successfully" });
  });
}

async function addMailId() {
  let mailIdData = await mailId.findOne({ emailId: emailIdUnderVerification });
  if (mailIdData) {
    console.log({ message: "Email-Id already exists" });
  }
  //  creates a new  regisetered mail Id if one doesn't exist
  try {
    mailIdData = await mailId.create({
      emailId: emailIdUnderVerification,
      username: "To be set",
    });
    console.log(mailIdData);
  } catch (error) {
    console.error(error.message);
    // res.status(500).send("some error Occured");
  }
}

router.post("/generateotp", async (req, res) => {
  emailIdUnderVerification = req.body.userEmailId;
  generateotp();
  res.status(200).send({ message: `OTP sent to ${emailIdUnderVerification}` });
});

router.post("/verifyotp", async (req, res) => {
  let recievedOtp = req.body.inputOtp;
  emailIdUnderVerification = req.body.userEmailId;
  console.log("recieved otp", recievedOtp);

  if (recievedOtp == otp) {
    addMailId();
    res.send({
      message: "true",
    });
  } else {
    res.send({ message: "false" });
  }
});

module.exports = router;
