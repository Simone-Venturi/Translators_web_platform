const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
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
   * '/api/auth/signup':
   *  post:
   *    tags:
   *      - Signup
   *    summary: Register a user
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              username:
   *                type: string
   *              password:
   *                type: string
   *              email:
   *                type: string
   *              roleId:
   *                type: number
   *                default: 1
   *            required:
   *              - username
   *              - email
   *              - password
   *            example:
   *              username: simone
   *              password: strongPassword
   *              email: simone@email.com
   *    responses:
   *        200:
   *          description: Success
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message: 
   *                    type: string
   *                example:
   *                  message: User was registered successfully!
   *        400:
   *          description: Conflict
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message: 
   *                    type: string
   *                example:
   *                  message: Failed! Email is already in use!
   *        500:
   *          description: Internal Server Error
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message: 
   *                    type: Error
   */
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail
    ],
    controller.signup
  );
  app.post("/api/auth/signin", controller.signin);
};