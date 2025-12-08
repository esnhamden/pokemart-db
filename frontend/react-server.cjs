const express = require("express");
const path = require("path");

const app = express();
const port = import.meta.env.VITE_FRONTEND_PORT || 3000;
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
