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
