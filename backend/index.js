//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { Todo, user } = require('./db.js');

const PORT = 5000;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send("Hello World!");
});

// Endpoint to fetch a list of employees as JSON response
app.get('/api/employees', (req, res) => {
  res.json({
    "employees": [
      { "name": "John", "age": 13 },
      { "name": "yash", "age": 16 },
      { "name": "vansh", "age": 21 }
    ]
  });
});

// Endpoint to create a new todo item
app.post('/todo', async (req, res) => {
  try {
    const { item } = req.body;

    if (!item) {
      return res.status(400).json({ error: 'Task cannot be empty' });
    }

    const newTodo = new Todo({ item });
    await newTodo.save();

    res.json(newTodo);
  } catch (err) {
    console.error('Error adding todo:', err);
    res.status(500).json({ error: 'Error adding todo item' });
  }
});

// Endpoint to fetch all todo items
app.get('/todo/find', async (req, res) => {
  try {
    const allTodos = await Todo.find();
    res.json(allTodos);
  } catch (err) {
    console.error('Error fetching todos:', err);
    res.status(500).json({ error: 'Error fetching todos from the database' });
  }
});

// Endpoint to delete a todo item by ID
app.delete('/todo/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todoToDelete = await Todo.findByIdAndDelete(id);

    if (!todoToDelete) {
      return res.status(404).json({ error: 'Todo item not found' });
    }

    res.json({ message: 'Todo item deleted successfully' });
  } catch (err) {
    console.error('Error deleting todo:', err);
    res.status(500).json({ error: 'Error deleting todo item' });
  }
});


// Endpoint to register a new user
app.post('/api/sign', async (req, res) => {
  const { fName, lName, email, password } = req.body;

  try {
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new user({
      fname: fName,
      lname: lName,
      email,
      password: hashedPassword
    });

    await newUser.save();
    console.log('User registered successfully');
    res.sendStatus(200);
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Endpoint to handle user login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundUser = await user.findOne({ email });
    if (!foundUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (passwordMatch) {
      return res.json({ name: foundUser.fname });
    } else {
      return res.status(401).json({ error: 'Invalid login credentials' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Error during login' });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
