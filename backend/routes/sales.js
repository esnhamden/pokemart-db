const express = require("express");
const router = express.Router();
const db = require("../db-connector");

// Get all sales
router.get("/", async (req, res) => {
  try {
    const [result] = await db.query(`SELECT * FROM v_sales;`);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error: Cannot get sales data.");
  }
});

// Create sale
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const query = `CALL sp_create_sale(?, ?, ?, ?, ?, ?);`;
    const [[[result]]] = await db.query(query, [
      data.store_id,
      data.customer_id,
      data.discount_code_id,
      data.sale_date,
      data.payment_method,
      data.total_amount_paid,
    ]);
    res.status(201).send(`Success: Sale with ID ${result.sale_id} created!`);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error: Cannot create sale.`);
  }
});

// Update sale information
router.put("/", async (req, res) => {
  try {
    const data = req.body;
    let query = `CALL sp_update_sale(?, ?, ?, ?, ?, ?);`;
    await db.query(query, [
      data.sale_id,
      data.store_id,
      data.customer_id,
      data.discount_code_id,
      data.sale_date,
      data.payment_method,
      data.total_amount_paid,
    ]);
    query = `SELECT * FROM v_sales WHERE sale_id = ?;`;
    const [[result]] = await db.query(query, [data.discount_code_id]);
    res.status(204).send(`Success: Sale with ID ${result.sale_id} updated.`);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error: Cannot update sale.`);
  }
});

// Delete sale
router.delete("/", async (req, res) => {
  try {
    const query = `CALL sp_delete_sale(?);`;
    await db.query(query, [req.body.sale_id]);
    res.status(204).send(`Success: Sale with ID ${req.body.sale_id} deleted.`);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error: Cannot delete sale.`);
  }
});

module.exports = router;
