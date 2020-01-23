import React from 'react'
import './City.css';

export default function City(props) {
    return (
        <div className="City">
            <h4>{props.city.name}</h4>
            <p>{props.city.temperature}</p>
            <p>{props.city.description}</p>
        </div>
    )
}
