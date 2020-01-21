import React from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom';
import Menu from './components/Menu.js';
import Favorites from './Favorites.js';

function App() {
  
 
  return (
    <Router>
    <div>
      <Menu/>
        <Switch>
          <Route exact path='/'/>
          <Route path='/favorites' component={() => <Favorites/>}/>
        </Switch>
   
    </div>
    </Router>
  );
}

export default App;
