const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");
const cors = require("cors");
const express = require("express");
const authenticationRouter = require("./routes/authentication");
const commentRouter = require("./routes/comment");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");

dotenvExpand.expand(dotenv.config());

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/posts/:postId/comments", commentRouter);
app.use("/auths", authenticationRouter);
app.use((err, req, res, next) => {
  console.error(err);
  err && res.status(400).json({ errors: [{ msg: `${err.message}`, path: "adminCode" }] });
});

app.listen(port, () =>
  console.log(`Server listening for requests at port: ${port}!`)
);
