require("dotenv").config();
const express = require("express");

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => res.send("Helloo!!!"));

app.listen(port, () =>
  console.log(`Server listening for requests at port: ${port}!`)
);
