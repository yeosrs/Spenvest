const express = require("express");
const pool = require("./config/db");

const app = express();
app.use(express.json());

app.post("/users", async (req, res) => {
  try {
    const { email, name, address } = req.body;
    const newUser = await pool.query(
      "INSERT INTO users (email, name, address) VALUES($1, $2, $3) RETURNING *",
      [email, name, address]
    );

    res.json(newUser.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Ready to start investing on port ${PORT}`);
});
