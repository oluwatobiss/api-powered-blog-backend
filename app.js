const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");
const express = require("express");
const userRouter = require("./routes/user");

dotenvExpand.expand(dotenv.config());

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

app.listen(port, () =>
  console.log(`Server listening for requests at port: ${port}!`)
);
