import React, { useContext } from "react";
import { TodoContext } from "./context";

function TodoInput() {
  const { inputRef, onSubmit } = useContext(TodoContext);

  return (
    <form onSubmit={onSubmit}>
      <label>
        Task:
        <input ref={inputRef} />
      </label>
      <button type="submit">Add New Task</button>
    </form>
  );
}

export default TodoInput;
