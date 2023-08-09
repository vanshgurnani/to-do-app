import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react';
import Register from '../src/components/register';
import Login from '../src/components/login';
import To from '../src/components/todo';

function App() {
  return (
    <Router>
      <Routes>
      <Route exact path='' element={<Login />}/>
        <Route exact path='/register' element={<Register />}/>
        <Route exact path='/todo' element={<To />}/>
      </Routes>
    </Router>
  );
}

export default App;
