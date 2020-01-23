import React, {Component} from 'react'
import {withRouter, Route} from 'react-router-dom';
import axios from 'axios';

import City from '../components/City'
import ForecastDay from '../components/ForecastDay';
import './Search.css'


 class Search extends Component{

    state={
        cities:[],
        searchText:'',
        selectedCity: {
        key: "215854",
        name: "Tel Aviv",
        description: null,
        temperature: null
        },        
        forecast: {
            description: ''
        },
        days: [],
        hasError: false
    }

    componentDidMount(){
        console.log(this.props.location);
        if(this.props.location){
            const params = new URLSearchParams(this.props.location.search);
            if(this.props.cities[params.get('idx')]){
                const city = this.props.cities[params.get('idx')];
                this.setSelectedCity(city);
            }else{
                this.selectedCityHandler();
            }
            
            
        }
        
    }

    setSelectedCity = (city) => {
        this.setState({selectedCity: city});
        this.selectedCityHandler();
    }

    searchCityHandler = (event) => {
        let searchText = event.target.value;
        this.setState({searchText: searchText});
    
        if(searchText.length > 2){
          let req = this.searchCityRequestBuilder(searchText);
          this.httpRequest(req, this.searchResultHandler);
        }
    }

    searchCityRequestBuilder = (cityPrefix) => {
        let path = "http://dataservice.accuweather.com/locations/v1/cities/autocomplete?";
        let key = 'apikey=' + this.props.apiKey;
        let q = '&q=' + cityPrefix;
        let language = '&language=en-us';
    
        return path + key + q + language;
    }

    searchResultHandler = (data) => {
        let cities = data.map( c => {
            return {
                key: c.Key,
                name: c.LocalizedName,
                description: '',
                temperature: ''
            }
            });
            this.setState({cities: cities});
    }
      
    httpRequest = (req, handler) =>{
        axios.get(req)
            .then(response => {
                handler(response.data);
            })
            .catch(error =>{
                console.log(error)
                this.setState({hasError: true})
            });
    }

    selectedCityHandler = () => {
        if(!this.state.selectedCity){
            return;
        }
        let request = this.forcastsRequestBuilder(this.state.selectedCity.key);
        this.httpRequest(request, this.forecastsResponseHandler)
    }

    forcastsRequestBuilder = (cityKey) => {
        let path = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/" + cityKey + "?";
        let key = 'apikey=' + this.props.apiKey;
        let language = '&language=en-us';
        let details = '&details=false';
        let metric = '&metric=true';
        return path + key + language + details + metric;
    }

    forecastsResponseHandler = (forecasts) => {
        // console.log(forecasts);
        let forecast = {
          description: forecasts.Headline.Text
        }
        this.setState({forecast: forecast});

        const days = forecasts.DailyForecasts.map( forecast => {
          return {
            date: forecast.Date,
            min: forecast.Temperature.Minimum.Value,
            max: forecast.Temperature.Maximum.Value
          } 
        });
    
        this.setState({days: days})
    }


    render(){
        let favoriteAction = '';
        let foundCity = null;
        foundCity = this.props.cities.find( c => c.key === this.state.selectedCity.key);
        if(foundCity){
            favoriteAction = <button onClick={() => this.props.removeCity(this.state.selectedCity)} style={{float: 'right'}}>Remove</button>;
        }else{
            if( this.props.cities.length > 5){
                favoriteAction = <div>Only 5 favorites are allowed</div>
            }else{
                favoriteAction = <button onClick={() => this.props.addCity(this.state.selectedCity)} style={{float: 'right'}}>Add</button>
            }
            
        }
        
        let searchResult = <div>please search cities</div>;
        if(this.state.hasError){
            searchResult = <div>Server error, please ty again later</div>;
        }else if(this.state.cities.length > 0){
            searchResult = this.state.cities.map( (city, index) => {
                return <div title="click to show details" onClick={() => this.setSelectedCity(city)} style={{cursor: 'pointer'}} key={index}><City city={city}/></div>
            });
        }
        let forecastDays = '';
        if(this.state.days.length > 0){
            forecastDays = this.state.days.map( (day, index) => {
            return <div key={index} className="selectedCity"><ForecastDay day={day}/></div>;
          });
        }        
        return (
            <div>
                <label>Search cities: <input type="search" placeholder="Search city" results="0" onChange={this.searchCityHandler}/> </label>
                <div className="SearchResult">
                    {searchResult} 
                </div>
                <hr/>
                {favoriteAction}
                <div className="selectedCity">
                    <div className="selectedCityData"><City city={this.state.selectedCity}/></div>
                </div>
                <div>
                </div>
                
                <h2 style={{textAlign: 'center', fontSize: '3vw', margin: '15vw'}}>{this.state.forecast.description}</h2>
                <div className="Forecasts">
                    {forecastDays} 
                </div>
            </div>

        );
    }
}

export default withRouter(Search);
