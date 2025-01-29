const { Router } = require("express");
const controller = require("../controllers/post");
const middleware = require("../middlewares/authentication");

const router = Router();

router.get("/", middleware.authenticateUser, controller.getPosts);
router.get(
  "/authors/:authorId",
  middleware.authenticateUser,
  controller.getAuthorPosts
);
router.get("/:id", middleware.authenticateUser, controller.getPost);
router.post(
  "/authors/:authorId",
  middleware.authenticateUser,
  controller.createPost
);
router.put("/:id", middleware.authenticateUser, controller.updatePost);
router.delete("/:id", middleware.authenticateUser, controller.deletePost);

module.exports = router;
