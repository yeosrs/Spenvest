import React, { useState } from "react";
import Login from "./Components/Login";
import ExpenseList from "./Components/ExpenseList";

function App() {
  const [token, setToken] = useState();
  const [email, setEmail] = useState();

  if (!token) {
    return (
      <div className="page">
        <h3>Spenvest</h3>
        <Login setToken={setToken} setEmail={setEmail} />;
      </div>
    );
  }

  return (
    <div className="page">
      <ExpenseList token={token} email={email} />
    </div>
  );
}

export default App;
