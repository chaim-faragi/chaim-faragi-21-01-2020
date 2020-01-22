import React from 'react'
import './City.css';

export default function City(props) {
    return (
        <div className="City">
            <div>{props.city.name}</div>
            <div>{props.city.temperature}</div>
            <div>{props.city.description}</div>

        </div>
    )
}
