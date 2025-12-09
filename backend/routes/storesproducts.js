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

// Update sale product information
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
