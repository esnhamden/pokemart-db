const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.BACKEND_PORT || 3001;
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json());

app.use("/customers", require("./routes/customers"));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
