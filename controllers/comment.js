const { PrismaClient } = require("@prisma/client");
const { validationResult } = require("express-validator");
const validate = require("../middlewares/validator");
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

const createComment = [
  validate.commentForm,
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    try {
      const { body, authorId, authorUsername } = req.body;
      const postId = req.params.postId;
      const response = await prisma.comment.create({
        data: { body, authorId: +authorId, postId: +postId, authorUsername },
      });
      await prisma.$disconnect();
      return res.json(response);
    } catch (e) {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    }
  },
];

const updateComment = [
  validate.commentForm,
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    try {
      const id = +req.params.commentId;
      const { body } = req.body;
      const response = await prisma.comment.update({
        where: { id },
        data: { body },
      });
      await prisma.$disconnect();
      return res.json(response);
    } catch (e) {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    }
  },
];

async function deleteComment(req, res) {
  try {
    const id = +req.params.commentId;
    const response = await prisma.comment.delete({ where: { id } });
    await prisma.$disconnect();
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
