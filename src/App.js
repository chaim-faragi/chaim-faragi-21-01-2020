import React, {Component} from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import './App.css';
import Menu from './components/Menu.js';
import Favorites from './containers/Favorites';
import Search  from './containers/Search';


let apiKey = "yGXEWAyUIoI63BgAB367EgF1AoHZaBAk";
//9aowguidjMWF2bx16ATpLrWWC6HKfSIl


class App extends Component{

  state={
    cities: [],

  }

  addCityHandler = (city) =>{
    const cities = this.state.cities.slice();
    cities.push(city);
    this.setState({cities: cities});
  }

  removeCityHandler = (city) =>{
    const cities = this.state.cities.slice();
    let idx = -1;
    for(let c of cities){
        if(cities[c].key === city.key){
            idx = c;
        }
    }
    if(idx === -1){
        return;
    }
    cities.splice(idx, 1);
    this.setState({cities: cities});
      
  }

  cityWeatherRequestBuilder = (locationKey) => {
    let path = "http://dataservice.accuweather.com/currentconditions/v1/" + locationKey + "?";
    let key = 'apikey=' + apiKey;
    let language = '&language=en-us';
    let details = '&details=false'

    return path + key + language + details;
  }

  updateFavorites = (cities) => {
    this.setState({cities: cities});
  }


  render(){

    return (
      <Router>
      <div>
        <Menu/>
        <hr/>
          <Switch>
            <Route path='/favorites' component={() => <Favorites cities={this.state.cities} getWeather={this.cityWeatherRequestBuilder}/>}/>
            <Route path='/' exact component={() => <Search apiKey={apiKey} cities={this.state.cities} httpReq={this.httpRequest} getWeather={this.cityWeatherRequestBuilder} addCity={this.addCityHandler} removeCity={this.removeCityHandler} />}/>
          </Switch>
    
      </div>
      </Router>
    );
  }

}

export default App;
