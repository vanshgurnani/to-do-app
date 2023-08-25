import React, { useState, useEffect } from 'react';
import Todo from './to-do';
import Get from './get';
import Navbar from './navbar';
import './todo.css';

const TodoList = () => {
  return (
    <>
      <Navbar  /> 
      <div className='body-todo'> 
        <div className='card-todo'>
          <Todo />
          <Get />
        </div>
      </div>
    </>
  );
};

export default TodoList;
