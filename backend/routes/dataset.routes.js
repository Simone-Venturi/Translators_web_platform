const { authJwt } = require("../middleware");
const controller = require("../controllers/dataset.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get(
    "/api/dataset/all",
    [authJwt.verifyToken],
    controller.allDataSets
  );
  app.post(
    "/api/dataset/create",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.createDataSet
  );
  app.post(
    "/api/dataset/load",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.loadDataSet
  );
};