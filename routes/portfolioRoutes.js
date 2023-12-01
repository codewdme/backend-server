const express = require("express");

// router:
const router = express.Router();

// import controllers:
const {
  fetchProjectInfo,
} = require("../controllers/Portfolio/fetchProjectInfo,js");
const { addProjectInfo } = require("../controllers/Portfolio/addProjectInfo");

// fetch project info:
router.get("/fetchprojectinfo", fetchProjectInfo);

// add project info
router.post("/addprojectinfo", addProjectInfo);

// mail uploadedd file:
// export the routes:
module.exports = router;
