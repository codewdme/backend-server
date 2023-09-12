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
    default: null,
  },
  unitNo: {
    type: Number,
    default: null,
  },
  assignmentNo: {
    type: Number,
    default: "NULL",
  },
  author: {
    type: String,
    default: null,
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
    type: Number,
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
    type: Number,
    required: true,
  },
  dateOfUpload: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("fileInfo", fileInfoSchema);
