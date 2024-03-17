import React from "react";
import "./styles.css"

function Transaction() {
  return (
    <div className="body">
    <div className="payment-animation">
      <div className="payment-animation-wrapper">
        <div className="bills-container">
          <div className="bill bill-1">₹</div>
          <div className="bill bill-2">₹</div>
          <div className="bill bill-3">₹</div>
          <div className="bill bill-4">₹</div>
          <div className="bill bill-5">₹</div>
          <div className="bill bill-6">₹</div>
          <div className="bill bill-7">₹</div>
        </div>
        <div className="geldspeicher">
          <div className="wall-1-container">
            <div className="wall-1">
              <div className="schild">No Transactions Yet ☹️</div>
            </div>
          </div>
          <div className="wall-2-container">
            <div className="wall-2"></div>
          </div>
        </div>
        <div className="huegel"></div>
      </div>
    </div>
    </div>
  );
}

export default Transaction;
