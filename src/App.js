import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Component/Navbar/index'; 
import AddUser from './Pages/addUser'; 
import Register from './Pages/register';

function App() {
  let data =  localStorage.getItem('name');

  return (
    <Router>
      <div className="App">
        {
          data ? 
             <Navbar />
             :
             <Register/>

        }

       
      </div>
    </Router>
  );
}

export default App;
