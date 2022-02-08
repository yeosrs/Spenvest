import React, { useReducer, useEffect, useState } from "react";
import {
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material/";

const axios = require("axios");

const editReducer = (editState, action) => {
  switch (action.type) {
    case "vendor-change":
      console.log(editState);
      return { ...editState, vendor_name: action.payload };
    case "trans-change":
      console.log(editState);
      return { ...editState, trans_type: action.payload };
    case "product-change":
      console.log(editState);
      return { ...editState, product_name: action.payload };
    case "quantity-change":
      editState.total_spent = editState.unit_price * action.payload;
      console.log(editState);
      return { ...editState, quantity: action.payload };
    case "unit_price-change":
      editState.total_spent = editState.quantity * action.payload;
      console.log(editState);
      return { ...editState, unit_price: action.payload };
    default:
      console.log("default selected");
      break;
  }
};

const EditTransaction = (props) => {
  const [oneTrans, setOneTrans] = useState({
    vendor_name: "",
    trans_type: "",
    product_name: "",
    quantity: 1,
    unit_price: null,
    total_spent: null,
  });
  useEffect(() => {
    const getSingleTrans = async () => {
      let res = null;
      try {
        const url = `http://localhost:5001/transactions/${props.email}/${props.transID}`;
        res = await axios.get(url, {
          headers: { token: `Bearer ${props.token}` },
        });
        console.log(res.data[0]);
        console.log(res.data[0].vendor_name);
        console.log(res.data[0].trans_type);
        console.log(res.data[0].product_name);
        console.log(res.data[0].quantity);
        console.log(res.data[0].unit_price);
        setOneTrans(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getSingleTrans();
  }, []);

  const [editState, editDispatcher] = useReducer(editReducer, {
    vendor_name: "",
    trans_type: "",
    product_name: "",
    quantity: 1,
    unit_price: null,
    total_spent: null,
  });

  const handleToggleChange = (event) => {
    editDispatcher({
      type: "trans-change",
      payload: event.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const url = `http://localhost:5001/transactions/${props.email}/${props.transID}/edit`;
      const res = await axios.post(
        url,
        {
          email: props.email,
          vendor_name: editState.vendor_name,
          trans_type: editState.trans_type,
          product_name: editState.product_name,
          quantity: editState.quantity,
          unit_price: editState.unit_price,
          deleted: false,
        },
        { headers: { token: `Bearer ${props.token}` } }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

//   editDispatcher({
//     type: "vendor-change",
//     payload: oneTrans.vendor_name,
//   });
//   editDispatcher({
//     type: "trans-change",
//     payload: oneTrans.trans_type,
//   });
//   editDispatcher({
//     type: "product-change",
//     payload: oneTrans.product_name,
//   });
//   editDispatcher({
//     type: "quanity-change",
//     payload: oneTrans.quantity,
//   });
//   editDispatcher({
//     type: "unit_price-change",
//     payload: oneTrans.unit_price,
//   });

  return (
    <>
      <h3>Edit Transaction</h3>
      <TextField
        id="vendor_name"
        label="Buying From "
        variant="standard"
        // defaultValue={editState.vendor_name}
        onChange={(event) =>
          editDispatcher({
            type: "vendor-change",
            payload: event.target.value,
          })
        }
      />
      <br />
      <ToggleButtonGroup
        color="primary"
        value={editState.trans_type}
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
        // defaultValue={editState.product_name}
        onChange={(event) =>
          editDispatcher({
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
        // defaultValue={editState.quantity}
        onChange={(event) =>
          editDispatcher({
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
        // defaultValue={editState.unit_price}
        onChange={(event) =>
          editDispatcher({
            type: "unit_price-change",
            payload: event.target.value,
          })
        }
      />
      <br />
      <br />
      <h3>Projected value of money if invested for 10 years</h3>
      S&P 500 : {editState.total_spent * 2.98}
      <br />
      Apple : {editState.total_spent * 1.3123 ** 10}
      <br />
      Eth : {editState.total_spent * 1.5 ** 10}
      <br />
      <br />
      {editState.trans_type == "Need" ? (
        <Button variant="contained" onClick={() => handleSubmit(editState)}>
          Submit New Transaction
        </Button>
      ) : (
        <Button variant="contained" onClick={() => handleSubmit(editState)}>
          I Really Really Want It!
        </Button>
      )}
    </>
  );
};

export default EditTransaction;
