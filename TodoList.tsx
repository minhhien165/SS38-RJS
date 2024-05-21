import React, { useReducer, useState } from "react";

interface Todo {
  name: string;
  status: boolean;
  id: number;
}

export default function TodoList() {
  // Khai báo state và action
  const initialState: any = {
    todos: [],
    isloadding: false,
    todo: {
      id: 0,
      name: "",
      status: false,
    },
  };

  const reducer = (state = initialState, action: any) => {
    switch (action.type) {
      case "CHANGE_INPUT":
        return { ...state, todo: { ...state.todo, name: action.payload } };
      case "ADD_TODO":
        action.payload.id = Math.ceil(Math.random() * 9999);
        return { ...state, todos: [...state.todos, action.payload] };
      case "EDIT_TODO":
        const editedTodos = state.todos.map((todo: Todo) =>
          todo.id === action.payload.id ? action.payload : todo
        );
        return { ...state, todos: editedTodos };
      case "DELETE_TODO":
        const filteredTodos = state.todos.filter(
          (todo: Todo) => todo.id !== action.payload
        );
        return { ...state, todos: filteredTodos };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [inputValue, setInputValue] = useState("");

  // Input value
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    dispatch({ type: "CHANGE_INPUT", payload: value });
  };

  // Add todo
  const addTodo = () => {
    dispatch({ type: "ADD_TODO", payload: { ...state.todo } });
    setInputValue(""); // Làm trống ô input
  };

  // Edit todo
  const editTodo = (id: number) => {
    const editedTodo = state.todos.find((todo: Todo) => todo.id === id);
    if (editedTodo) {
      setInputValue(editedTodo.name);
      dispatch({ type: "CHANGE_INPUT", payload: editedTodo.name });
      dispatch({ type: "EDIT_TODO", payload: { ...editedTodo, name: state.todo.name } });
    }
  };

  // Delete todo
  const deleteTodo = (id: number) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  return (
    <div>
      <div className="container">
        <h1 className="titleTodo">Todo List</h1>
        <div className='input-button'>
          <input value={inputValue} onChange={handleChange} type="text" className="input"/>
          <button onClick={addTodo} className="button">Add a work</button>
        </div>
        <p className="listTitle">Work list</p>
        <ul>
          {state.todos.map((todo: Todo) => (
            <li key={todo.id}>
              {todo.name}
              <button onClick={() => editTodo(todo.id)}>Edit</button>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
