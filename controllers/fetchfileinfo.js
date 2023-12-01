const fileInfo = require("../models/fileInfo");

// using get request to fetch file info from mongo db by passing query parameters in params.
const fetchfileInfo = async (req, res) => {
  // converting params value to the value that database can read
  let recievedCourseName = req.params["course"];
  let courseName = recievedCourseName.replace(/\./g, "").toUpperCase();

  // setting value of sem from params
  let recievedSem = req.params["semester"];
  let recievedSubjectCode = req.params["subjectCode"];

  // converting params value to the value that database can read
  let recievedCategoryName = req.params["category"];
  let categoryName = recievedCategoryName.replace(/\./g, "").toUpperCase();

  // descending order sort
  const sort = { year: -1 };

  // query for mongo db
  let filesData = await fileInfo
    .find({
      category: categoryName,
      semester: recievedSem,
      course: courseName,
      subjectCode: recievedSubjectCode,
    })
    .sort(sort);

  try {
    res.send(filesData);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error Occured");
  }
};

module.exports = { fetchfileInfo };
