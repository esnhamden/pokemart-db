/*
Alexander Birrell and Eason Hamden
12/8/2025

Citations:
- Based on React/NodeJS code from CS340 Exploration Implementing CUD operations in your app
  URL: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-implementing-cud-operations-in-your-app?

- Referenced the tutorial Build a REST API with Node JS and Express | CRUD API Tutorial 
  URL: https://www.youtube.com/watch?v=l8WPWK9mS5M

- Referenced the following 
  URL: https://www.geeksforgeeks.org/node-js/rest-api-using-the-express-to-perform-crud-create-read-update-delete/
*/

const express = require("express");
const router = express.Router();
const db = require("../db-connector");

// Get all stores
router.get("/", async (req, res) => {
  try {
    const [result] = await db.query(`SELECT * FROM v_stores;`);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error: Cannot get store data.");
  }
});

// Create store
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const query = `CALL sp_create_store(?, ?, ?, ?, ?, ?, ?);`;
    const [[[result]]] = await db.query(query, [
      data.name,
      data.street,
      data.city,
      data.state,
      data.zip_code,
      data.phone_number,
      data.employee_count,
    ]);
    res
      .status(201)
      .send(`Success: Product with ID ${result.product_id} created!`);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error: Cannot create product.`);
  }
});

// Update product information
router.put("/", async (req, res) => {
  try {
    const data = req.body;
    let query = `CALL sp_update_store(?, ?, ?, ?, ?, ?, ?, ?);`;
    await db.query(query, [
      data.store_id,
      data.name,
      data.street,
      data.city,
      data.state,
      data.zip_code,
      data.phone_number,
      data.employee_count,
    ]);
    query = `SELECT * FROM v_stores WHERE store_id = ?;`;
    const [[result]] = await db.query(query, [data.store_id]);
    res.status(204).send(`Success: Store with ID ${result.store_id} updated.`);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error: Cannot update store.`);
  }
});

// Delete store
router.delete("/", async (req, res) => {
  try {
    const query = `CALL sp_delete_store(?);`;
    await db.query(query, [req.body.store_id]);
    res
      .status(204)
      .send(`Success: Store with ID ${req.body.store_id} deleted.`);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error: Cannot delete store.`);
  }
});

module.exports = router;
