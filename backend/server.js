const express = require("express");
const pool = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/transactions", transactionRoutes);

pool.connect((err, pool, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  pool.query("SELECT NOW()", (err, result) => {
    release();
    if (err) {
      return console.error("Error executing query", err.stack);
    }
    console.log("Connected to PostgreSQL Database!");
  });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Ready to start investing on port ${PORT}`);
});
