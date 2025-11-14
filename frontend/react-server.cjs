// Code is from CS 340 Activity 2 reactServer.cjs

const express = require("express");
const path = require("path");
const app = express();
const PORT = 62582;

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(
    `Server running: http://classwork.engr.oregonstate.edu:${PORT}...`
  );
});
