import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserForm from './Components/Form';
import Users from './Components/Users';




function App() {
  return (
    <div className="App">
    <UserForm />
    {/* <Users 
      users={users}/> */}
    </div>
  );
}

export default App;
