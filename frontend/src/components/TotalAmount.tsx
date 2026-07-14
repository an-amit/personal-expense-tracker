interface TotalAmountProps {
  total: number;
}

function TotalAmount({ total }: TotalAmountProps) {
  return (
    <div className="total-card">
      <h2>Total Spent</h2>
      <div className="amount">₹{total.toFixed(2)}</div>
    </div>
  );
}

export default TotalAmount;
