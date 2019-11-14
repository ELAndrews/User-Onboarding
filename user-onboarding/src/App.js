import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import UserForm from './Components/Form';



function App() {

  const [usersArray, setUsersArray] = useState([]);

  return (
    <div className="App">
    <UserForm 
    usersArray={usersArray}
    setUsersArray={setUsersArray}/>
    </div>
  );
}

export default App;
