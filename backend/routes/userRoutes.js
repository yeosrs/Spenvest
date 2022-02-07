const express = require("express");
const pool = require("../config/db");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("./verifyToken");

const router = express.Router();

//Create user account
router.post("/", async (req, res) => {
  try {
    const {
      email,
      name,
      address,
      contact_number,
      password,
      monthly_pay,
      savings_target,
      deleted,
    } = req.body;

    //encrypting password with AES
    hashed_password = CryptoJS.AES.encrypt(
      password,
      "$h0w-m3-th3-m0n3y"
    ).toString();
    const newUser = await pool.query(
      "INSERT INTO users (email, name, address, contact_number, hashed_password, monthly_pay, savings_target, deleted) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        email,
        name,
        address,
        contact_number,
        hashed_password,
        monthly_pay,
        savings_target,
        deleted,
      ]
    );
    // sending back saved data without password or deleted fields
    let userClone = { ...newUser.rows[0] };
    delete userClone.hashed_password;
    delete userClone.deleted;
    res.status(200).json(userClone);
  } catch (error) {
    console.log(error);
  }
});

//show all users
router.get("/", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");

    res.status(200).json(allUsers.rows);
  } catch (error) {
    console.log(error);
  }
});

// "Delete" user account
router.delete("/:email", verifyToken, async (req, res) => {
  try {
    // const delUser = await pool.query(
    //   `DELETE FROM users WHERE email LIKE '${req.params.email}' RETURNING *`
    // );

    const delUser = await pool.query(
      `UPDATE users SET deleted = True WHERE email LIKE '${req.params.email}' RETURNING *`
    );

    res.status(200).json(`User ${req.params.email} has been deleted`);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:email/edit", verifyToken, async (req, res) => {
  try {
    let {
      email,
      name,
      address,
      contact_number,
      password,
      monthly_pay,
      savings_target,
      deleted,
    } = req.body;
    currentValues = await pool.query(
      `SELECT * FROM users WHERE email LIKE '${req.params.email}'`
    );

    let hashed_password = null;

    if (req.body.password) {
      hashed_password = CryptoJS.AES.encrypt(
        req.body.password,
        "$h0w-m3-th3-m0n3y"
      ).toString();
    }

    if (email == null) {
      email = req.params.email;
    }

    if (name == null) {
      name = currentValues.rows[0].name;
    }

    if (address == null) {
      address = currentValues.rows[0].address;
    }

    if (contact_number == null) {
      contact_number = currentValues.rows[0].contact_number;
    }

    if (hashed_password == null) {
      hashed_password = currentValues.rows[0].hashed_password;
    }

    if (monthly_pay == null) {
      monthly_pay = currentValues.rows[0].monthly_pay;
    }

    if (savings_target == null) {
      savings_target = currentValues.rows[0].savings_target;
    }

    if (deleted == null) {
      deleted = currentValues.rows[0].deleted;
    }

    const query = `UPDATE users SET email = $1, name = $2, address = $3, contact_number = $4, hashed_password = $5, monthly_pay = $6, savings_target = $7, deleted = $8 WHERE email LIKE '${req.params.email}' RETURNING *`;
    const editUser = await pool.query(query, [
      email,
      name,
      address,
      contact_number,
      hashed_password,
      monthly_pay,
      savings_target,
      deleted,
    ]);
    res.status(200).json(editUser.rows);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
