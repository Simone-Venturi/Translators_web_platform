const { authJwt } = require("../middleware");
const controller = require("../controllers/language.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get(
    "/api/language/all",
    authJwt.verifyToken,
    controller.allLanguages
  );
  app.get(
    "/api/language/known",
    authJwt.verifyToken,
    controller.allLanguagesKnownByUser
  );
  app.post(
    "/api/language/known",
    authJwt.verifyToken,
    controller.updateLanguagesKnownByUser
  );
};