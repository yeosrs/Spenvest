import React, { useState } from "react";
import Login from "./Components/Login";
import ExpenseList from "./Components/ExpenseList";
import LoginTheme from "./Components/LoginTheme";
import ExpenseListTheme from "./Components/ExpenseListTheme";

function App() {
  const [token, setToken] = useState();
  const [email, setEmail] = useState();

  if (!token) {
    return (
      <div className="page">
        {/* <Login setToken={setToken} setEmail={setEmail} />; */}
        <LoginTheme setToken={setToken} setEmail={setEmail} />
      </div>
    );
  }

  return (
    <div className="page">
      <ExpenseList token={token} email={email} setToken={setToken}/>
      {/* <ExpenseListTheme token={token} email={email} setToken={setToken}/> */}
    </div>
  );
}

export default App;
