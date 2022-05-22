exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  exports.translatorBoard = (req, res) => {
    res.status(200).send("Translator Content.");
  };
  exports.datascientistBoard = (req, res) => {
    res.status(200).send("Data Scientist Content.");
  };