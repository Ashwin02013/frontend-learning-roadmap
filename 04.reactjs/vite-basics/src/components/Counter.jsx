

import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState("light");

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <div className={`display-container ${theme}`}>
      <button className="theme-button" onClick={toggleTheme}>
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>

      <p className="count-display">{count}</p>

      <div>
        <button className="Counter-button" onClick={decrement}>Decrement</button>
        <button className="Counter-button" onClick={reset}>Reset</button>
        <button className="Counter-button" onClick={increment}>Increment</button>
      </div>
    </div>
  );
}

export default Counter;


