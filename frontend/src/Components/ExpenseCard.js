import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Modal,
  Box,
} from "@mui/material";
import axios from "axios";
import EditTransaction from "./EditTransaction";
// display info

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

function ExpenseCard(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteTransaction = async () => {
    let res = null;
    try {
      const url = `http://localhost:5001/transactions/${props.display.email}/${props.display.transaction_id}/delete`;
      res = await axios.delete(url, {
        headers: { token: `Bearer ${props.token}` },
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="body2">
            Item: {props.display.product_name} <br />
            Quantity: {props.quantity}
            <br />
            Price: {props.display.unit_price}
            <br />
            Bought From: {props.display.vendor_name}
            <br />
            Type: {props.display.trans_type}
            <br />
            Time: {props.display.ts}
            <br />
            <Button variant="contained" onClick={handleOpen}>
              Edit Transaction
            </Button>
            <Modal open={open} onClose={handleClose}>
              <Box sx={style}>
                <EditTransaction
                  token={props.token}
                  email={props.display.email}
                  transID={props.display.transaction_id}
                  handleClose={handleClose}
                />
              </Box>
            </Modal>
            <Button variant="contained" onClick={deleteTransaction}>
              Delete Transaction
            </Button>
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default ExpenseCard;
