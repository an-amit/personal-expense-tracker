interface Expense {
  _id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
}

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  if (expenses.length === 0)
    return (
      <p className="loading" style={{ marginTop: 0, padding: 20 }}>
        No expenses yet.
      </p>
    );

  return (
    <div className="expense-list">
      {expenses.map((expense) => (
        <div key={expense._id} className="expense-item">
          <div className="expense-info">
            <div className="desc">{expense.description}</div>
            <div className="meta">
              {expense.category} &middot;{" "}
              {new Date(expense.date).toLocaleDateString()}
            </div>
          </div>
          <div className="expense-amount">₹{expense.amount.toFixed(2)}</div>
          <button onClick={() => onDelete(expense._id)} title="Delete">
            &times;
          </button>
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;
