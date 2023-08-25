import React, { useState } from 'react';

const TodoForm = () => {
  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = 'http://localhost:5000/todo'; // Replace with your API URL

      if (!newTask.trim()) {
        return; // Prevent submitting an empty task
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ item: newTask }),
      });

      if (!response.ok) {
        throw new Error('Failed to add task');
      }

      // Clear the input field after successful addition
      setNewTask('');
      setError(''); // Reset any previous error
    } catch (error) {
      console.error('Error adding task:', error);
      setError('Failed to add the task. Please try again.'); // Set the error message
    }
  };

  return (
    <>
    <h1>To-do List</h1>
    <form onSubmit={handleFormSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        className='m-3'
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter the new Task"
        autoComplete="off"
      />
      <button type="submit">Add</button>
    </form>
    </>
  );
};

export default TodoForm;
