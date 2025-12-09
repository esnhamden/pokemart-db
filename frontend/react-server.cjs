/*
Alexander Birrell and Eason Hamden
12/8/2025

Citations:
- Copied from CS340 Activity 2 Connect webapp to database
  URL: https://canvas.oregonstate.edu/courses/2017561/assignments/10111722?module_item_id=25645065
*/

const express = require("express");
const path = require("path");

const app = express();
const port = 62813;
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
