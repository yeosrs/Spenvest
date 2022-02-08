import React, { useReducer, useState } from "react";
import { Button, TextField, Modal, Box } from "@mui/material/";
import PropTypes from "prop-types";
import CreateNewUser from "./CreateNewUser";
const axios = require("axios");

// get imput
// onChange save to state/reducer
// fetch from backend onclick
// success save token
// show cards for all entries for user.
// fail show error

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
      <Button variant="contained" onClick={handleOpen}>
        Create New Account
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <CreateNewUser />
        </Box>
      </Modal>
    </>
  );
};
Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
