const mongoose = require("mongoose");
const { Schema } = mongoose;

const fileInfoSchema = new Schema({
  subject: {
    type: String,
    required: true,
  },
  examName: {
    type: String,
    default: "NULL",
  },
  subjectCode: {
    type: String,
    default: "NULL",
  },
  unitNo: {
    type: String,
    default: "NULL",
  },
  assignmentNo: {
    type: String,
    default: "NULL",
  },
  author: {
    type: String,
    default: "EdgeRunners",
  },

  category: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
    unique: true,
  },
  fileDownloadUrl: {
    type: String,
    required: true,
    unique: true,
  },
  year: {
    type: String,
    required: true,
  },
  dateOfUpload: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("fileInfo", fileInfoSchema);
