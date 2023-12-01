const projectInfo = require("../../models/projectInfo");

// get all projectInfo using GET : "/api/projectInfo/fetchallprojectInfo" . login required.
const addProjectInfo = async (req, res) => {
  // checks whether there exists a projectInfo with that description already.
  let data = await projectInfo.findOne({
    githubRepoUrl: req.body.githubRepoUrl,
  });
  if (data) {
    return res.status(400).json({ message: "file already exists" });
  }
  //  creates a new projectInfo if one doesn't exist
  try {
    newData = await projectInfo.create({
      projectName: req.body.projectName,
      description: req.body.description,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      hostingUrl: req.body.hostingUrl,
      githubRepoUrl: req.body.githubRepoUrl,
      year: req.body.year,
    });
    res.send(newData);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error Occured");
  }
};

module.exports = { addProjectInfo };
