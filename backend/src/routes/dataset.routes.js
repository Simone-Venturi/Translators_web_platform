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
  /**
   * @openapi
   * '/api/dataset/all':
   *  get:
   *    security:
   *      - ApiKeyAuth: []
   *    tags:
   *      - All Datasets
   *    summary: Retrieve all datasets
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
   *                  name: 
   *                    type: string
   *                  URL: 
   *                    type: string
   *                  createdAt: 
   *                    type: string
   *                    format: date-time
   *                  updatedAt: 
   *                    type: string
   *                    format: date-time
   *                example:
   *                  - id: 1
   *                    name: ELRC_2922
   *                    URL: https://opus.nlpl.eu/ELRC_2922-v1.php
   *                    createdAt: 2022-11-21T13:06:22.084Z
   *                    updatedAt: 2022-11-21T13:06:22.084Z
   *                  - id: 2
   *                    name: TED_2020
   *                    URL: https://opus.nlpl.eu/TED2020.php
   *                    createdAt: 2022-11-21T13:06:22.084Z
   *                    updatedAt: 2022-11-21T13:06:22.084Z
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
    "/api/dataset/all",
    [authJwt.verifyToken],
    controller.allDataSets
  );
  /**
   * @openapi
   * '/api/dataset/create':
   *  post:
   *    security:
   *      - ApiKeyAuth: []
   *    tags:
   *      - Create a Dataset
   *    summary: Create a dataset
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              name:
   *                type: string
   *              url:
   *                type: string
   *            required:
   *              - name
   *              - url
   *            example:
   *              name: TED2013_v1.1
   *              url: https://opus.nlpl.eu/TED2013-v1.1.php
   *    responses:
   *        200:
   *          description: Success
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  total: 
   *                    type: integer
   *                example:
   *                  total: 12
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
    "/api/dataset/create",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.createDataSet
  );
  /**
   * @openapi
   * '/api/dataset/load':
   *  post:
   *    security:
   *      - ApiKeyAuth: []
   *    tags:
   *      - Load Dataset content
   *    summary: Load parallel text in .tmx format that belongs to a certain dataset
   *    requestBody:
   *      required: true
   *      content:
   *        multipart/form-data:
   *          schema:
   *            type: object
   *            properties:
   *              id:
   *                type: integer
   *              file:
   *                type: string
   *                format: binary
   *            required:
   *              - id
   *              - file
   *            example:
   *              id: 1
   *    responses:
   *        200:
   *          description: Success
   *        400:
   *          description: Bad content
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message: 
   *                    type: string
   *                example:
   *                  message: error during dataset parsing
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
    "/api/dataset/load",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.loadDataSet
  );
  /**
   * @openapi
   * '/api/dataset/check':
   *  post:
   *    security:
   *      - ApiKeyAuth: []
   *    tags:
   *      - Download parallel corpora
   *    summary: Check how many translations will be downloaded with the provided parameters
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              languagesTo:
   *                type: array
   *                items:
   *                  type: integer
   *              datasets:
   *                type: array
   *                items:
   *                  type: integer
   *              minReviewScore:
   *                type: integer
   *              maxReviewScore:
   *                type: integer
   *              minReview:
   *                type: integer
   *            required:
   *              - languagesTo
   *              - datasets
   *              - minReviewScore
   *              - maxReviewScore
   *              - minReview
   *            example:
   *              languagesTo:
   *                - 130 
   *                - 133
   *              datasets:
   *                - 1
   *              minReviewScore: 0
   *              maxReviewScore: 5
   *              minReview: 0
   *    responses:
   *        200:
   *          description: Success
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  total: 
   *                    type: integer
   *                example:
   *                  total: 12
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
    "/api/dataset/check",
    [authJwt.verifyToken, authJwt.isDataScientist],
    controller.checkDataSetSize
  );
  /**
   * @openapi
   * '/api/dataset/download':
   *  post:
   *    security:
   *      - ApiKeyAuth: []
   *    tags:
   *      - Download parallel corpora
   *    summary: Download translations in different languages belong to datasets specified with at least a minReview reviews with an average score value between minReviewScore and maxReviewScore.
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              languagesTo:
   *                type: array
   *                items:
   *                  type: integer
   *              datasets:
   *                type: array
   *                items:
   *                  type: integer
   *              minReviewScore:
   *                type: integer
   *              maxReviewScore:
   *                type: integer
   *              minReview:
   *                type: integer
   *            required:
   *              - languagesTo
   *              - datasets
   *              - minReviewScore
   *              - maxReviewScore
   *              - minReview
   *            example:
   *              languagesTo:
   *                - 130 
   *                - 133
   *              datasets:
   *                - 1
   *              minReviewScore: 0
   *              maxReviewScore: 5
   *              minReview: 0
   *    responses:
   *        200:
   *          description: Success
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  file: 
   *                    type: string
   *                    format: binary
   *                    description: zip file contains translations
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
    "/api/dataset/download",
    [authJwt.verifyToken, authJwt.isDataScientist],
    controller.downloadDataSet
  );
};