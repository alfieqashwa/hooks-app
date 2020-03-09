import React, { Fragment, useRef, useReducer } from "react";

import { TodoContext } from "./context";
import { initialState } from "./initialState.js";
import { reducer } from "./reducer";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

export default () => {
  const [todos, dispatch] = useReducer(reducer, initialState);
  const inputRef = useRef();

  const onSubmit = e => {
    e.preventDefault();
    dispatch({ type: "ADD", task: inputRef.current.value });
    inputRef.current.value = "";
  };

  console.log(JSON.stringify(todos, null, 2));
  return (
    <Fragment>
      <h1>Todo List</h1>
      <TodoContext.Provider value={{ inputRef, onSubmit, todos, dispatch }}>
        <TodoInput />
        <TodoList />
      </TodoContext.Provider>
    </Fragment>
  );
};
