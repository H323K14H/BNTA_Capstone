import React, { useState } from 'react'
import { slide as Menu } from 'react-burger-menu'
import { FiHome } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from 'react-router-dom';

const NavBar = () => {

    return (
        <>
            <Menu>
                <a id="home" className="menu-item" href="/">Home</a>
                <a id="about" className="menu-item" href="/about">About</a>
                <a id="contact" className="menu-item" href="/contact">Contact</a>
            </Menu>
        </>
    )
}
export default NavBar