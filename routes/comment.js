const { Router } = require("express");
const controller = require("../controllers/comment");

const router = Router({ mergeParams: true });

router.get("/", controller.getComments);
router.post("/", controller.createComment);
router.put("/:commentId", controller.updateComment);
router.delete("/:commentId", controller.deleteComment);

module.exports = router;
