const express = require("express");
const pool = require("../config/db");

const router = express.Router();

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

router.get("/:email", async (req, res) => {
  try {
    const allTrans = await pool.query(
      `SELECT * FROM transactions WHERE email LIKE '${req.params.email}'`
    );

    res.json(allTrans.rows);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:email", async (req, res) => {
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

// router.put("/:email/edit", async (req, res) => {
//   try {
//     let {
//       email,
//       name,
//       address,
//       contact_number,
//       hashed_password,
//       monthly_pay,
//       savings_target,
//       deleted,
//     } = req.body;
//     currentValues = await pool.query(
//       `SELECT * FROM users WHERE email LIKE '${req.params.email}'`
//     );

//     if (email == null) {
//       email = req.params.email;
//     }

//     if (name == null) {
//       name = currentValues.rows[0].name;
//     }

//     if (address == null) {
//       address = currentValues.rows[0].address;
//     }

//     if (contact_number == null) {
//       contact_number = currentValues.rows[0].contact_number;
//     }

//     if (hashed_password == null) {
//       hashed_password = currentValues.rows[0].hashed_password;
//     }

//     if (monthly_pay == null) {
//       monthly_pay = currentValues.rows[0].monthly_pay;
//     }

//     if (savings_target == null) {
//       savings_target = currentValues.rows[0].savings_target;
//     }

//     if (deleted == null) {
//       deleted = currentValues.rows[0].deleted;
//     }

//     // );`
//     // const editUser = await pool.query(
//     //   `UPDATE users SET email = '${email}', name = '${name}', address = '${address}', contact_number=${contact_number}, hashed_password = '${hashed_password}', monthly_pay = ${monthly_pay}, savings_target = ${savings_target}, deleted = ${deleted} WHERE email LIKE '${req.params.email}' RETURNING *`
//     // );

//     const query = `UPDATE users SET email = $1, name = $2, address = $3, contact_number = $4, hashed_password = $5, monthly_pay = $6, savings_target = $7, deleted = $8 WHERE email LIKE '${req.params.email}' RETURNING *`;
//     const editUser = await pool.query(query, [
//       email,
//       name,
//       address,
//       contact_number,
//       hashed_password,
//       monthly_pay,
//       savings_target,
//       deleted,
//     ]);
//     res.json(editUser.rows);
//   } catch (error) {
//     console.log(error);
//   }
// });

module.exports = router;
