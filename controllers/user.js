const { PrismaClient } = require("@prisma/client");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const validate = require("../middlewares/validator");
const prisma = new PrismaClient();

async function getUsers(req, res) {
  try {
    const users = await prisma.user.findMany();
    await prisma.$disconnect();
    return res.json(users);
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
}

async function getUser(req, res) {
  try {
    const id = +req.params.id;
    const user = await prisma.user.findUnique({ where: { id } });
    await prisma.$disconnect();
    return res.json(user);
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
}

const createUser = [
  validate.signUpForm,
  async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      console.log("=== createUser in Controller ===");
      console.log(result.array());
      return res.status(400).json({ errors: result.array() });
    }
    const { firstName, lastName, username, email, password, admin, adminCode } =
      req.body;
    let status = "STAFF";
    if (admin) {
      if (adminCode === process.env.ADMIN_CODE) {
        status = "ADMIN";
      } else {
        return next(new Error("Incorrect admin code provided"));
      }
    }
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) return next(err);
      try {
        const user = await prisma.user.create({
          data: {
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword,
            status,
          },
        });
        await prisma.$disconnect();
        return res.json({ id: user.id, username });
      } catch (e) {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
      }
    });
  },
];

const updateUser = [
  validate.updateUserForm,
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      console.log("=== updateUser in Controller ===");
      console.log(result.array());
      return res.status(400).json({ errors: result.array() });
    }
    try {
      const id = +req.params.id;
      const { firstName, lastName, username, email, admin, adminCode } =
        req.body;
      let status = "STAFF";
      if (admin) {
        if (adminCode === process.env.ADMIN_CODE) {
          status = "ADMIN";
        } else {
          return next(new Error("Incorrect admin code provided"));
        }
      }
      const user = await prisma.user.update({
        where: { id },
        data: { firstName, lastName, username, email, status },
      });
      await prisma.$disconnect();
      return res.json(user);
    } catch (e) {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    }
  },
];

async function deleteUser(req, res) {
  try {
    const id = +req.params.id;
    const user = await prisma.user.delete({ where: { id } });
    await prisma.$disconnect();
    return res.json(user);
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
