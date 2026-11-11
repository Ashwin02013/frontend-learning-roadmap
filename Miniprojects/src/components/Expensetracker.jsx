import { useState } from "react";

function ExpenseTracker() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({ title: "", amount: "", type: "income" });
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addRecord = (e) => {
    e.preventDefault();

    if (!form.title.trim() || Number(form.amount) <= 0) {
      setError("Enter a title and an amount greater than 0");
      return;
    }

    const newRecord = {
      id: Date.now(),
      title: form.title.trim(),
      amount: Number(form.amount),
      type: form.type,
    };

    setRecords([...records, newRecord]);
    setForm({ title: "", amount: "", type: "income" });
    setError("");
  };

  const deleteRecord = (id) => {
    setRecords(records.filter((r) => r.id !== id));
  };

  // Derived state: calculated from records, not stored
  const totalIncome = records
    .filter((r) => r.type === "income")
    .reduce((sum, r) => sum + r.amount, 0);

  const totalExpense = records
    .filter((r) => r.type === "expense")
    .reduce((sum, r) => sum + r.amount, 0);

  const balance = totalIncome - totalExpense;

  const visibleRecords =
    filter === "all" ? records : records.filter((r) => r.type === filter);

  return (
    <div className="expense">
      <h2>Expense Tracker</h2>

      <div className="summary">
        <div className="summary-box income">
          <span>Income</span>
          <strong>₹{totalIncome}</strong>
        </div>
        <div className="summary-box expense-box">
          <span>Expense</span>
          <strong>₹{totalExpense}</strong>
        </div>
        <div className="summary-box balance">
          <span>Balance</span>
          <strong>₹{balance}</strong>
        </div>
      </div>

      <form className="expense-form" onSubmit={addRecord}>
        <input
          type="text"
          name="title"
          placeholder="Title (e.g. Salary, Food)"
          value={form.title}
          onChange={handleChange}
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
        />
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button type="submit">Add</button>
      </form>
      {error && <p className="expense-error">{error}</p>}

      <div className="expense-filters">
        {["all", "income", "expense"].map((f) => (
          <button
            key={f}
            className={filter === f ? "tab active" : "tab"}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {visibleRecords.length === 0 ? (
        <p className="expense-empty">No records to show.</p>
      ) : (
        <ul className="expense-list">
          {visibleRecords.map((r) => (
            <li key={r.id} className={`expense-item ${r.type}`}>
              <span>{r.title}</span>
              <span>
                {r.type === "income" ? "+" : "-"}₹{r.amount}
              </span>
              <button onClick={() => deleteRecord(r.id)}>✕</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExpenseTracker;