import { useState } from "react";
import Card from "./components/Card";
import Counter from "./components/Counter";
import Todo from "./components/Todo";
import ExpenseTracker from "./components/Expensetracker";
import UserDirectory from "./components/UserDirectory";
import MiniDashboard from "./components/MiniDashboard";

const projects = [
  { id: 1, name: "Card" },
  { id: 2, name: "Counter" },
  { id: 3, name: "Todo" },
  { id: 4, name: "Expense Tracker" },
  { id: 5, name: "User Directory" },
  { id: 6, name: "Mini Dashboard" },
];

export default function App() {
  const [active, setActive] = useState("Card");

  return (
    <>
      <div>
        {projects.map((p) => (
          <button
            key={p.id}
            className={active === p.name ? "tab active" : "tab"}
            onClick={() => setActive(p.name)}
          >
            {p.name}
          </button>
        ))}
      </div>

      {active === "Card" && <Card />}
      {active === "Counter" && <Counter />}
      {active === "Todo" && <Todo />}
      {active === "Expense Tracker" && <ExpenseTracker />}
      {active === "User Directory" && <UserDirectory />}
      {active === "Mini Dashboard" && <MiniDashboard />}
    </>
  );
}