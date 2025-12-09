const express = require("express");
const router = express.Router();
const db = require("../db-connector");

// Get all products
router.get("/", async (req, res) => {
  try {
    const [result] = await db.query(`SELECT * FROM v_products;`);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error: Cannot get product data.");
  }
});

// Create product
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const query = `CALL sp_create_product(?, ?);`;
    const [[[result]]] = await db.query(query, [data.name, data.price]);
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
    let query = `CALL sp_update_product(?, ?, ?);`;
    await db.query(query, [data.product_id, data.name, data.price]);
    query = `SELECT * FROM v_products WHERE product_id = ?;`;
    const [[result]] = await db.query(query, [data.product_id]);
    res
      .status(204)
      .send(`Success: Product with ID ${result.product_id} updated.`);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error: Cannot update product.`);
  }
});

// Delete product
router.delete("/", async (req, res) => {
  try {
    const query = `CALL sp_delete_product(?);`;
    await db.query(query, [req.body.product_id]);
    res
      .status(204)
      .send(`Success: Product with ID ${req.body.product_id} deleted.`);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error: Cannot delete product.`);
  }
});

module.exports = router;
