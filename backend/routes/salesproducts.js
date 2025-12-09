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

// Get all sales products
router.get("/", async (req, res) => {
  try {
    const [result] = await db.query(`SELECT * FROM v_sales_products;`);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error: Cannot get sale product data.");
  }
});

// Create sale product
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const query = `CALL sp_create_sale_product(?, ?, ?);`;
    const [[[result]]] = await db.query(query, [
      data.sale_id,
      data.product_id,
      data.quantity,
    ]);
    res
      .status(201)
      .send(`Success: Sale product with ID ${result.sale_product_id} created!`);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error: Cannot create sale product.`);
  }
});

// Update sale product information
router.put("/", async (req, res) => {
  try {
    const data = req.body;
    let query = `CALL sp_update_sale_product(?, ?, ?, ?);`;
    await db.query(query, [
      data.sale_product_id,
      data.sale_id,
      data.product_id,
      data.quantity,
    ]);
    query = `SELECT * FROM v_sales_products WHERE sale_product_id = ?;`;
    const [[result]] = await db.query(query, [data.sale_product_id]);
    res
      .status(204)
      .send(`Success: Sale product with ID ${result.sale_product_id} updated.`);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error: Cannot update sale product.`);
  }
});

// Delete sale product
router.delete("/", async (req, res) => {
  try {
    const query = `CALL sp_delete_sale_product(?);`;
    await db.query(query, [req.body.sale_product_id]);
    res
      .status(204)
      .send(
        `Success: Sale product with ID ${req.body.sale_product_id} deleted.`
      );
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error: Cannot delete sale product.`);
  }
});

module.exports = router;
