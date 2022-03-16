import React from "react";
import NavBar from './components/Navbar';
import './App.css';
import { render } from "react-dom";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './components/screens/Home'
//import Login from './components/screens/Login'
//import Profile from './components/screens/Profile'
//import Signup from './components/screens/Signup'

function App() {
  return (
    <NavBar />

  );
}

export default App;
