const connectToMongo = require("./dbconnect");
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const multer = require("multer");

connectToMongo();
const app = express();
const port = process.env.port;

app.use(express.json());
app.use(cors());
// portfolio
app.use("/codewdme/portfolio", require("./routes/fetchprojectinfo"));
app.use("/codewdme/portfolio", require("./routes/addprojectinfo"));
// ju nexus
app.use("/edgerunners/junexus", require("./routes/fetchfileinfo"));
app.use("/edgerunners/junexus", require("./routes/addfileinfo"));
app.use("/edgerunners/junexus", require("./routes/mailuploadedfile.js"));

app.listen(port, () => {
  console.log(`server started at port ${port}`);
});

exports.api = functions.https.onRequest(app);
