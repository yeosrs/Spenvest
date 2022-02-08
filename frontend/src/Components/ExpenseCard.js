import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

// display info
function ExpenseCard(props) {
  console.log("expenseCard" + props);
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
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default ExpenseCard;
