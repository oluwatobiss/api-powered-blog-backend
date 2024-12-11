const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");
const cors = require("cors");
const express = require("express");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const commentRouter = require("./routes/comment");

dotenvExpand.expand(dotenv.config());

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/posts/:id/comments", commentRouter);

app.listen(port, () =>
  console.log(`Server listening for requests at port: ${port}!`)
);
