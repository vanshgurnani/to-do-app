//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt=require("bcrypt");
const { Todo,user } = require('./db.js');


const app = express();


app.set('view engine',"ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.get("/loginin", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

app.get("/todo", async function(req, res) {
  try {
    const allTodos = await Todo.find(); // Fetch all todo items from the database
    let today = new Date();
    let option = {
      weekday: "long",
      day: "numeric",
      month: "long",
    };
    let day = today.toLocaleDateString("en-US", option);

    res.render("1", {
      dayk: day,
      newlist: allTodos,
    });
  } catch (err) {
    console.error('Error fetching todos:', err);
    return res.status(500).send('Error fetching todos from the database');
  }
});

//posting for siginup page


app.post('/sign',async function(req,res){
  let fname=req.body.fName;
  let lname=req.body.lName;
  let email=req.body.email;
  let password=req.body.password;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newuser=new user({
      fname:fname,
      lname:lname,
      email:email,
      password:hashedPassword
    });
    await newuser.save();
    console.log('Item inserted Successfully');
    res.redirect("/");
  } catch (err) {
    console.error('Error inserting item:', err);
    return res.status(500).send('Error inserting item into the database');
  }


});
// User Authentication

app.post('/login',async function(req, res){
  let email=req.body.email;
  let password=req.body.password;
  try {
    const foundUser = await user.findOne({ email: email});

    if (!foundUser) {
      return res.status(404).send('User not found');
    }

    const isPasswordMatch = await bcrypt.compare(password,foundUser.password);

    if (isPasswordMatch) {
      res.redirect('/todo');
    }

    else{
      return res.status(401).send('Invalid password');
    }

  } catch (err) {
    console.error('Error logging in:', err);
    return res.status(500).send('Error logging in');
  }
});


// posting for todo list

app.post("/", async function (req, res) {
  let item = req.body.newItems;

  try {
    const todo = new Todo({
      item: item
    });

    await todo.save();
    console.log('Item inserted:', item);
    res.redirect("/todo");
  } catch (err) {
    console.error('Error inserting item:', err);
    return res.status(500).send('Error inserting item into the database');
  }
});



app.post("/update", async function (req, res) {
  let itemIds = req.body.itemIds;
  let updatedItem = req.body.updatedItem;

  try {
    const updateResult = await Todo.findByIdAndUpdate(itemIds, { item: updatedItem });

    if (updateResult) {
      console.log('Item updated:', updateResult);
      res.redirect("/todo");
    } else {
      console.log('Item not found:', itemIds);
      res.status(404).send('Item not found');
    }
  } catch (err) {
    console.error('Error updating item:', err);
    return res.status(500).send('Error updating item in the database');
  }
});



app.post("/delete", async function (req, res) {
  let itemId = req.body.itemId;

  try {
    const deleteResult = await Todo.findByIdAndDelete(itemId);

    if (deleteResult) {
      console.log('Item deleted:', deleteResult);
      res.redirect("/todo");
    } else {
      console.log('Item not found:', itemId);
      res.status(404).send('Item not found');
    }
  } catch (err) {
    console.error('Error deleting item:', err);
    return res.status(500).send('Error deleting item from the database');
  }
});



app.listen(3001, function(){
  console.log("Server started on port 3001");
});
