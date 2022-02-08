import React, { useState } from "react";
import ExpenseCard from "./ExpenseCard";
import axios from "axios";
import { Button, Modal, Box } from "@mui/material";
import CreateNewTransaction from "./CreateNewTransaction.js";

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

const ExpenseList = (props) => {
  const [cards, setCards] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log("Props token " + props.token);
  console.log("Props email " + props.email);

  const getUsersTransactions = async () => {
    let res = null;
    try {
      const url = `http://localhost:5001/transactions/${props.email}/`;
      console.log(url)
      res = await axios.get(url);
      setCards(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  let display = cards.map((ele, index) => {
    return <ExpenseCard display={ele} key={index} />;
  });
  return (
    <>
      <Button variant="contained" onClick={getUsersTransactions}>
        Show Transactions
      </Button>
      <Button variant="contained" onClick={handleOpen}>
        Create New Transaction
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <CreateNewTransaction token = {props.token} email= {props.email}/>
        </Box>
      </Modal>
      {display}
    </>
  );
};

export default ExpenseList;
