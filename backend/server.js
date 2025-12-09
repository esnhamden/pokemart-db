const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db-connector");

const app = express();
const port = process.env.BACKEND_PORT || 3001;
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json());

app.post("/reset", async (req, res) => {
  await db.query("CALL sp_reset_db();");
  res.status(200).send({ message: "Success: Database reset!" });
});

app.use("/customers", require("./routes/customers"));
app.use("/discountcodes", require("./routes/discountcodes"));
app.use("/products", require("./routes/products"));
app.use("/sales", require("./routes/sales"));
app.use("/stores", require("./routes/stores"));
app.use("/salesproducts", require("./routes/salesproducts"));
app.use("/storesproducts", require("./routes/storesproducts"));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
