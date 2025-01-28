const { body } = require("express-validator");

const alphaErr = "can contain only letters";
const emptyErr = "must not be blank";
const lengthErr = (min, max) => `must be between ${min} and ${max} characters`;

const signUpForm = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage(`First name ${emptyErr}.`)
    .escape()
    .isAlpha()
    .withMessage(`First name ${alphaErr}.`)
    .isLength({ min: 2, max: 64 })
    .withMessage(`First name ${lengthErr(2, 64)}.`),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage(`Last name ${emptyErr}.`)
    .escape()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}.`)
    .isLength({ min: 2, max: 64 })
    .withMessage(`Last name ${lengthErr(2, 64)}.`),
  body("username")
    .trim()
    .notEmpty()
    .withMessage(`Username ${emptyErr}.`)
    .escape()
    .isLength({ min: 2, max: 8 })
    .withMessage(`Username ${lengthErr(2, 8)}.`),
  body("email").trim().isEmail().withMessage("Enter a valid email."),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(`Password ${emptyErr}.`)
    .isLength({ min: 3, max: 70 })
    .withMessage(`Password ${lengthErr(3, 70)}.`)
    .escape(),
];

const loginForm = [
  body("email").trim().isEmail().withMessage("Enter a valid email."),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(`Password ${emptyErr}.`)
    .isLength({ min: 3, max: 70 })
    .withMessage(`Password ${lengthErr(3, 70)}.`)
    .escape(),
];

const commentForm = body("body")
  .trim()
  .notEmpty()
  .withMessage(`Comment ${emptyErr}.`)
  .escape();

module.exports = { signUpForm, loginForm, commentForm };
