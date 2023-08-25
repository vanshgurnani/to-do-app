import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    fetchTodoItems();

    const interval = setInterval(() => {
      fetchTodoItems();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchTodoItems = async () => {
    try {
      const apiUrl = 'http://localhost:5000/todo/find'; // Replace with your API URL

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch todo items');
      }

      const data = await response.json();
      setTodoItems(data);
    } catch (error) {
      console.error('Error fetching todo items:', error);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      const apiUrl = `http://localhost:5000/todo/${itemId}`; // Use the correct API URL

      const response = await fetch(apiUrl, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete the task');
      }

      // Update the todoItems state by removing the deleted task
      setTodoItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
      <ul>
        {todoItems.map((item) => (
          <li key={item._id}>
            {item.item}
            <button type="button" onClick={() => handleDelete(item._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
