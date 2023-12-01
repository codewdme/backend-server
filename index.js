require("dotenv").config();

const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 3001;
const app = express();
const portfolioRoutes = require("./routes/portfolioRoutes");
const nexusRoutes = require("./routes/nexusRoutes");

// middlewares:
app.use(express.json());
app.use(cors());
app.use((res, req, next) => {
  console.log(req.path, req.method);
  next();
});

// portfolio routes:
app.use("/codewdme/portfolio", portfolioRoutes);
// ju nexus routes:
app.use("/edgerunners/junexus", nexusRoutes);
app.use("/edgerunners/junexus", require("./controllers/mailuploadedfile"));

// connect to database and listen to requests
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log("connected to DB & server listening at port ", port);
    });
  })
  .catch((error) => {
    console.log(error);
  });

exports.api = functions.https.onRequest(app);
