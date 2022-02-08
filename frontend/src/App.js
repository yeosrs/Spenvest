import React, { useState } from "react";
import Login from "./Components/Login";
import ExpenseList from "./Components/ExpenseList";

function App() {
  const [token, setToken] = useState();
  const [email, setEmail] = useState();

  if (!token) {
    return <Login setToken={setToken} setEmail={setEmail} />;
  }

  return (
    <div>
      <ExpenseList token={token} email={email} />
    </div>
  );
}

export default App;
