const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getComments(req, res) {
  try {
    const comments = await prisma.comment.findMany();
    await prisma.$disconnect();
    return res.json(comments);
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
}

async function getComment(req, res) {
  try {
    const id = +req.params.id;
    const comment = await prisma.comment.findUnique({ where: { id } });
    await prisma.$disconnect();
    return res.json(comment);
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
}

async function createComment(req, res) {
  try {
    console.log("=== createComment ===");
    console.log(req.body);

    const { text, authorId, postId, authorUsername } = req.body;
    const response = await prisma.comment.create({
      data: { text, authorId: +authorId, postId: +postId, authorUsername },
    });
    await prisma.$disconnect();
    console.log("=== Create comment response ===");
    console.log(response);

    return res.json(response);
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
}

async function updateComment(req, res) {
  try {
    const id = +req.params.id;
    const { text } = req.body;
    const comment = await prisma.comment.update({
      where: { id },
      data: { text },
    });
    await prisma.$disconnect();
    return res.json(comment);
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
}

async function deleteComment(req, res) {
  try {
    const id = +req.params.id;
    const comment = await prisma.comment.delete({ where: { id } });
    await prisma.$disconnect();
    return res.json(comment);
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
}

module.exports = {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
};
