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
   *              password: strongHashedPassword
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
  /**
   * @openapi
   * '/api/auth/signin':
   *  post:
   *    tags:
   *      - Signin
   *    summary: Login a user
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
   *            required:
   *              - username
   *              - password
   *            example:
   *              username: simone
   *              password: strongHashedPassword
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
   *                  username: 
   *                    type: string
   *                  email: 
   *                    type: string
   *                  roles: 
   *                    type: object
   *                    properties:
   *                      role_translator:
   *                        type: boolean
   *                      role_data_scientist:
   *                        type: boolean
   *                      role_admin:
   *                        type: boolean
   *                  accessToken:
   *                    type: string
   *                example:
   *                  id: 1
   *                  username: simone
   *                  email: simone@email.com
   *                  roles:
   *                      role_translator: true
   *                      role_data_scientist: true
   *                      role_admin: true
   *                  accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjY5MjIxODgzLCJleHAiOjE2NjkzMDgyODN9.2rh_1bFBeYraAMi5OtlU0OKswBfn2Xqj4vEAC9J7JQg
   *        401:
   *          description: Unauthorized
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message: 
   *                    type: string
   *                example:
   *                  message: Invalid Password!
   *                  accessToken: null
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
  app.post("/api/auth/signin", controller.signin);
};