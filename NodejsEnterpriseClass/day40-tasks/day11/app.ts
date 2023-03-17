// Day 11 - Express

// https://hackmd.io/PI_wdqoRQKe11QvCFaXq5w

import express from "express";
const app = express();

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});