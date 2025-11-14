const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const db = require("./db-connector");

const app = express();
dotenv.config();

const selectAllQuery = "SELECT * FROM ??";

app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json());

app.get("/customers", async (req, res) => {
  try {
    const [rows] = await db.query(selectAllQuery, ["Customers"]);
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
  }
});

app.get("/products", async (req, res) => {
  try {
    const [rows] = await db.query(selectAllQuery, ["Products"]);
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
  }
});

app.get("/stores", async (req, res) => {
  try {
    const [rows] = await db.query(selectAllQuery, ["Stores"]);
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
  }
});

app.get("/discountcodes", async (req, res) => {
  try {
    const [rows] = await db.query(selectAllQuery, ["DiscountCodes"]);
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
  }
});

app.get("/sales", async (req, res) => {
  try {
    const [rows] = await db.query(selectAllQuery, ["Sales"]);
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
  }
});

app.get("/salesproducts", async (req, res) => {
  try {
    const [rows] = await db.query(selectAllQuery, ["SalesProducts"]);
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
  }
});

app.get("/storesproducts", async (req, res) => {
  try {
    const [rows] = await db.query(selectAllQuery, ["StoresProducts"]);
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.BACKEND_PORT, () => {
  console.log("Listening on port " + process.env.PORT);
});
