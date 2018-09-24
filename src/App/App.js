import React from 'react';
import logo from '../assets/images/logo.png';
import Dashboard from '../Dashboard';

import './App.css';

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">OpenOceanStudio: Crew Applications</h1>
    </header>
    <Dashboard />
  </div>
);

export default App;
