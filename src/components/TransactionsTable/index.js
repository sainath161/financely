import { Radio, Select, Table } from "antd";
import React, { useState } from "react";
import searchImg from "../../Assets/search.svg";
import moment from "moment";
import { parse, unparse } from "papaparse";
import { toast } from "react-toastify";
import "./styles.css";

function TransactionsTable({
  transactions,
  addTransaction,
  fetchTransactions,
}) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");
  const { Option } = Select;
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
  ];

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handleTypeFilter = (value) => {
    setTypeFilter(value);
  };

  const handleSortKey = (e) => {
    setSortKey(e.target.value);
  };

  let filteredTransactions = transactions.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.tag.toLowerCase().includes(search.toLowerCase())
  );

  if (typeFilter) {
    filteredTransactions = filteredTransactions.filter(
      (item) => item.type === typeFilter
    );
  }

  let sortedTransactions = [...filteredTransactions];
  if (sortKey === "date") {
    sortedTransactions = sortedTransactions.sort((a, b) =>
      moment(a.date, "DD-MM-YYYY").diff(moment(b.date, "DD-MM-YYYY"))
    );
  } else if (sortKey === "amount") {
    sortedTransactions = sortedTransactions.sort((a, b) =>
      a.amount - b.amount
    );
  }

  function exportCSV() {
    var csv = unparse({
      fields: ["name", "type", "date", "amount", "tag"],
      data: transactions,
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function importFromCSV(event) {
    event.preventDefault();
    try {
      parse(event.target.files[0], {
        header: true,
        complete: async function (results) {
          for (const transaction of results.data) {
            console.log("Transactions", transaction);
            const newTransaction = {
              ...transaction,
              amount: parseFloat(transaction.amount),
            };
            await addTransaction(newTransaction, true);
          }
        },
      });
      toast.success("All Transactions are added!");
      fetchTransactions();
      event.target.files = null;
    } catch (e) {
      toast.error(`Error importing CSV file! ${e}`);
    }
  }

  return (
    <div style={{ padding: "0rem 1rem" }}>
      <div
        className="row"
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <div className="input-flex">
          <img src={searchImg} width="16" />
          <input
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by name"
          />
        </div>

        <Select
          className="select-input"
          onChange={handleTypeFilter}
          value={typeFilter}
          placeholder="Filter"
          allowClear
        >
          <Option value="">All</Option>
          <Option value="income">Income</Option>
          <Option value="expense">Expense</Option>
        </Select>
      </div>

      <div className="my-table">
        <div
          className="table-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <h2>My Transactions</h2>
          <Radio.Group
            className="input-radio"
            onChange={handleSortKey}
            value={sortKey}
          >
            <Radio.Button value="">No Sort</Radio.Button>
            <Radio.Button value="date">Sort by Date</Radio.Button>
            <Radio.Button value="amount">Sort by Amount</Radio.Button>
          </Radio.Group>
          <div
            className="table-buttons"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <button className="btn" onClick={exportCSV}>
              Export to CSV
            </button>
            <label htmlFor="file-csv" className="btn btn-blue">
              Import to CSV
            </label>
            <input
              type="file"
              id="file-csv"
              accept=".csv"
              required
              onChange={importFromCSV}
              style={{ display: "none" }}
            />
          </div>
        </div>

        <Table className="table" dataSource={sortedTransactions} columns={columns} />
      </div>
    </div>
  );
}

export default TransactionsTable;
