import React, { useReducer } from "react";
import { Button, TextField } from "@mui/material/";
const axios = require("axios");

// check if email, passwords match
// check with backend if email exists?
// format checking for rest of fields
// send to server to create new account

const registerReducer = (userState, action) => {
  switch (action.type) {
    case "email-change":
      //   console.log(userState);
      return { ...userState, email: action.payload };
    case "confirm_email-change":
      //   console.log(userState);
      return { ...userState, confirm_email: action.payload };
    case "password-change":
      //   console.log(userState);
      return { ...userState, password: action.payload };
    case "confirm_password-change":
      //   console.log(userState);
      return {
        ...userState,
        confirm_password: action.payload,
      };
    case "name-change":
      //   console.log(userState);
      return { ...userState, name: action.payload };
    case "address-change":
      //   console.log(userState);
      return { ...userState, address: action.payload };
    case "contact_number-change":
      //   console.log(userState);
      return { ...userState, contact_number: action.payload };
    case "monthly_pay-change":
      //   console.log(userState);
      return { ...userState, monthly_pay: action.payload };
    case "savings_target-change":
      //   console.log(userState);
      return { ...userState, savings_target: action.payload };
    default:
      console.log("default selected");
      break;
  }
};

const CreateNewUser = (props) => {
  const [userState, UserDispatcher] = useReducer(registerReducer, {
    email: "",
    confirm_email: "",
    password: "",
    confirm_password: "",
    name: "",
    address: "",
    contact_number: null,
    monthly_pay: null,
    savings_target: null,
  });

  const handleSubmit = async () => {
    try {
      const url = `http://localhost:5001/users`;
      const res = await axios.post(url, {
        email: userState.email,
        password: userState.password,
        name: userState.name,
        address: userState.address,
        contact_number: userState.contact_number,
        monthly_pay: userState.monthly_pay,
        savings_target: userState.savings_target,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1>Create New User</h1>
      <TextField
        id="email"
        label="Email "
        variant="standard"
        onChange={(event) =>
          UserDispatcher({ type: "email-change", payload: event.target.value })
        }
      />
      <TextField
        id="confirm_email"
        label="Confirm Email "
        variant="standard"
        onChange={(event) =>
          UserDispatcher({
            type: "confirm_email-change",
            payload: event.target.value,
          })
        }
      />
      <br />
      <TextField
        id="password"
        label="Password"
        type="password"
        variant="standard"
        onChange={(event) =>
          UserDispatcher({
            type: "password-change",
            payload: event.target.value,
          })
        }
      />

      <TextField
        id="confirm_password"
        label="Confirm Password"
        type="password"
        variant="standard"
        onChange={(event) =>
          UserDispatcher({
            type: "confirm_password-change",
            payload: event.target.value,
          })
        }
      />
      <br />
      <TextField
        id="name"
        label="Name"
        variant="standard"
        onChange={(event) =>
          UserDispatcher({ type: "name-change", payload: event.target.value })
        }
      />
      <TextField
        id="address"
        label="Address "
        multiline
        rows={4}
        variant="standard"
        onChange={(event) =>
          UserDispatcher({
            type: "address-change",
            payload: event.target.value,
          })
        }
      />
      <br />
      <TextField
        id="contact_number"
        label="Contact Number"
        variant="standard"
        onChange={(event) =>
          UserDispatcher({
            type: "contact_number-change",
            payload: event.target.value,
          })
        }
      />
      <br />
      <TextField
        id="monthly_pay"
        label="Monthly Pay "
        variant="standard"
        onChange={(event) =>
          UserDispatcher({
            type: "monthly_pay-change",
            payload: event.target.value,
          })
        }
      />
      <TextField
        id="savings_target"
        label="Savings Target "
        variant="standard"
        onChange={(event) =>
          UserDispatcher({
            type: "savings_target-change",
            payload: event.target.value,
          })
        }
      />
      <br />
      <br />
      <br />

      <Button variant="contained" onClick={() => handleSubmit(userState)}>
        Create New Account
      </Button>
    </>
  );
};

export default CreateNewUser;
