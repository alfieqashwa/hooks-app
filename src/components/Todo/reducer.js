import { v4 as uuidv4 } from "uuid";

export function reducer(todos, action) {
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
