const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/test/all", controller.allAccess);
  app.get(
    "/api/test/translator",
    [authJwt.verifyToken, authJwt.isTranslator],
    controller.translatorBoard
  );
  app.get(
    "/api/test/datascientist",
    [authJwt.verifyToken, authJwt.isDataScientist],
    controller.datascientistBoard
  );
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
  app.get(
    "/api/profile/all",
    [authJwt.verifyToken],
    controller.statistics
  );
  app.get(
    "/api/profile/chart",
    [authJwt.verifyToken],
    controller.chart
  );
};