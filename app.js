const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");
const express = require("express");

dotenvExpand.expand(dotenv.config());

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => res.send("Helloo!!!"));

app.listen(port, () =>
  console.log(`Server listening for requests at port: ${port}!`)
);
