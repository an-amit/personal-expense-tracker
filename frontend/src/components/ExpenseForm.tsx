import { useState } from "react";

interface ExpenseFormProps {
  onAdd: (expense: {
    amount: number;
    description: string;
    category: string;
    date: string;
  }) => void;
}

function ExpenseForm({ onAdd }: ExpenseFormProps) {
  const getToday = () => new Date().toISOString().split("T")[0];
  const [form, setForm] = useState({
    amount: "",
    description: "",
    category: "",
    date: getToday(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.amount || !form.description || !form.category || !form.date)
      return;
    onAdd({ ...form, amount: Number(form.amount) });
    setForm({ amount: "", description: "", category: "", date: getToday() });
  };

  return (
    <div className="form-card">
      <h3>Add Expense</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="amount"
          type="number"
          step="0.01"
          placeholder="Amount (₹)"
          value={form.amount}
          onChange={handleChange}
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          name="category"
          placeholder="Category (e.g. Food, Transport)"
          value={form.category}
          onChange={handleChange}
        />
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
        />
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}

export default ExpenseForm;
