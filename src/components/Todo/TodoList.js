import React, { useContext } from "react";

import { TodoContext } from "./context";

function TodoList() {
  const { todos, dispatch } = useContext(TodoContext);

  return (
    <>
      <ul style={{ listStyle: "none" }}>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.completed && "line-through" }}
              onClick={() => dispatch({ type: "TOGGLE_COMPLETE", id: todo.id })}
            >
              {todo.task}
            </span>
            <button
              type="button"
              onClick={() => dispatch({ type: "REMOVE", id: todo.id })}
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
      {todos.length ? (
        <button type="button" onClick={() => dispatch({ type: "CLEAR_ALL" })}>
          Clear All
        </button>
      ) : (
        <div>Let's add new task...</div>
      )}
    </>
  );
}

export default TodoList;
