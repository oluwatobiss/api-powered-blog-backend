const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");
const cors = require("cors");
const express = require("express");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const commentRouter = require("./routes/comment");
const authenticationRouter = require("./routes/authentication");

dotenvExpand.expand(dotenv.config());

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);
app.use("/auths", authenticationRouter);

app.listen(port, () =>
  console.log(`Server listening for requests at port: ${port}!`)
);
