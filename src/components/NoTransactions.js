import React from "react";
import Transaction from "../Assets/Transaction";

function NoTransactions() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        flexDirection: "column",
        marginBottom: "2rem",
      }}
    >
        <Transaction />
    </div>
  );
}

export default NoTransactions;
