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

const API_BASE = import.meta.env.VITE_API_URL ?? "";
const API = `${API_BASE}/api/expenses`;

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchExpenses = async () => {
    try {
      setError("");
      const res = await fetch(API);
      if (!res.ok) throw new Error(`Failed to fetch expenses`);
      const data = await res.json();
      setExpenses(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const addExpense = async (expense: Omit<Expense, "_id">) => {
    try {
      setError("");
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expense),
      });
      if (!res.ok) throw new Error(`Failed to add expense`);
      const data = await res.json();
      setExpenses((prev) => [data, ...prev]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setError(msg);
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      setError("");
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Failed to delete expense`);
      setExpenses((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setError(msg);
    }
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="app">
      <div className="app-header">
        <h1>Expense Tracker</h1>
        <TotalAmount total={total} />
      </div>
      {error && (
        <div className="error-bar">
          <span>{error}</span>
          <button onClick={() => setError("")}>&times;</button>
        </div>
      )}
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
