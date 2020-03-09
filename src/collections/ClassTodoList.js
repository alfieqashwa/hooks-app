import React, { Component } from "react";

const initialState = [
  { id: 1, task: "Learn ReactJS", completed: false },
  { id: 2, task: "Learn GraphQL", completed: false },
  { id: 3, task: "Learn RustLang", completed: false }
];

class TodoList extends Component {
  state = {
    task: "",
    todos: initialState
  };

  addTodo = task => {
    const newTask = [
      ...this.state.todos,
      {
        id: this.state.todos.length + 1,
        task,
        completed: false
      }
    ];
    this.setState({ todos: newTask });
  };

  removeTodo = id => {
    const filterTodos = this.state.todos.filter(todo => todo.id !== id);
    this.setState({ todos: filterTodos });
  };

  toggleComplete = id => {
    const filterComplete = this.state.todos.filter(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });

    this.setState({ todos: filterComplete });
  };

  deleteAll = () => this.setState({ todos: [] });

  onChange = e => {
    this.setState({ task: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({ task: "" });
    if (this.state.task) {
      return this.addTodo(this.state.task);
    }
  };

  render() {
    const { task, todos } = this.state;
    const { onChange, onSubmit, removeTodo, deleteAll, toggleComplete } = this;

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
}

export default TodoList;
