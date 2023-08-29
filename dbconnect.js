const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://codewdme:%40-mera-database@codewdme.ou24zr8.mongodb.net/";

const connectToMongo = async () => {
  await mongoose.connect(mongoURI);
  console.log("connected to db successfully");
};

module.exports = connectToMongo;
