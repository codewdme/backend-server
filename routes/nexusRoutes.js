const express = require("express");

// router
const router = express.Router();

// import controllers:
const { addMailId } = require("../controllers/addmailid");
const { verifyMailId } = require("../controllers/verifymailid");
// const { mailUploadedFile } = require("../controllers/mailuploadedfile");
const { fetchfileInfo } = require("../controllers/fetchfileinfo");
const { addFileInfo } = require("../controllers/addfileinfo");
const { generateOtp, verifyOtp } = require("../controllers/generateotp");

// fetchfileinfo:
router.get(
  "/fetchfileinfo/:category/:course/:semester/:subjectCode",
  fetchfileInfo
);

// add file info:
router.post("/addfileinfo", addFileInfo);

// add mail Id:
router.post("/addmailid", addMailId);

// generate otp and verify otp:
router.post("/generateotp", generateOtp);
router.post("/verifyotp", verifyOtp);

// verify mail id:
router.get("/verifymailid/:mailid", verifyMailId);

// mail uploaded file:
// router.post("/mailuploadedfile", mailUploadedFile);

module.exports = router;
