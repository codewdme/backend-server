const mongoose = require("mongoose");
const { Schema } = mongoose;

const mailIdSchema = new Schema({
  emailId: { type: String, required: true },
  username: { type: String, required: true },
  dateOfVerification: { type: Date, default: Date.now },
});

module.exports = mongoose.model("mailId", mailIdSchema);
