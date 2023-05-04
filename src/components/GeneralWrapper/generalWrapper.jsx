import React, { useState } from 'react';
import styles from "./generalWrapper.module.css";
import { BsFillTrashFill } from "react-icons/bs";
import {BsCheckSquareFill} from "react-icons/bs"

export function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      setTodos([...todos, inputValue]);
      setInputValue('');
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className={styles.title}>
      <h1>To do List</h1>
      <TodoForm onSubmit={handleFormSubmit} value={inputValue} onChange={handleInputChange} />
      <TodoItems todos={todos} onDelete={handleDeleteTodo} />
    </div>
  );
}


function TodoForm({ onSubmit, value, onChange }) {
  return (
    <form onSubmit={onSubmit} className={styles.nuevaTarea}>
      <input type="text" value={value} onChange={onChange} placeholder='Ingrese una nueva tarea'/>
      <button type="submit">Add</button>
    </form>
  );
}

function TodoItems({ todos, onDelete }) {
  
  return (
    <ul className={styles.lista}>
      {todos.map((todo, index) => (
        <TodoItem key={index} index={index} todo={todo} onDelete={onDelete} />
      ))}
    </ul>
  );
}

function TodoItem({ index, todo, onDelete }) {
  const handleDeleteClick = () => {
    onDelete(index);
  };


  return (
    <li className={styles.tarea}>
        {todo}
      <div className={styles.btn}>
        <button onClick={handleDeleteClick} className={styles.deleteBtn}>
          <BsFillTrashFill size={20}/>
        </button>
        <button onClick={handleDeleteClick} className={styles.checkBtn}>
          <BsCheckSquareFill size={20}/>
        </button>
      </div>
      
    </li>
  );
}
