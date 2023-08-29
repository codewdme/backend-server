const connectToMongo = require("./dbconnect");
const functions = require("firebase-functions");
const express = require("express");
var cors = require("cors");

connectToMongo();
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.use("/codewdme/portfolio", require("./routes/fetchprojectinfo"));
app.use("/codewdme/portfolio", require("./routes/addprojectinfo"));

app.listen(port, () => {
  console.log(`server started at port ${port}`);
});

exports.api = functions.https.onRequest(app);
