import { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import TotalAmount from "./components/TotalAmount";
import "./App.css";

interface Expense {
  _id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
}

const API = "/api/expenses";

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setExpenses(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const addExpense = async (expense: Omit<Expense, "_id">) => {
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expense),
      });
      const data = await res.json();
      setExpenses((prev) => [data, ...prev]);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      setExpenses((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="app">
      <div className="app-header">
        <h1>Expense Tracker</h1>
        <TotalAmount total={total} />
      </div>
      <div className="app-body">
        <div className="app-sidebar">
          <ExpenseForm onAdd={addExpense} />
        </div>
        <div className="expense-list-wrapper">
          {loading ? (
            <p className="loading">Loading...</p>
          ) : (
            <ExpenseList expenses={expenses} onDelete={deleteExpense} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
