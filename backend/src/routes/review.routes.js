const { authJwt } = require("../middleware");
const controller = require("../controllers/review.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  /**
   * @openapi
   * '/api/review/create':
   *  post:
   *    security:
   *      - ApiKeyAuth: []
   *    tags:
   *      - Review a translation
   *    summary: Translation review
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            properties:
   *              idTranslation:
   *                type: integer
   *              rateReview:
   *                type: integer
   *            required:
   *              - idTranslation
   *              - rateReview
   *            example:
   *              idTranslation: 1
   *              rateReview: 5
   *    responses:
   *        200:
   *          description: Success
   *        403:
   *          description: Unauthorized
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message: 
   *                    type: string
   *                example:
   *                  message: Unauthorized!
   *        500:
   *          description: Internal Server Error
   */
  app.post(
    "/api/review/create",
    [authJwt.verifyToken, authJwt.isTranslator],
    controller.createReview
  );  
};