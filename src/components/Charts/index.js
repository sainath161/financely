import { Line, Pie } from "@ant-design/charts";
import React from "react";
import "./styles.css";

function ChartComponent({ sortedTransactions }) {
  const data = sortedTransactions.map((item) => {
    return { date: item.date, amount: item.amount };
  });

  const spendingData = sortedTransactions.filter((transaction) => {
    return transaction.type === "expense";
  });

  let finalSpendings = spendingData.reduce((acc, obj) => {
    let key = obj.tag;
    if (!acc[key]) {
      acc[key] = { tag: obj.tag, amount: obj.amount };
    } else {
      acc[key].amount += obj.amount;
    }
    return acc;
  }, {});

  const config = {
    data: data,
    xField: "date",
    yField: "amount",
  };

  const spendingConfig = {
    data: Object.values(finalSpendings),
    angleField: "amount",
    colorField: "tag",
  };

  return (
    <div className="charts-wrapper">
      <div className="chart-container">
        <h3 style={{ marginTop: 0 }}>Your Analytics</h3>
        <div className="line-chart">
          <Line {...config} />
        </div>
      </div>
      <div className="pie-chart">
        <h3>Spending by Category</h3>
        <div className="pie">
          {Object.keys(finalSpendings).length > 0 ? (
            <Pie {...spendingConfig} />
          ) : (
            <p>No spendings yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChartComponent;
