const { Router } = require("express");
const { PrismaClient } = require("@prisma/client");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const validate = require("../middlewares/validator");

const router = Router();
const prisma = new PrismaClient();
const optionsObject = { usernameField: "email" };

passport.use(
  new LocalStrategy(optionsObject, async (email, password, done) => {
    try {
      const userData = await prisma.user.findUnique({ where: { email } });
      await prisma.$disconnect();
      if (!userData)
        return done(null, false, { message: "Incorrect username" });
      const match = await bcrypt.compare(password, userData.password);
      if (!match) return done(null, false, { message: "Incorrect password" });
      return done(null, userData);
    } catch (e) {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    }
  })
);

router.post("/", validate.loginForm, async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.log("=== router.post in routes' authentication  ===");
    console.log(result.array());
    return res.status(400).json({ errors: result.array() });
  }
  passport.authenticate("local", async (err, userData, info) => {
    try {
      console.log("=== Local Passport Authenticate ===");
      console.log(userData);

      if (err || !userData) {
        const error = new Error("Authentication error", {
          cause: info.message,
        });
        return next(error);
      }
      const user = { id: userData.id };
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const payload = {
          id: user.id,
          username: userData.username,
          status: userData.status,
        };

        console.log("=== Payload ===");
        console.log(payload);

        const token = jwt.sign(payload, process.env.JWT_SECRET);

        console.log("=== Token ===");
        console.log(token);

        return res.json({ token, payload });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;
