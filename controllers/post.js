const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getPosts(req, res) {
  try {
    const posts = await prisma.post.findMany();
    await prisma.$disconnect();
    return res.json(posts);
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
}

async function getPost(req, res) {
  try {
    const id = +req.params.id;
    const post = await prisma.post.findUnique({ where: { id } });
    await prisma.$disconnect();
    return res.json(post);
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
}

async function createPost(req, res) {
  try {
    const { title, body } = req.body;
    const post = await prisma.post.create({
      data: { title, body },
    });
    await prisma.$disconnect();
    return res.json(post);
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
}

async function updatePost(req, res) {
  try {
    const id = +req.params.id;
    const { title, text } = req.body;
    const post = await prisma.post.update({
      where: { id },
      data: { title, text },
    });
    await prisma.$disconnect();
    return res.json(post);
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
}

async function deletePost(req, res) {
  try {
    const id = +req.params.id;
    const post = await prisma.post.delete({ where: { id } });
    await prisma.$disconnect();
    return res.json(post);
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
}

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
