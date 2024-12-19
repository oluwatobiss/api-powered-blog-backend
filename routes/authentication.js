const { Router } = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

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

router.post("/", async (req, res, next) => {
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
        const payload = { id: user.id, email: user.email };
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;
