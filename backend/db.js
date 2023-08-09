const mongoose = require('mongoose');

// Connection URL
// const url = 'mongodb+srv://gurnanivansh57:iz64rqtBBQss8iQ7@cluster101.nuwewcc.mongodb.net/tododb?retryWrites=true&w=majority';
// const url = process.env.MONGODB_URL;
const url='mongodb://localhost:27017';
const dbName = 'tododb';
const collectionName = 'todos';
const collection='Signup';

// Connect to the MongoDB server
mongoose.connect(`${url}/${dbName}`, { 
  
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  writeConcern: {
    w: 'majority'
  }

})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Define a schema for the todo items
const todoSchema = new mongoose.Schema({
  item: String
});

const UserSchema=new mongoose.Schema({
  fname:{
    type: String,
    required: true
  },
  lname:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true,
    minlength: 8
  }

})

// Create a Mongoose model for the todos collection
const Todo = mongoose.model('Todo', todoSchema, collectionName);

const user=mongoose.model('User',UserSchema,collection);

// Export the mongoose connection and Todo model
module.exports = {
  mongoose: mongoose,
  Todo: Todo,
  user:user
};
