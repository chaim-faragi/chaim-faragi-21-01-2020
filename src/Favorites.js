import React, { Component } from 'react';
import axios from 'axios';

import City from './components/City';
import './Favories.css';

export default class Favorites extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             cities: [
                {
                    key: "215854",
                    name: "Tel Aviv",
                    description: null,
                    temperature: null
                },
                {
                    key: "215849",
                    name: "Ramat Gan",
                    description: null,
                    temperature: null
                }

             ],
             hasError: false
        }
    }

    componentDidMount () {
        
        if(this.state.cities.length === 0){
            return;
        }

        for(let city of this.state.cities){
            let req = this.props.getWeather(city.key)
            // console.log(req);
            this.httpRequest(req, city);
        }
    }

    httpRequest = (request, city) =>{
        //'http://jsonplaceholder.typicode.com/posts' - for practice
        
        axios.get(request).then(response => {
          console.log(response);
          let weatherData = response.data[0];
          console.log(weatherData);
          city.temperature = weatherData.Temperature.Metric.Value;
          city.description = weatherData.WeatherText;
          let cityPos = this.state.cities.findIndex(c => c.key === city.key);
          const cities = this.state.cities.splice(cityPos, 1);
          cities.push(city);
          this.setState({cities: [...cities]});
        })
        .catch(error =>{
            console.log(error)
            this.setState({hasError: true})
        });
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
            if(cities[c].name === city.name){
                idx = c;
            }
        }
        if(idx === -1){
            return;
        }
        cities.splice(idx, 1);
        this.setState({cities: cities});
        
    }

    render() {
        let favCities = <div>please add cities to favorites</div>;
        if(this.state.cities.length > 0){
            favCities = this.state.cities.map( (city, index) => {
                return <td key={index}><City city={city}/></td>
            });
        }

        return (
            <table border="0">
            <tbody>
                <tr>
                {favCities}
                </tr>
            </tbody>
            </table>
        )
    }
}
