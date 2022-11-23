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
  /**
   * @openapi
   * '/api/alignment/all':
   *  get:
   *    security:
   *      - ApiKeyAuth: []
   *    tags:
   *      - All Alignments
   *    summary: Retrieve all parallel text that could be aligned
   *    responses:
   *        200:
   *          description: Success
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                properties:
   *                  id: 
   *                    type: number
   *                  originalText: 
   *                    type: string
   *                  translatedText: 
   *                    type: string
   *                  originalLanguage: 
   *                    type: integer
   *                  translatedLanguage: 
   *                    type: integer
   *                example:
   *                  - id: 1
   *                    originalText: Pilar and Javier have been engaged for three years. They live in different cities but luckily Barcelona and Tarragona are not very far apart.
   *                    translatedText: Pilar y Javier están comprometidos desde hace tres años. Viven en ciudades distintas, pero afortunadamente Barcelona y Tarragona no están muy lejos.
   *                    originalLanguage: 130
   *                    translatedLanguage: 133
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
   *                  error: error during reading parallel texts
   */
  app.get(
    "/api/alignment/all",
    [authJwt.verifyToken],
    controller.allAlignments
  );
  /**
   * @openapi
   * '/api/alignment/available':
   *  get:
   *    security:
   *      - ApiKeyAuth: []
   *    tags:
   *      - All Alignments
   *    summary: Retrieve all parallel text that could be aligned by the user
   *    responses:
   *        200:
   *          description: Success
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                properties:
   *                  id: 
   *                    type: number
   *                  originalText: 
   *                    type: string
   *                  translatedText: 
   *                    type: string
   *                  originalLanguage: 
   *                    type: integer
   *                  translatedLanguage: 
   *                    type: integer
   *                example:
   *                  - id: 1
   *                    originalText: Well, it ain't no use to sit and wonder why, babe even you don't know by nowand it ain't no use to sit and wonder why, babe it'll never do somehow.
   *                    translatedText: Non serve a niente stare seduta e chiederti perché,se non lo sai ancora, non serve a niente stare seduta e chiedenti perché, bambina non servirà a niente lo stesso.
   *                    originalLanguage: 130
   *                    translatedLanguage: 215
   *                  - id: 2
   *                    originalText: They're selling postcards of the hanging, they're painting the passports brown, the beauty parlor is filled with sailors. The circus is in town. Here comes the blind commissioner, they've got him in a trance, one hand is tied to the tight-rope walker the other is in his pants. And the riot squad they're restless, they need somewhere to go as Lady and I look out tonight from Desolation Row.
   *                    translatedText: Vendono cartoline dell'impiccagione, tingono i passaporti di marrone, il salone di bellezza è pieno di marinai, il circo è in città. Ecco che arriva il commissario cieco, l'hanno fatto cadere in trance, ha una mano legata al funambolo ubriaco, l'altra la tiene nei pantaloni. Le forze dell'ordine sono irrequiete, hanno bisogno di un posto dove andare mentre la mia donna e io ci teniamo alla larga dal vicolo della desolazione.
   *                    originalLanguage: 130
   *                    translatedLanguage: 215
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
   *                  error: error during reading parallel texts
   */
  app.get(
    "/api/alignment/available",
    authJwt.verifyToken,
    controller.allAlignmentsAvailable
  );
  /**
   * @openapi
   * '/api/alignment/{parallelText}':
   *  get:
   *    security:
   *      - ApiKeyAuth: []
   *    tags:
   *      - Get Parallel Text
   *    summary: Get a parallel text by ID
   *    parameters:
   *      - in: path
   *        name: parallelText
   *        required: true
   *        schema:
   *          type: integer
   *          minimum: 1
   *        description: The Parallel Text ID
   *    responses:
   *        200:
   *          description: Success
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  id: 
   *                    type: number
   *                  originalText: 
   *                    type: string
   *                  translatedText: 
   *                    type: string
   *                  originalLanguage: 
   *                    type: integer
   *                  translatedLanguage: 
   *                    type: integer
   *                  createdAt: 
   *                    type: string
   *                    format: date-time
   *                  updatedAt: 
   *                    type: string
   *                    format: date-time
   *                example:
   *                  id: 2
   *                  originalText: They're selling postcards of the hanging, they're painting the passports brown, the beauty parlor is filled with sailors. The circus is in town. Here comes the blind commissioner, they've got him in a trance, one hand is tied to the tight-rope walker the other is in his pants. And the riot squad they're restless, they need somewhere to go as Lady and I look out tonight from Desolation Row.
   *                  translatedText: Vendono cartoline dell'impiccagione, tingono i passaporti di marrone, il salone di bellezza è pieno di marinai, il circo è in città. Ecco che arriva il commissario cieco, l'hanno fatto cadere in trance, ha una mano legata al funambolo ubriaco, l'altra la tiene nei pantaloni. Le forze dell'ordine sono irrequiete, hanno bisogno di un posto dove andare mentre la mia donna e io ci teniamo alla larga dal vicolo della desolazione.
   *                  originalLanguage: 130
   *                  translatedLanguage: 215
   *                  createdAt: 2022-11-21T13:06:22.178Z
   *                  updatedAt: 2022-11-21T13:06:22.178Z
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
   *                  error: error during reading parallel texts
   */
  app.get(
    "/api/alignment/:parallelText",
    authJwt.verifyToken,
    controller.getParallelTextFromID
  );
  /**
   * @openapi
   * '/api/alignment/create':
   *  post:
   *    security:
   *      - ApiKeyAuth: []
   *    tags:
   *      - Align a Parallel Text
   *    summary: Align a Parallel Text
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            properties:
   *              idParallelText:
   *                type: integer
   *              translationObjectsArray:
   *                type: array
   *              sentenceArrayOriginal:
   *                type: array
   *              sentenceArrayTranslated:
   *                type: array
   *            required:
   *              - idParallelText
   *              - translationObjectsArray
   *              - sentenceArrayOriginal
   *              - sentenceArrayTranslated
   *            example:
   *              idParallelText: 18
   *              translationObjectsArray: 
   *                - original_sentence: They're selling postcards of the hanging, they're painting the passports brown, the beauty parlor is filled with sailors. 
   *                  translated_sentence: Vendono cartoline dell'impiccagione, tingono i passaporti di marrone, il salone di bellezza è pieno di marinai, il circo è in città. 
   *                - original_sentence: Here comes the blind commissioner, they've got him in a trance, one hand is tied to the tight-rope walker the other is in his pants.
   *                  translated_sentence: Ecco che arriva il commissario cieco, l'hanno fatto cadere in trance, ha una mano legata al funambolo ubriaco, l'altra la tiene nei pantaloni.
   *                - original_sentence: And the riot squad they're restless, they need somewhere to go as Lady and I look out tonight from Desolation Row.
   *                  translated_sentence:  Le forze dell'ordine sono irrequiete, hanno bisogno di un posto dove andare mentre la mia donna e io ci teniamo alla larga dal vicolo della desolazione.
   *              sentenceArrayOriginal:
   *                -  The circus is in town.
   *              sentenceArrayTranslated:
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
    "/api/alignment/create",
    authJwt.verifyToken,
    controller.createAlignment
  );
  /**
   * @openapi
   * '/api/paralleltext/create':
   *  post:
   *    security:
   *      - ApiKeyAuth: []
   *    tags:
   *      - Create a Parallelel Text
   *    summary: Create a Parallelel Text
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              originalLanguage:
   *                type: integer
   *              originalText:
   *                type: string
   *              translatedLanguage:
   *                type: integer
   *              translatedText:
   *                type: string
   *            required:
   *              - originalLanguage
   *              - originalText
   *              - translatedLanguage
   *              - translatedText
   *            example:
   *              originalLanguage: 130
   *              originalText: Dream as if you'll live forever. Live as if you'll die today.
   *              translatedLanguage: 215
   *              translatedText: Sogna come se dovessi vivere per sempre. Vivi come se dovessi morire oggi.
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
    "/api/paralleltext/create",
    authJwt.verifyToken, authJwt.isAdmin,
    controller.createParallelText
  );
};