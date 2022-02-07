import React from "react";
import { Button, TextField } from "@mui/material/";

// get imput
// onChange save to state/reducer
// fetch from backend onclick
// success save token
// show cards for all entries for user.
// fail show error

const Login = (props) => {
  return (
    <>
      <TextField id="email" label="Email " variant="standard" />
      <br />
      <TextField
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        variant="standard"
      />
      <br />
      <br />
      <Button variant="contained">Log In</Button>
      <Button variant="contained">Create New Account</Button>
    </>
  );
};

export default Login;
