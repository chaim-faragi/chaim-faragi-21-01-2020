import React, {Component} from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import './App.css';
import Menu from './components/Menu.js';
import Favorites from './Favorites.js';


let apiKey = "9aowguidjMWF2bx16ATpLrWWC6HKfSIl";


class App extends Component{

  state={
    cities:[],
    searchText: ''
  }

  searchCityHandler = (event) =>{
    this.setState({searchText: event.target.value});
    console.log(this.state.searchText.length);

    if(this.state.searchText.length >= 2){
      let req = this.citySearchRequestBuilder(this.state.searchText);
      this.httpRequest(req);
    }
  }

  httpRequest = (request) =>{    
    axios.get(request).then(response => {
      console.log(response);

    })
    .catch(error =>{
        console.log(error)
    });
  }  

  citySearchRequestBuilder = (cityName) =>{
    let citySearch = "http://dataservice.accuweather.com/locations/v1/cities/autocomplete?";
    let key = 'apikey=' + apiKey;
    let q = '&q=' + cityName;
    let language = '&language=en-us';

    return citySearch + key + q + language;
  }

  currentConditionsRequestBuilder = (locationKey) => {
    let citySearch = "http://dataservice.accuweather.com/currentconditions/v1/" + locationKey + "?";
    let key = 'apikey=' + apiKey;
    let language = '&language=en-us';
    let details = '&details=false'

    return citySearch + key + language + details;
  }

  render(){
    return (
      <Router>
      <div>
        <Menu/>
        <input type="text" onChange={this.searchCityHandler}/>
          <Switch>
            <Route exact path='/'/>
            <Route path='/favorites' component={() => <Favorites httpReq={this.httpRequest} getWeather={this.currentConditionsRequestBuilder}/>}/>
          </Switch>
    
      </div>
      </Router>
    );
  }

}

export default App;
