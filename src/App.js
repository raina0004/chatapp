import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Component/Navbar/index'; 
import AddUser from './Pages/addUser'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
       
      </div>
    </Router>
  );
}

export default App;
