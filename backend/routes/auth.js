const express = require("express");
const pool = require("../config/db");
const router = express.Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  try {
    const user = await pool.query(
      `SELECT * FROM users WHERE email LIKE '${req.body.email}'`
    ); // look for user in database
    !user && res.status(401).json("Username does not exist");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.rows[0].hashed_password,
      "$h0w-m3-th3-m0n3y"
    );
    const decryptedPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    decryptedPassword !== req.body.password &&
      res.status(401).json("Username does not exist or wrong password");

    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      "jwtkey",
      { expiresIn: "30d" }
    );
    let userClone = { ...user.rows[0] };
    delete userClone.hashed_password;
    delete userClone.deleted;
    res.status(200).json({ accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
