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

async function createPost(req, res) {
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
}

async function updatePost(req, res) {
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
  getAuthorPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
