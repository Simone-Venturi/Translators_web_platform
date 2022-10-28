const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../db/models");
const User = db.user;
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};
isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRole().then(role => {
      if (role.role_admin === true){
          next();
          return;
      }
      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};
isTranslator = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRole().then(role => {
      if (role.role_translator === true) {
        next();
        return;
      }
      res.status(403).send({
        message: "Require Translator Role!"
      });
    });
  });
};
isDataScientist = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRole().then(role => {
      if (role.role_data_scientist === true) {
        next();
        return;
      }
      res.status(403).send({
        message: "Require Data Scientist Role!"
      });
    });
  });
};
const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isTranslator: isTranslator,
  isDataScientist: isDataScientist
};
module.exports = authJwt;