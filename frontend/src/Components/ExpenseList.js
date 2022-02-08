import React, { useState } from "react";
import ExpenseCard from "./ExpenseCard";
import axios from "axios";
import { Button } from "@mui/material";

const ExpenseList = () => {
  const [cards, setCards] = useState([]);

  const getUsersTransactions = async () => {
    let res = null;
    try {
      const url = `http://localhost:5001/transactions/test@test.com/`;
      res = await axios.get(url);
      setCards(res.data);
      //console.log(res.data); // this run second
    } catch (err) {
      console.log(err);
    }

    

    //console.log(cards); // this runs last

    //setCards(display);
  };

  //getUsersTransactions();
  let display = cards.map((ele, index) => {
    console.log(ele); //this runs third
    return <ExpenseCard display={ele} key={index} />;
  });
  return (
    <>
      <Button onClick={getUsersTransactions}>Click</Button>
      {display}
    </>
  );
};

export default ExpenseList;
