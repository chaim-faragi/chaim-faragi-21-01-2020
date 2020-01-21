import React, { Component } from 'react';
import City from './components/City';

export default class Favorites extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             cities: [{name: 'Petah Tikva', degree: 22, description: 'rains a bit'},
             {name: 'Ramat Gan', degree: 12, description: 'rains a lot'}]
        }
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
                return <div><City key={index} city={city}/></div>
            });
        }

        return (
            <div>
                {favCities}
            </div>
        )
    }
}
