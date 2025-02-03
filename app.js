require("dotenv").config();
const cors = require("cors");
const express = require("express");
const authenticationRouter = require("./routes/authentication");
const commentRouter = require("./routes/comment");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/posts/:postId/comments", commentRouter);
app.use("/auths", authenticationRouter);
app.use((err, req, res, next) => {
  console.error(err);
  err &&
    res
      .status(400)
      .json({ errors: [{ msg: `${err.message}`, path: "adminCode" }] });
});

app.get("/", (req, res) =>
  res.send(`
    <div style="text-align:center;padding:30px 10vw;">
      <h1>Welcome to the Fans-n-Company Rest API server!</h1>
      <p>Fans-n-Company brings fans in sync with an organization's internal activities by allowing fans to read a company's published articles and internal communication between staff members.</p>
      <h2>Fans-n-Company Showcase</h2>
      <p>These are some of the sites currently using the Fans-n-Company API:</p>
      <ul style="list-style:none;padding:0;">
        <li style="margin-bottom:10px;"><a href=${process.env.FANSEND_URI}>FansInSync</a></li>
        <li style="margin-bottom:10px;"><a href=${process.env.STAFFEND_URI}>StaffBlog</a></li>
      </ul>
    </div>
  `)
);

app.listen(port, () =>
  console.log(`Server listening for requests at port: ${port}!`)
);
