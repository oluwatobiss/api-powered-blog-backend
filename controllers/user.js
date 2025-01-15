const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
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

async function createUser(req, res) {
  const { firstName, lastName, username, email, password } = req.body;
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
}

async function updateUser(req, res) {
  try {
    const id = +req.params.id;
    const { firstName, lastName, username, email } = req.body;
    const user = await prisma.user.update({
      where: { id },
      data: { firstName, lastName, username, email },
    });
    await prisma.$disconnect();
    return res.json(user);
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
}

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
