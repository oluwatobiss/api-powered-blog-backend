const { Router } = require("express");
const controller = require("../controllers/comment");

const router = Router();

router.get("/", controller.getComments);
router.get("/:id", controller.getComment);
router.post("/", controller.createComment);
router.put("/:id", controller.updateComment);
router.delete("/:id", controller.deleteComment);

module.exports = router;
