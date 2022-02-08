const express = require("express");
const pool = require("../config/db");
const { verifyToken } = require("./verifyToken");

const router = express.Router();

//Create transaction
router.post("/", async (req, res) => {
  try {
    const {
      email,
      vendor_name,
      trans_type,
      deleted,
      product_name,
      quantity,
      unit_price,
    } = req.body;

    const transDate = await pool.query("SELECT NOW();");

    const query =
      "WITH new_trans AS (INSERT INTO transactions (email,vendor_name,trans_type, ts ,deleted) VALUES ($1, $2, $3, $4, $5) RETURNING transaction_id) INSERT INTO purchases (transaction_id, product_name, quantity, unit_price) VALUES((SELECT transaction_ID from new_trans),$6, $7, $8) RETURNING *";
    const newTrans = await pool.query(query, [
      email,
      vendor_name,
      trans_type,
      transDate.rows[0].now,
      deleted,
      product_name,
      quantity,
      unit_price,
    ]);

    res.json(newTrans.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

//Get all transactions by user
router.get("/:email", async (req, res) => {
  try {
    const allTrans = await pool.query(
      `SELECT * FROM transactions,purchases WHERE email LIKE '${req.params.email}' AND deleted = False`
    );

    res.json(allTrans.rows);
  } catch (error) {
    console.log(error);
  }
});

//Get 1 transaction by user
router.get("/:email/:id", verifyToken, async (req, res) => {
  try {
    const oneTrans = await pool.query(
      `SELECT * FROM transactions,purchases WHERE transactions.transaction_id = ${req.params.id}`
    );

    res.json(oneTrans.rows);
  } catch (error) {
    console.log(error);
  }
});

// "Delete" all transactions by user
router.delete("/:email", verifyToken, async (req, res) => {
  try {
    // const delTrans = await pool.query(
    //   `DELETE FROM transactions WHERE email LIKE '${req.params.email}' RETURNING *`
    // );

    const delTrans = await pool.query(
      `UPDATE transactions SET deleted = True WHERE email LIKE '${req.params.email}' RETURNING *`
    );

    res.json(delTrans.rows);
  } catch (error) {
    console.log(error);
  }
});

// "Delete" 1 transaction by user
router.delete("/:email/:transaction/delete", verifyToken, async (req, res) => {
  try {
    const delTrans = await pool.query(
      `UPDATE transactions SET deleted = True WHERE transaction_id = ${req.params.transaction} RETURNING *`
    );

    res.json(delTrans.rows);
  } catch (error) {
    console.log(error);
  }
});

// Edit 1 transaction by user
router.put("/:email/:transaction/edit", verifyToken, async (req, res) => {
  try {
    let {
      email,
      vendor_name,
      trans_type,
      deleted,
      product_name,
      quantity,
      unit_price,
    } = req.body;

    currentValues = await pool.query(
      `SELECT * FROM transactions, purchases WHERE transactions.transaction_id = ${req.params.transaction}`
    );

    if (email == null) {
      email = req.params.email;
    }

    if (vendor_name == null) {
      vendor_name = currentValues.rows[0].vendor_name;
    }

    if (trans_type == null) {
      trans_type = currentValues.rows[0].trans_type;
    }

    if (product_name == null) {
      product_name = currentValues.rows[0].product_name;
    }

    if (quantity == null) {
      quantity = currentValues.rows[0].quantity;
    }

    if (unit_price == null) {
      unit_price = currentValues.rows[0].unit_price;
    }

    if (deleted == null) {
      deleted = currentValues.rows[0].deleted;
    }

    const query = `WITH update_trans AS (
      UPDATE transactions
      SET email = $1,vendor_name = $2,trans_type = $3 ,deleted=$4 
      WHERE transaction_id = ${req.params.transaction} 
      RETURNING transaction_id) 
      UPDATE purchases 
      SET product_name = $5, quantity = $6, unit_price = $7 WHERE purchases.transaction_id = (SELECT transaction_ID from update_trans) RETURNING *`;
    const editTrans = await pool.query(query, [
      email,
      vendor_name,
      trans_type,
      deleted,
      product_name,
      quantity,
      unit_price,
    ]);

    res.json(editTrans.rows);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
