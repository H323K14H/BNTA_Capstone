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

                <a id="home" className="menu-item" href="/map-page">My Route</a>
                <ul>
                    <p>List of addresses:</p>
                    {addresses}

                </ul>

            </Menu>
        </>
    )
}
export default NavBar