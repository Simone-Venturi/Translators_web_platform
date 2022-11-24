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
  /**
   * @openapi
   * '/api/sentence/all':
   *  get:
   *    security:
   *      - ApiKeyAuth: []
   *    tags:
   *      - All Sentences
   *    summary: Retrieve all sentences
   *    responses:
   *        200:
   *          description: Success
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                properties:
   *                  idsentence: 
   *                    type: integer
   *                  sentence: 
   *                    type: string
   *                  languageId: 
   *                    type: integer
   *                example:
   *                  - idsentence: 1
   *                    sentence: 你好
   *                    languageId: 541
   *                  - idsentence: 2
   *                    sentence: Hello.
   *                    languageId: 130
   *                  - idsentence: 3
   *                    sentence: Olà.
   *                    languageId: 385
   *                  - idsentence: 4
   *                    sentence: Hola.
   *                    languageId: 133
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
   */
  app.get(
    "/api/sentence/all",
    authJwt.verifyToken,
    controller.allSentences
  );
  /**
   * @openapi
   * '/api/sentence/available/{fromLanguage}/{toLanguage}':
   *  get:
   *    security:
   *      - ApiKeyAuth: []
   *    tags:
   *      - All Sentences
   *    summary: Retrieve all sentences available to be translated from a language to another one
   *    parameters:
   *      - in: path
   *        name: fromLanguage
   *        required: true
   *        schema:
   *          type: integer
   *          minimum: 1
   *        description: The Language ID of the sentence
   *      - in: path
   *        name: toLanguage
   *        required: true
   *        schema:
   *          type: integer
   *          minimum: 1
   *        description: The Language ID of the translation
   *    responses:
   *        200:
   *          description: Success
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                properties:
   *                  idsentence: 
   *                    type: integer
   *                  sentence: 
   *                    type: string
   *                  languageId: 
   *                    type: integer
   *                example:
   *                  - idsentence: 2
   *                    sentence: Hello.
   *                    languageId: 130
   *                  - idsentence: 7
   *                    sentence: I do not understand.
   *                    languageId: 130
   *                  - idsentence: 9
   *                    sentence: I am pleased to meet you.
   *                    languageId: 130
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
   */
  app.get(
    "/api/sentence/available/:fromLanguage/:toLanguage",
    [authJwt.verifyToken, authJwt.isTranslator],
    controller.getSentenceFromLanguageToTranslate
  );
  /**
   * @openapi
   * '/api/sentence/{idSentence}':
   *  get:
   *    security:
   *      - ApiKeyAuth: []
   *    tags:
   *      - Get Sentence
   *    summary: Get a sentence by ID
   *    parameters:
   *      - in: path
   *        name: idSentence
   *        required: true
   *        schema:
   *          type: integer
   *          minimum: 1
   *        description: The Sentence ID
   *    responses:
   *        200:
   *          description: Success
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  idsentence: 
   *                    type: integer
   *                  sentence: 
   *                    type: string
   *                  languageId: 
   *                    type: integer
   *                example:
   *                  idsentence: 2
   *                  sentence: Hello.
   *                  languageId: 130
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
   */
  app.get(
    "/api/sentence/:idSentence",
    authJwt.verifyToken,
    controller.getSentenceFromID
  );
};