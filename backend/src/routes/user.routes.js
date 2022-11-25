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
  /**
   * @openapi
   * '/api/profile/all':
   *  get:
   *    security:
   *      - ApiKeyAuth: []
   *    tags:
   *      - All User statistics
   *    summary: Retrieve user metrics of platform use
   *    responses:
   *        200:
   *          description: Success
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  translations: 
   *                    type: integer
   *                  alignments: 
   *                    type: integer
   *                  reviews: 
   *                    type: integer
   *                  mean_review_all_translations: 
   *                    type: number
   *                    format: double
   *                  mean_review_translations_not_from_alignment: 
   *                    type: number
   *                    format: double
   *                  mean_review_translations_from_alignment: 
   *                    type: number
   *                    format: double
   *                  weighted_average_review_all_translations: 
   *                    type: number
   *                    format: double
   *                  weighted_average_review_translations_not_from_alignment: 
   *                    type: number
   *                    format: double
   *                  weighted_average_review_translations_from_alignment: 
   *                    type: number
   *                    format: double
   *                example:
   *                  translations: 3
   *                  alignments: 1
   *                  reviews: 5
   *                  mean_review_all_translations: 5
   *                  mean_review_translations_not_from_alignment: 5
   *                  mean_review_translations_from_alignment: 5
   *                  weighted_average_review_all_translations: 5
   *                  weighted_average_review_translations_not_from_alignment: 5
   *                  weighted_average_review_translations_from_alignment: 5
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
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  error: 
   *                    type: string
   *                example: 
   *                  error: error during reading translations
   */
  app.get(
    "/api/profile/all",
    [authJwt.verifyToken],
    controller.statistics
  );
  /**
   * @openapi
   * '/api/profile/chart':
   *  get:
   *    security:
   *      - ApiKeyAuth: []
   *    tags:
   *      - All User statistics
   *    summary: Retrieve user chart information of the last 30 days
   *    responses:
   *        200:
   *          description: Success
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  translations: 
   *                    type: array
   *                    items:
   *                      type: object
   *                      properties:
   *                        count:
   *                          type: integer
   *                        createdAtWeek:
   *                          type: string
   *                          format: date-time
   *                  reviews: 
   *                    type: array
   *                    items:
   *                      type: object
   *                      properties:
   *                        count:
   *                          type: integer
   *                        createdAtWeek:
   *                          type: string
   *                          format: date-time
   *                example:
   *                  translations:
   *                    - count: 10
   *                      createdAtWeek: 2022-10-24T00:00:00.000Z
   *                    - count: 19
   *                      createdAtWeek: 2022-10-31T00:00:00.000Z
   *                    - count: 74
   *                      createdAtWeek: 2022-11-7T00:00:00.000Z
   *                    - count: 54
   *                      createdAtWeek: 2022-11-14T00:00:00.000Z
   *                    - count: 5
   *                      createdAtWeek: 2022-11-21T00:00:00.000Z
   *                  reviews:
   *                    - count: 106
   *                      createdAtWeek: 2022-10-24T00:00:00.000Z
   *                    - count: 129
   *                      createdAtWeek: 2022-10-31T00:00:00.000Z
   *                    - count: 70
   *                      createdAtWeek: 2022-11-7T00:00:00.000Z
   *                    - count: 154
   *                      createdAtWeek: 2022-11-14T00:00:00.000Z
   *                    - count: 35
   *                      createdAtWeek: 2022-11-21T00:00:00.000Z
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
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  error: 
   *                    type: string
   *                example: 
   *                  error: error during reading translations
   */
  app.get(
    "/api/profile/chart",
    [authJwt.verifyToken],
    controller.chart
  );
};