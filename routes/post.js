const { Router } = require("express");
const controller = require("../controllers/post");
const middleware = require("../middlewares/authentication");

const router = Router();

router.get("/", controller.getPosts);
router.get("/:id", controller.getPost);
router.post("/", middleware.authenticateUser, controller.createPost);
router.put("/:id", controller.updatePost);
router.delete("/:id", controller.deletePost);

module.exports = router;
