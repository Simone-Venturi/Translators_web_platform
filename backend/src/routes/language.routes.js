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
  /**
   * @openapi
   * '/api/language/all':
   *  get:
   *    security:
   *      - ApiKeyAuth: []
   *    tags:
   *      - All Languages
   *    summary: Retrieve all languages
   *    responses:
   *        200:
   *          description: Success
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                properties:
   *                  idlanguage: 
   *                    type: integer
   *                  title: 
   *                    type: string
   *                  abbreviation: 
   *                    type: string
   *                example:
   *                  - id: 1
   *                    title: Afar
   *                    abbreviation: AA
   *                  - id: 2
   *                    title: Abkhaz
   *                    abbreviation: AB
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
   */
  app.get(
    "/api/language/all",
    authJwt.verifyToken,
    controller.allLanguages
  );
  /**
   * @openapi
   * '/api/language/known':
   *  get:
   *    security:
   *      - ApiKeyAuth: []
   *    tags:
   *      - All Languages
   *    summary: Retrieve all languages selected by the user
   *    responses:
   *        200:
   *          description: Success
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                properties:
   *                  idlanguage: 
   *                    type: integer
   *                  title: 
   *                    type: string
   *                  abbreviation: 
   *                    type: string
   *                example:
   *                  - id: 130
   *                    title: English
   *                    abbreviation: EN
   *                  - id: 133
   *                    title: Spanish
   *                    abbreviation: ES
   *                  - id: 215
   *                    title: Italian
   *                    abbreviation: IT
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
   */
  app.get(
    "/api/language/known",
    authJwt.verifyToken,
    controller.allLanguagesKnownByUser
  );
  /**
   * @openapi
   * '/api/language/known':
   *  post:
   *    security:
   *      - ApiKeyAuth: []
   *    tags:
   *      - Set languages known by the user
   *    summary: Set languages known by the user
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            properties:
   *              idsLanguages:
   *                type: array
   *            required:
   *              - idsLanguages
   *            example:
   *              idsLanguages: 18
   *                - 130 
   *                - 133 
   *                - 215
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
    "/api/language/known",
    authJwt.verifyToken,
    controller.updateLanguagesKnownByUser
  );
};