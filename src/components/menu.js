import React from 'react'
import {NavLink} from 'react-router-dom';
import './Menu.css'

export default function Menu() {
    return (
        <table border="0" width="100%">
        <tbody>
        <tr>
            <td width= "50%"></td>
            <td><NavLink to ='/' exact className="Menu" activeStyle={{backgroundColor: 'lightblue'}}>Home</NavLink></td>
            <td><NavLink to ='/favorites' className="Menu" activeStyle={{backgroundColor: 'lightblue'}}>Favorites</NavLink></td>
        </tr>
        </tbody>
        </table>
    )
}
