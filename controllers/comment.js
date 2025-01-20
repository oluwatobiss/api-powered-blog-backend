const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getComments(req, res) {
  const postId = +req.params.postId;
  try {
    const comments = await prisma.comment.findMany({ where: { postId } });
    await prisma.$disconnect();
    return res.json(comments);
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
}

async function createComment(req, res) {
  try {
    console.log("=== createComment req.body ===");
    console.log(req.body);

    console.log("=== createComment req.params ===");
    console.log(req.params);

    const { body, authorId, authorUsername } = req.body;
    const postId = req.params.postId;
    const response = await prisma.comment.create({
      data: { body, authorId: +authorId, postId: +postId, authorUsername },
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
    console.log("=== Update Comment req.params ===");
    console.log(req.params);

    const id = +req.params.commentId;
    const { body } = req.body;
    const response = await prisma.comment.update({
      where: { id },
      data: { body },
    });
    await prisma.$disconnect();

    console.log("=== Update comment response ===");
    console.log(response);

    return res.json(response);
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
}

async function deleteComment(req, res) {
  try {
    console.log("=== Delete Comment req.params ===");
    console.log(req.params);

    const id = +req.params.commentId;
    const response = await prisma.comment.delete({ where: { id } });
    await prisma.$disconnect();

    console.log("=== Delete comment response ===");
    console.log(response);

    return res.json(response);
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
}

module.exports = {
  getComments,
  createComment,
  updateComment,
  deleteComment,
};
