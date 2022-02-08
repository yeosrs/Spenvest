import React, { useReducer } from "react";
import { Button, TextField } from "@mui/material/";
import PropTypes from "prop-types";
const axios = require("axios");

// get imput
// onChange save to state/reducer
// fetch from backend onclick
// success save token
// show cards for all entries for user.
// fail show error

const loginReducer = (loginState, action) => {
  switch (action.type) {
    case "email-change":
      //   console.log(loginState);
      return { ...loginState, email: action.payload };

    case "password-change":
      //   console.log(loginState);
      return { ...loginState, password: action.payload };

    default:
      console.log("default selected");
      break;
  }
};

const Login = ({ setToken, setEmail }) => {
  const [loginState, loginDispatcher] = useReducer(loginReducer, {
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      const url = `http://localhost:5001/auth/login`;
      const res = await axios.post(url, {
        email: loginState.email,
        password: loginState.password,
      });
      setToken(res.data.accessToken);
      setEmail(res.data.email);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <TextField
        id="email"
        label="Email "
        variant="standard"
        onChange={(event) =>
          loginDispatcher({ type: "email-change", payload: event.target.value })
        }
      />
      <br />
      <TextField
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        variant="standard"
        onChange={(event) =>
          loginDispatcher({
            type: "password-change",
            payload: event.target.value,
          })
        }
      />
      <br />
      <br />
      <Button variant="contained" onClick={() => handleSubmit(loginState)}>
        Log In
      </Button>
      <Button variant="contained">Create New Account</Button>
    </>
  );
};
Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
