import { useState } from "react";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newTodo = { id: Date.now(), text: text.trim(), done: false };
    setTodos([...todos, newTodo]);
    setText("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div className="todo">
      <h2>Todo List</h2>

      <form className="todo-form" onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Add a task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {todos.length === 0 ? (
        <p className="todo-empty">No tasks yet. Add one above.</p>
      ) : (
        <ul className="todo-list">
          {todos.map((t) => (
            <li key={t.id} className={t.done ? "todo-item done" : "todo-item"}>
              <span onClick={() => toggleTodo(t.id)}>{t.text}</span>
              <button onClick={() => deleteTodo(t.id)}>✕</button>
            </li>
          ))}
        </ul>
      )}

      <p className="todo-count">
        {todos.filter((t) => !t.done).length} task(s) left
      </p>
    </div>
  );
}

export default Todo;