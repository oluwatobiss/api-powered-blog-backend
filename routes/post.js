const { Router } = require("express");
const jwt = require("jsonwebtoken");
const controller = require("../controllers/post");

const router = Router();

function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  const userToken = authHeader && authHeader.split(" ")[1];

  if (!userToken) {
    return res.status(401).json({ message: "No verification token provided" });
  }

  jwt.verify(userToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid verification token" });
    }

    console.log("=== Decoded Auth User ===");
    console.log(decoded);

    req.user = decoded;
    next();
  });
}

router.get("/", controller.getPosts);
router.get("/:id", controller.getPost);
router.post("/", authenticateUser, controller.createPost);
router.put("/:id", controller.updatePost);
router.delete("/:id", controller.deletePost);

module.exports = router;
