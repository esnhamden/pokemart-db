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

// Get all discount codes
router.get("/", async (req, res) => {
  try {
    const [result] = await db.query(`SELECT * FROM v_discount_codes;`);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error: Cannot get customer data.");
  }
});

// Create discount code
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const query = `CALL sp_create_discount_code(?, ?, ?, ?);`;
    const [[[result]]] = await db.query(query, [
      data.code,
      data.discount_amount,
      data.description,
      data.expiration_date,
    ]);
    res
      .status(201)
      .send(
        `Success: Discount code with ID ${result.discount_code_id} created!`
      );
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error: Cannot create discount code.`);
  }
});

// Update discount code information
router.put("/", async (req, res) => {
  try {
    const data = req.body;
    let query = `CALL sp_update_discount_code(?, ?, ?, ?, ?);`;
    await db.query(query, [
      data.discount_code_id,
      data.code,
      data.discount_amount,
      data.description,
      data.expiration_date,
    ]);
    query = `SELECT * FROM v_discount_codes WHERE discount_code_id = ?;`;
    const [[result]] = await db.query(query, [data.discount_code_id]);
    res
      .status(204)
      .send(
        `Success: Discount code with ID ${result.discount_code_id} updated.`
      );
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error: Cannot update discount code.`);
  }
});

// Delete discount code
router.delete("/", async (req, res) => {
  try {
    const query = `CALL sp_delete_discount_code(?);`;
    await db.query(query, [req.body.discount_code_id]);
    res
      .status(204)
      .send(
        `Success: Discount code with ID ${req.body.discount_code_id} deleted.`
      );
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error: Cannot delete discount code.`);
  }
});

module.exports = router;
