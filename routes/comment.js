const { Router } = require("express");
const controller = require("../controllers/comment");
const middleware = require("../middlewares/authentication");

const router = Router({ mergeParams: true });

router.get("/", controller.getComments);
router.post("/", middleware.authenticateUser, controller.createComment);
router.put(
  "/:commentId",
  middleware.authenticateUser,
  controller.updateComment
);
router.delete(
  "/:commentId",
  middleware.authenticateUser,
  controller.deleteComment
);

module.exports = router;
