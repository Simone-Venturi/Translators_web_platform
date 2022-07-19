const { authJwt } = require("../middleware");
const controller = require("../controllers/alignment.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get(
    "/api/alignment/all",
    [authJwt.verifyToken],
    controller.allAlignments
  );
  app.get(
    "/api/alignment/:parallelText",
    authJwt.verifyToken,
    controller.getParallelTextFromID
  );
  app.post(
    "/api/alignment/create",
    authJwt.verifyToken,
    controller.createAlignment
  );
};