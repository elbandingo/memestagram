import React from "react";
import NavBar from './components/Navbar';
import './App.css';
import { render } from "react-dom";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/screens/Home'
import Login from './components/screens/Login'
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup'

function App() {
  return (
    <Router>
      <NavBar />
<Routes>
  <Route exact path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/profile" element={<Profile />} />
</Routes>
</Router>

  );
}

export default App;
