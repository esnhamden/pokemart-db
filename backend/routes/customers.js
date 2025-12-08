const express = require("express");
const router = express.Router();
const db = require("../db-connector");

// Get all customers
router.get("/", async (req, res) => {
  try {
    const [result] = await db.query(`SELECT * FROM v_customers;`);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error: Cannot get customer data.");
  }
});

// Create customer
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const query = `CALL sp_create_customer(?, ?, ?, ?, ?);`;
    const [[[result]]] = await db.query(query, [
      data.first_name,
      data.last_name,
      data.email,
      data.phone_number,
      data.registration_date,
    ]);
    res
      .status(201)
      .send(`Success: Customer with ID ${result.customer_id} created!`);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error: Cannot create customer.`);
  }
});

// Update customer information
router.put("/", async (req, res) => {
  try {
    const data = req.body;
    let query = `CALL sp_update_customer(?, ?, ?, ?, ?, ?);`;
    await db.query(query, [
      data.customer_id,
      data.first_name,
      data.last_name,
      data.email,
      data.phone_number,
      data.registration_date,
    ]);
    query = `SELECT * FROM v_customers WHERE customer_id = ?;`;
    const [[result]] = await db.query(query, [data.customer_id]);
    res
      .status(204)
      .send(`Success: Customer with ID ${result.customer_id} updated.`);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error: Cannot update customer.`);
  }
});

// Delete customer
router.delete("/", async (req, res) => {
  try {
    const query = `CALL sp_delete_customer(?);`;
    await db.query(query, [req.body.customer_id]);
    res
      .status(204)
      .send(`Success: Customer with ID ${req.body.customer_id} deleted.`);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error: Cannot delete customer.`);
  }
});

module.exports = router;
