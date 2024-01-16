import React, { useState } from 'react'
import { slide as Menu } from 'react-burger-menu'
import { FiHome } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from 'react-router-dom';

const NavBar = ({ route }) => {


    if (!route || !route.checkpoints) {
        return null; // Return null or handle the case when route or checkpoints is undefined
    }

    const addresses = route.checkpoints.map((address, index) => {
        return <li key={index}>{address.address}</li>
    })

    return (
        <>
            <Menu>
                <Link to="/map-page" id="home" className="menu-item">My Route </Link>
                <ul>
                    <p>List of addresses:</p>
                    {addresses}
                </ul>
                <Link to="/map-page" id="home" className="menu-item">More info </Link>
            </Menu>
        </>
    )
}
export default NavBar