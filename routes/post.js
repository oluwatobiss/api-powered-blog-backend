const { Router } = require("express");
const controller = require("../controllers/post");

const router = Router();

router.get("/", controller.getPosts);
router.get("/:id", controller.getPost);
router.post("/", controller.createPost);
router.put("/:id", controller.updatePost);
router.delete("/:id", controller.deletePost);

module.exports = router;
