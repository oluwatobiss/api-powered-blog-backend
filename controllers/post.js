const { PrismaClient } = require("@prisma/client");
const { validationResult } = require("express-validator");
const validate = require("../middlewares/validator");
const prisma = new PrismaClient();

async function getPosts(req, res) {
  console.log("=== getPosts ===");
  console.log(req.query?.status);

  try {
    const posts =
      req.query?.status === "ADMIN"
        ? await prisma.post.findMany()
        : await prisma.post.findMany({ where: { published: true } });
    await prisma.$disconnect();
    return res.json(posts);
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
}

async function getAuthorPosts(req, res) {
  try {
    const authorId = +req.params.authorId;
    const post = await prisma.post.findMany({ where: { authorId } });
    await prisma.$disconnect();
    return res.json(post);
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

const createPost = [
  validate.postForm,
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    try {
      const { title, body, published } = req.body;
      const authorId = +req.params.authorId;
      const publishedDate = published ? new Date() : null;
      const post = await prisma.post.create({
        data: { authorId, title, body, published, publishedDate },
      });
      await prisma.$disconnect();
      return res.json(post);
    } catch (e) {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    }
  },
];

const updatePost = [
  validate.postForm,
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    try {
      const { title, body, published } = req.body;
      const id = +req.params.id;
      const publishedDate = published ? new Date() : null;
      const post = await prisma.post.update({
        where: { id },
        data: { title, body, published, publishedDate },
      });
      await prisma.$disconnect();
      return res.json(post);
    } catch (e) {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    }
  },
];

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
  getAuthorPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
