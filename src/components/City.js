import React from 'react'

export default function City(props) {
    return (
        <div>
<div>{props.city.name}</div>
<div>{props.city.degree}</div>
<div>{props.city.description}</div>

        </div>
    )
}
