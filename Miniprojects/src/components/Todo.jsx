
import { useState, useEffect } from "react";

function Todo() {

  // Load previously saved todos from localStorage
  const [todos, setTodos] = useState(() => {
    try {
      const savedTodos = localStorage.getItem("todos");
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error) {
      console.error("Error loading todos:", error);
      return [];
    }
  });

  const [text, setText] = useState("");

  // Save todos whenever the list changes
  useEffect(() => {
    try {
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch (error) {
      console.error("Error saving todos:", error);
    }
  }, [todos]);

  // Add a new todo
  const addTodo = (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      done: false
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setText("");
  };

  // Mark todo as completed or incomplete
  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, done: !todo.done }
          : todo
      )
    );
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo.id !== id)
    );
  };

  // Delete all completed todos
  const clearCompleted = () => {
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => !todo.done)
    );
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

        <button type="submit">
          Add
        </button>

      </form>

      {todos.length === 0 ? (

        <p className="todo-empty">
          No tasks yet. Add one above.
        </p>

      ) : (

        <ul className="todo-list">

          {todos.map((todo) => (

            <li
              key={todo.id}
              className={
                todo.done
                  ? "todo-item done"
                  : "todo-item"
              }
            >

              <span onClick={() => toggleTodo(todo.id)}>
                {todo.text}
              </span>

              <button
                type="button"
                onClick={() => deleteTodo(todo.id)}
                aria-label={`Delete ${todo.text}`}
              >
                ✕
              </button>

            </li>

          ))}

        </ul>

      )}

      <p className="todo-count">
        {todos.filter((todo) => !todo.done).length} task(s) left
      </p>

      {todos.some((todo) => todo.done) && (

        <button
          type="button"
          onClick={clearCompleted}
        >
          Clear Completed
        </button>

      )}

    </div>
  );
}

export default Todo;
