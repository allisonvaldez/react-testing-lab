// Import necessary components, useState, useEffect
import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
import Sort from "./Sort";

// Create a function for AccountContainer
function AccountContainer() {
  const [transactions, setTransactions] = useState([])
  const [search, setSearch] = useState("")

  // Declare useEffect to fetch transactions on mount
  useEffect(() => {
    fetch("http://localhost:6001/transactions")
      .then(r => r.json())
      .then(data => setTransactions(data))
  }, [])

  // Create a function for postTransaction
  function postTransaction(newTransaction) {
    fetch('http://localhost:6001/transactions', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTransaction)
    })
      .then(r => r.json())
      .then(data => setTransactions([...transactions, data]))
  }

  // Sort transactions alphabetically by the selected field
  function onSort(sortBy) {
    const sorted = [...transactions].sort((a, b) =>
      a[sortBy].toLowerCase() > b[sortBy].toLowerCase() ? 1 : -1
    );
    setTransactions(sorted);
  }

  // Filter transactions based on search query before passing to TransactionsList
  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Search setSearch={setSearch} />
      <AddTransactionForm postTransaction={postTransaction} />
      <Sort onSort={onSort} />
      {/* Pass filteredTransactions so search works correctly */}
      <TransactionsList transactions={filteredTransactions} />
    </div>
  );
}

export default AccountContainer;