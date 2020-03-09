import React, { useRef, useReducer } from "react";

const initialState = [
  { id: 1, task: "Learn JavaScript", completed: false },
  { id: 2, task: "Learn ReactJS", completed: false },
  { id: 3, task: "Learn GraphQL", completed: false }
];

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        { id: state.length + 1, task: action.task, completed: false }
      ];
    case "TOGGLE_COMPLETE":
      return state.filter(todo => {
        if (todo.id === action.id) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
    case "REMOVE":
      return state.filter(todo => todo.id !== action.id);
    case "DELETE_ALL":
      return [];
    default:
      throw new Error();
  }
}

function TodoList() {
  const inputRef = useRef();
  const [todos, dispatch] = useReducer(reducer, initialState);

  const addTodo = task => dispatch({ type: "ADD", task });
  const toggleComplete = id => dispatch({ type: "TOGGLE_COMPLETE", id });
  const removeTodo = id => dispatch({ type: "REMOVE", id });
  const deleteAll = () => dispatch({ type: "DELETE_ALL" });

  const onSubmit = e => {
    e.preventDefault();
    addTodo(inputRef.current.value);
    inputRef.current.value = "";
  };

  console.log(JSON.stringify(todos, null, 2));
  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={onSubmit}>
        <label>
          Task:
          <input ref={inputRef} />
        </label>
        <button type="submit">Add New Task</button>
      </form>
      <div>
        <ul style={{ listStyle: "none" }}>
          {todos.map(todo => (
            <li key={todo.id}>
              <span
                style={{ textDecoration: todo.completed && "line-through" }}
                onClick={() => toggleComplete(todo.id)}
              >
                {todo.task}
              </span>
              <button type="button" onClick={() => removeTodo(todo.id)}>
                &times;
              </button>
            </li>
          ))}
        </ul>
      </div>
      {todos.length === 0 ? (
        <div>Let's add new task...</div>
      ) : (
        <button type="button" onClick={deleteAll}>
          Delete All
        </button>
      )}
    </div>
  );
}

export default TodoList;
