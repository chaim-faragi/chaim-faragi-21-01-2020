import React from 'react'
import './City.css';

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export default function ForecastDay(props) {
    return (
        <div className="City">
            <div>{ dayNames[new Date(props.day.date).getDay()] }</div>
            <div>Min: {props.day.min} c</div>
            <div>Max: {props.day.max} c</div>

        </div>
    )
}
