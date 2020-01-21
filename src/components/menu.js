import React from 'react'
import {BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom';


export default function Menu() {
    return (
        <div>

        <Link to ='/'>home</Link><br/>
        <Link to ='/favorites'>favorites</Link>
   
    </div>
    )
}
