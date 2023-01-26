import React from "react";
import { Link } from 'react-router-dom'

export default function Navbar(props) {

    const {logout} = props

    const link = {
        textDecoration: 'none',
        color: "white",
        padding: "10px",
        borderRadius: "5px",
        background: 'rgb(90, 90, 90)',
        fontWeight: 'bold',
        fontSize: 'medium',
        border: "none"
    }

    return (
        <div className="navbar">
            <Link style ={link} to='/profile'>Home</Link>
            <Link style ={link} to='/public'>Public Stories</Link>
            <button style={link} onClick={logout}>Log Out</button>
        </div>
    )
}