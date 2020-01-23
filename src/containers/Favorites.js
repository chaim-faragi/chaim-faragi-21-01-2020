import React, { Component } from 'react';
import axios from 'axios';

import City from '../components/City';
import './Favories.css';

export default class Favorites extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             hasError: false,
             cities: [],        
        }
    }

    componentDidMount () {
        this.setState({cities: []});
        if(this.props.cities.length === 0){
            return;
        }

        for(let city of this.props.cities){
            let req = this.props.getWeather(city.key)
            this.httpRequest(req, city);
        }
    }

    httpRequest = (request, city) =>{
        
        axios.get(request).then(response => {
          console.log(response);
          let weatherData = response.data[0];
          console.log(weatherData);
          city.temperature = weatherData.Temperature.Metric.Value;
          city.description = weatherData.WeatherText;
          let cityPos = this.props.cities.findIndex(c => c.key === city.key);
          const cities = this.state.cities.slice();
          cities.push(city);
          this.setState({cities: cities});
        })
        .catch(error =>{
            console.log(error)
            this.setState({hasError: true})
        });
      }    


    render() {
        let favCities = <td>please add cities to favorites</td>;
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
