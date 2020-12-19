var express = require("express");
var router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("../services/auth");

const User = require("../database/models/Users");


/**
 * @swagger
 * /users/signup:
 *  post:
 *    tags:
 *    - user
 *    summary: Create user
 *    description: Create new user.
 *    operationId: signupUser
 *    requestBody:
 *      description: User object
 *      content:
 *        'application/json':
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *      required: true
 *    responses:
 *      '201':
 *        description: Returns created user object with token
 *      '400':
 *        description: Returns error message
 */
router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    res.json({
      message: "Signup successful",
      user: req.user,
    });
  }
);


/**
 * @swagger
 * /users/login:
 *  post:
 *    tags:
 *    - user
 *    summary: User LogIn
 *    description: User LogIn
 *    operationId: loginUser
 *    requestBody:
 *      description: LogIn Credentials
 *      content:
 *        'application/json':
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *      required: true
 *    responses:
 *      '200':
 *        description: Returns user's token
 *      '400':
 *        description: Returns error message
 */
router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An error occurred.");

        return next(error);
      }

      req.login(user, { session: true }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, process.env.AUTH_SECRET_KEY);
        
        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;
