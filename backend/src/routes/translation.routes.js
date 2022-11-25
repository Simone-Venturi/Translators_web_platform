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
  /**
   * @openapi
   * '/api/translation/all':
   *  get:
   *    security:
   *      - ApiKeyAuth: []
   *    tags:
   *      - All Translations
   *    summary: Retrieve all translations
   *    responses:
   *        200:
   *          description: Success
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                properties:
   *                  id: 
   *                    type: integer
   *                  average_score: 
   *                    type: number
   *                  n_scores: 
   *                    type: integer
   *                  OriginalSentence:
   *                    type: object
   *                    idsentence: 
   *                      type: integer
   *                    sentence: 
   *                      type: string
   *                    languageId: 
   *                      type: integer
   *                    createdAt: 
   *                      type: string
   *                      format: date-time
   *                    updatedAt: 
   *                      type: string
   *                      format: date-time
   *                  TranslatedSentence:
   *                    type: object
   *                    idsentence: 
   *                      type: integer
   *                    sentence: 
   *                      type: string
   *                    languageId: 
   *                      type: integer
   *                    createdAt: 
   *                      type: string
   *                      format: date-time
   *                    updatedAt: 
   *                      type: string
   *                      format: date-time
   *                example:
   *                  - id: 1
   *                    average_score: 0
   *                    n_scores: 0
   *                    OriginalSentence:
   *                      idsentence: 2
   *                      sentence: Hello.
   *                      languageId: 130
   *                      createdAt: 2022-11-21T13:06:22.084Z
   *                      updatedAt: 2022-11-21T13:06:22.084Z
   *                    TranslatedSentence:
   *                      idsentence: 1
   *                      sentence: 你好
   *                      languageId: 541
   *                      createdAt: 2022-11-21T13:06:22.080Z
   *                      updatedAt: 2022-11-21T13:06:22.080Z
   *                  - id: 2
   *                    average_score: 0
   *                    n_scores: 0
   *                    OriginalSentence:
   *                      idsentence: 2
   *                      sentence: Hello.
   *                      languageId: 130
   *                      createdAt: 2022-11-21T13:06:22.084Z
   *                      updatedAt: 2022-11-21T13:06:22.084Z
   *                    TranslatedSentence:
   *                      idsentence: 3
   *                      sentence: Olá.
   *                      languageId: 385
   *                      createdAt: 2022-11-21T13:06:22.088Z
   *                      updatedAt: 2022-11-21T13:06:22.088Z
   *                  - id: 3
   *                    average_score: 0
   *                    n_scores: 0
   *                    OriginalSentence:
   *                      idsentence: 2
   *                      sentence: Hello.
   *                      languageId: 130
   *                      createdAt: 2022-11-21T13:06:22.084Z
   *                      updatedAt: 2022-11-21T13:06:22.084Z
   *                    TranslatedSentence:
   *                      idsentence: 4
   *                      sentence: Holà.
   *                      languageId: 133
   *                      createdAt: 2022-11-21T13:06:22.091Z
   *                      updatedAt: 2022-11-21T13:06:22.091Z
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
    "/api/translation/all",
    [authJwt.verifyToken],
    controller.allTranslations
  );
  /**
   * @openapi
   * '/api/translation/create':
   *  post:
   *    security:
   *      - ApiKeyAuth: []
   *    tags:
   *      - Translate a sentence
   *    summary: Sentence translation
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            properties:
   *              idSentence:
   *                type: integer
   *              translationText:
   *                type: string
   *              idLanguage:
   *                type: integer
   *            required:
   *              - idSentence
   *              - translationText
   *              - idLanguage
   *            example:
   *              idSentence: 2
   *              translationText: Ciao
   *              idLanguage: 215
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
    "/api/translation/create",
    [authJwt.verifyToken, authJwt.isTranslator],
    controller.createTranslation
  );
  /**
   * @openapi
   * '/api/translation/allNotReviewed/{fromLanguage}/{toLanguage}':
   *  get:
   *    security:
   *      - ApiKeyAuth: []
   *    tags:
   *      - All Translations
   *    summary: Retrieve all translations not reviewed from a language to another one
   *    parameters:
   *      - in: path
   *        name: fromLanguage
   *        required: true
   *        schema:
   *          type: integer
   *          minimum: 1
   *        description: The Language ID of the original sentence
   *      - in: path
   *        name: toLanguage
   *        required: true
   *        schema:
   *          type: integer
   *          minimum: 1
   *        description: The Language ID of the translated sentence
   *    responses:
   *        200:
   *          description: Success
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                properties:
   *                  id: 
   *                    type: integer
   *                  average_score: 
   *                    type: number
   *                  n_scores: 
   *                    type: integer
   *                  OriginalSentence:
   *                    type: object
   *                    idsentence: 
   *                      type: integer
   *                    sentence: 
   *                      type: string
   *                    languageId: 
   *                      type: integer
   *                    createdAt: 
   *                      type: string
   *                      format: date-time
   *                    updatedAt: 
   *                      type: string
   *                      format: date-time
   *                  TranslatedSentence:
   *                    type: object
   *                    idsentence: 
   *                      type: integer
   *                    sentence: 
   *                      type: string
   *                    languageId: 
   *                      type: integer
   *                    createdAt: 
   *                      type: string
   *                      format: date-time
   *                    updatedAt: 
   *                      type: string
   *                      format: date-time
   *                example:
   *                  - id: 3
   *                    average_score: 0
   *                    n_scores: 0
   *                    OriginalSentence:
   *                      idsentence: 2
   *                      sentence: Hello.
   *                      languageId: 130
   *                      createdAt: 2022-11-21T13:06:22.084Z
   *                      updatedAt: 2022-11-21T13:06:22.084Z
   *                    TranslatedSentence:
   *                      idsentence: 4
   *                      sentence: Holà.
   *                      languageId: 133
   *                      createdAt: 2022-11-21T13:06:22.091Z
   *                      updatedAt: 2022-11-21T13:06:22.091Z
   *                  - id: 5
   *                    average_score: 0
   *                    n_scores: 0
   *                    OriginalSentence:
   *                      idsentence: 5
   *                      sentence: Happy birthday!
   *                      languageId: 130
   *                      createdAt: 2022-11-21T13:06:22.084Z
   *                      updatedAt: 2022-11-21T13:06:22.084Z
   *                    TranslatedSentence:
   *                      idsentence: 6
   *                      sentence: ¡Feliz cumpleaños!
   *                      languageId: 133
   *                      createdAt: 2022-11-21T13:06:22.096Z
   *                      updatedAt: 2022-11-21T13:06:22.096Z
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
    "/api/translation/allNotReviewed/:fromLanguage/:toLanguage",
    [authJwt.verifyToken, authJwt.isTranslator],
    controller.allTranslationsNotReviewdByUser
  );
};