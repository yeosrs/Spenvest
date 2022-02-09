import React, { useReducer } from "react";
import {
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material/";

const axios = require("axios");

const transactionReducer = (transactionState, action) => {
  switch (action.type) {
    case "vendor-change":
      console.log(transactionState);
      return { ...transactionState, vendor_name: action.payload };
    case "trans-change":
      console.log(transactionState);
      return { ...transactionState, trans_type: action.payload };
    case "product-change":
      console.log(transactionState);
      return { ...transactionState, product_name: action.payload };
    case "quantity-change":
      transactionState.total_spent =
        transactionState.unit_price * action.payload;
      console.log(transactionState);
      return { ...transactionState, quantity: action.payload };
    case "unit_price-change":
      transactionState.total_spent = transactionState.quantity * action.payload;
      console.log(transactionState);
      return { ...transactionState, unit_price: action.payload };
    default:
      console.log("default selected");
      break;
  }
};

const CreateNewTransaction = (props) => {
  const [transactionState, transactionDispatcher] = useReducer(
    transactionReducer,
    {
      vendor_name: "",
      trans_type: "Need",
      product_name: "",
      quantity: 1,
      unit_price: null,
      total_spent: null,
    }
  );

  const handleToggleChange = (event) => {
    transactionDispatcher({
      type: "trans-change",
      payload: event.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const url = `http://localhost:5001/transactions`;
      const res = await axios.post(
        url,
        {
          email: props.email,
          vendor_name: transactionState.vendor_name,
          trans_type: transactionState.trans_type,
          product_name: transactionState.product_name,
          quantity: transactionState.quantity,
          unit_price: transactionState.unit_price,
          deleted: false,
        },
        { headers: { token: `Bearer ${props.token}` } }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h3>Create New Transaction</h3>
      <TextField
        id="vendor_name"
        label="Buying From "
        variant="standard"
        onChange={(event) =>
          transactionDispatcher({
            type: "vendor-change",
            payload: event.target.value,
          })
        }
      />
      <br />
      <ToggleButtonGroup
        color="primary"
        value={transactionState.trans_type}
        exclusive
        onChange={handleToggleChange}
      >
        <ToggleButton value="Want">Want</ToggleButton>
        <ToggleButton value="Need">Need</ToggleButton>
      </ToggleButtonGroup>
      <br />
      <TextField
        id="product_name"
        label="Item "
        variant="standard"
        onChange={(event) =>
          transactionDispatcher({
            type: "product-change",
            payload: event.target.value,
          })
        }
      />
      <br />
      <TextField
        id="quantity"
        label="Quantity "
        variant="standard"
        onChange={(event) =>
          transactionDispatcher({
            type: "quantity-change",
            payload: event.target.value,
          })
        }
      />
      <br />
      <TextField
        id="unit_price"
        label="Price of each Item "
        variant="standard"
        onChange={(event) =>
          transactionDispatcher({
            type: "unit_price-change",
            payload: event.target.value,
          })
        }
      />
      <br />
      <br />
      <h3>Projected value of money if invested for 10 years</h3>
      S&P 500 : {transactionState.total_spent * 2.98}
      <br />
      Apple : {transactionState.total_spent * 1.3123 ** 10}
      <br />
      Eth : {transactionState.total_spent * 1.5 ** 10}
      <br />
      <br />
      {transactionState.trans_type === "Need" ? (
        <Button
          variant="contained"
          onClick={() => handleSubmit(transactionState)}
        >
          Submit New Transaction
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={() => handleSubmit(transactionState)}
        >
          I Really Really Want It!
        </Button>
      )}
    </>
  );
};

export default CreateNewTransaction;
