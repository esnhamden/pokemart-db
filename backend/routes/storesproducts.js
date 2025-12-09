/*
Alexander Birrell and Eason Hamden
12/8/2025

Citations:
- Based on React/NodeJS code from CS340 Exploration Implementing CUD operations in your app
  URL: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-implementing-cud-operations-in-your-app?

- Referenced the tutorial Build a REST API with Node JS and Express | CRUD API Tutorial 
  URL: https://www.youtube.com/watch?v=l8WPWK9mS5M
*/

const express = require("express");
const router = express.Router();
const db = require("../db-connector");

// Get all stores products
router.get("/", async (req, res) => {
  try {
    const [result] = await db.query(`SELECT * FROM v_stores_products;`);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error: Cannot get store product data.");
  }
});

// Create store product
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const query = `CALL sp_create_store_product(?, ?, ?);`;
    const [[[result]]] = await db.query(query, [
      data.store_id,
      data.product_id,
      data.quantity,
    ]);
    res
      .status(201)
      .send(
        `Success: Store product with ID ${result.store_product_id} created!`
      );
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error: Cannot create store product.`);
  }
});

// Update store product information
router.put("/", async (req, res) => {
  try {
    const data = req.body;
    let query = `CALL sp_update_store_product(?, ?, ?, ?);`;
    await db.query(query, [
      data.store_product_id,
      data.store_id,
      data.product_id,
      data.quantity,
    ]);
    query = `SELECT * FROM v_store_products WHERE store_product_id = ?;`;
    const [[result]] = await db.query(query, [data.store_product_id]);
    res
      .status(204)
      .send(
        `Success: Store product with ID ${result.store_product_id} updated.`
      );
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error: Cannot update store product.`);
  }
});

// Delete store product
router.delete("/", async (req, res) => {
  try {
    const query = `CALL sp_delete_store_product(?);`;
    await db.query(query, [req.body.store_product_id]);
    res
      .status(204)
      .send(
        `Success: Store product with ID ${req.body.store_product_id} deleted.`
      );
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error: Cannot delete store product.`);
  }
});

module.exports = router;
