/*
Alexander Birrell and Eason Hamden
12/8/2025

Citations:
- Based on code from CS340 Activity 2 Connect webapp to database
  URL: https://canvas.oregonstate.edu/courses/2017561/assignments/10111722?
*/

const dotenv = require("dotenv").config();
const mysql = require("mysql2");

const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
  })
  .promise();

module.exports = pool;
