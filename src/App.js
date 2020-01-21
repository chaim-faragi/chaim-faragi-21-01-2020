import React, { useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom';
import menu from './components/menu.js';

function App() {
  
  // ***** firstchanel *****
  const [firstarr,setfirstarr]=useState([{info:'aaa'},{info:'bbb'},{info:'ccc'}]);

  const addInfo = (info)=>{
    setfirstarr([...firstarr, {info: info}]);
  }

  const newWindow = () =>{
    window.open('http://localhost:3000/thirdchanel');
  }
  return (
    <Router>
    <div>
        <h2>Example Title</h2>
        <Link to ='/'>home</Link><br/>
        <Link to ='/firstchanel'>first chanel</Link>
        <hr/>
        <Switch>
          <Route exact path='/'/>
          
        </Switch>
   
    </div>
    </Router>
  );
}

export default App;
