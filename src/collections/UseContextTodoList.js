import React, { useRef, useReducer, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

const initialState = [
  { id: uuidv4(), task: "Learn ReactJS", completed: false },
  { id: uuidv4(), task: "Learn GraphQL", completed: false },
  { id: uuidv4(), task: "Learn Rust", completed: false }
];

const TodoContext = React.createContext();

function reducer(todos, action) {
  switch (action.type) {
    case "ADD":
      return [...todos, { id: uuidv4(), task: action.task, completed: false }];
    case "TOGGLE_COMPLETE":
      return todos.filter(todo => {
        if (todo.id === action.id) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
    case "REMOVE":
      return todos.filter(todo => todo.id !== action.id);
    case "CLEAR_ALL":
      return [];
    default:
      throw new Error();
  }
}

export default function Todo() {
  const [todos, dispatch] = useReducer(reducer, initialState);
  const inputRef = useRef();

  const onSubmit = e => {
    e.preventDefault();
    dispatch({ type: "ADD", task: inputRef.current.value });
    inputRef.current.value = "";
  };

  console.log(JSON.stringify(todos, null, 2));
  return (
    <TodoContext.Provider value={{ inputRef, onSubmit, todos, dispatch }}>
      <h1>Todo List</h1>
      <TodoInput />
      <TodoList />
    </TodoContext.Provider>
  );
}

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
