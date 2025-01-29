const { Router } = require("express");
const controller = require("../controllers/user");
const middleware = require("../middlewares/authentication");

const router = Router();

router.get("/", middleware.authenticateUser, controller.getUsers);
router.get("/:id", middleware.authenticateUser, controller.getUser);
router.post("/", middleware.authenticateUser, controller.createUser);
router.put("/:id", middleware.authenticateUser, controller.updateUser);
router.delete("/:id", middleware.authenticateUser, controller.deleteUser);

module.exports = router;
