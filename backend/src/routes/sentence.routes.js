const { authJwt } = require("../middleware");
const controller = require("../controllers/sentence.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get(
    "/api/sentence/all",
    authJwt.verifyToken,
    controller.allSentences
  );
  app.get(
    "/api/sentence/available/:fromLanguage/:toLanguage",
    [authJwt.verifyToken, authJwt.isTranslator],
    controller.getSentenceFromLanguageToTranslate
  );
  app.get(
    "/api/sentence/:idSentence",
    authJwt.verifyToken,
    controller.getSentenceFromID
  );
};