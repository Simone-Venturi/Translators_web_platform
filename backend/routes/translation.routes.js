const { authJwt } = require("../middleware");
const controller = require("../controllers/translation.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get(
    "/api/translation/all",
    [authJwt.verifyToken],
    controller.allTranslations
  );  
  app.post(
    "/api/translation/create",
    [authJwt.verifyToken, authJwt.isTranslator],
    controller.createTranslation
  );
  app.get(
    "/api/translation/allNotReviewed/:fromLanguage/:toLanguage",
    [authJwt.verifyToken, authJwt.isTranslator],
    controller.allTranslationsNotReviewdByUser
  );
};