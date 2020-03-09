import React, { useState } from "react";

const initialState = [
  { id: 1, task: "Learn ReactJS", completed: false },
  { id: 2, task: "Learn GraphQL", completed: false },
  { id: 3, task: "Learn RustLang", completed: false }
];

function TodoList() {
  const [todos, setTodos] = useState(initialState);
  const [task, setTask] = useState("");

  const addTodo = task => {
    const newTask = [
      ...todos,
      {
        id: todos.length + 1,
        task,
        completed: false
      }
    ];
    setTodos(newTask);
  };

  const removeTodo = id => {
    const filterTodos = todos.filter(todo => todo.id !== id);
    setTodos(filterTodos);
  };

  const toggleComplete = id => {
    const filterComplete = todos.filter(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(filterComplete);
  };

  const deleteAll = () => setTodos([]);

  const onChange = e => {
    setTask(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    setTask("");
    if (task) {
      return addTodo(task);
    }
  };

  console.log(JSON.stringify(todos, null, 2));
  return (
    <div>
      <h1>TodoList</h1>
      <form onSubmit={onSubmit}>
        <label>
          Task:
          <input value={task} onChange={onChange} />
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
      {todos.length !== 0 ? (
        <button type="button" onClick={deleteAll}>
          Delete All
        </button>
      ) : (
        <div>Let's create new task...</div>
      )}
    </div>
  );
}

export default TodoList;
