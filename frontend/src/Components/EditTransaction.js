import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material/";

const axios = require("axios");

// const editReducer = (editState, action) => {
//   switch (action.type) {
//     case "vendor-change":
//       console.log(editState);
//       return { ...editState, vendor_name: action.payload };
//     case "trans-change":
//       console.log(editState);
//       return { ...editState, trans_type: action.payload };
//     case "product-change":
//       console.log(editState);
//       return { ...editState, product_name: action.payload };
//     case "quantity-change":
//       editState.total_spent = editState.unit_price * action.payload;
//       console.log(editState);
//       return { ...editState, quantity: action.payload };
//     case "unit_price-change":
//       editState.total_spent = editState.quantity * action.payload;
//       console.log(editState);
//       return { ...editState, unit_price: action.payload };
//     default:
//       console.log("default selected");
//       break;
//   }
// };

const EditTransaction = (props) => {
  const [oneTrans, setOneTrans] = useState({
    vendor_name: "",
    trans_type: "",
    product_name: "",
    quantity: 1,
    unit_price: 1,
    total_spent: 1,
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
        // console.log(res.data[0].vendor_name);
        // console.log(res.data[0].trans_type);
        // console.log(res.data[0].product_name);
        // console.log(res.data[0].quantity);
        // console.log(res.data[0].unit_price);
        setOneTrans(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getSingleTrans();
  }, []);

  useEffect(() => {
    console.log("oneTrans saved");
    console.log(oneTrans);
    // editDispatcher({
    //   type: "vendor-change",
    //   payload: oneTrans.vendor_name,
    // });
    // editDispatcher({
    //   type: "trans-change",
    //   payload: oneTrans.trans_type,
    // });
    // editDispatcher({
    //   type: "product-change",
    //   payload: oneTrans.product_name,
    // });
    // editDispatcher({
    //   type: "quanity-change",
    //   payload: oneTrans.quantity,
    // });
    // editDispatcher({
    //   type: "unit_price-change",
    //   payload: oneTrans.unit_price,
    // });
  }, [oneTrans]);

  // const [editState, editDispatcher] = useReducer(editReducer, {
  //   vendor_name: null,
  //   trans_type: null,
  //   product_name: null,
  //   quantity: null,
  //   unit_price: null,
  //   total_spent: null,
  // });

  // const handleToggleChange = (event) => {
  //   editDispatcher({
  //     type: "trans-change",
  //     payload: event.target.value,
  //   });
  // };

  const handleToggleChange = (event) => {
    event.preventDefault();
    setOneTrans({ ...oneTrans, trans_type: event.target.value });
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { id, value } = event.target;

    setOneTrans({ ...oneTrans, [id]: value });
  };

  const handleSubmit = async () => {
    console.log("submitting");
    try {
      const url = `http://localhost:5001/transactions/${props.email}/${props.transID}/edit`;
      console.log(url);
      const res = await axios.put(
        url,
        {
          email: props.email,
          vendor_name: oneTrans.vendor_name,
          trans_type: oneTrans.trans_type,
          product_name: oneTrans.product_name,
          quantity: oneTrans.quantity,
          unit_price: oneTrans.unit_price,
          deleted: false,
        },
        { headers: { token: `Bearer ${props.token}` } }
      );
      props.handleClose();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h3>Edit Transaction</h3>
      <TextField
        id="vendor_name"
        label="Buying From "
        variant="standard"
        value={oneTrans.vendor_name}
        onChange={handleChange}
        // onChange={(event) =>
        //   editDispatcher({
        //     type: "vendor-change",
        //     payload: event.target.value,
        //   })
        // }
      />
      <br />
      <ToggleButtonGroup
        color="primary"
        value={oneTrans.trans_type}
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
        value={oneTrans.product_name}
        onChange={handleChange}
        // onChange={(event) =>
        //   editDispatcher({
        //     type: "product-change",
        //     payload: event.target.value,
        //   })
        // }
      />
      <br />
      <TextField
        id="quantity"
        label="Quantity "
        variant="standard"
        value={oneTrans.quantity}
        onChange={handleChange}
        // onChange={(event) =>
        //   editDispatcher({
        //     type: "quantity-change",
        //     payload: event.target.value,
        //   })
        // }
      />
      <br />
      <TextField
        id="unit_price"
        label="Price of each Item "
        variant="standard"
        value={oneTrans.unit_price}
        onChange={handleChange}
        // onChange={(event) =>
        //   editDispatcher({
        //     type: "unit_price-change",
        //     payload: event.target.value,
        //   })
        // }
      />
      <br />
      <br />
      <br />
      <br />
      {oneTrans.trans_type === "Need" ? (
        <Button variant="contained" onClick={handleSubmit}>
          Submit New Transaction
        </Button>
      ) : (
        <Button variant="contained" onClick={handleSubmit}>
          I Really Really Want It!
        </Button>
      )}
    </>
  );
};

export default EditTransaction;
