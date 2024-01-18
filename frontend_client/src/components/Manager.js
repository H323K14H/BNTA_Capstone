import React from 'react'
import { useNavigate } from 'react-router-dom'

const Manager = ({ onButtonClick, listOfAddresses, getAllAddresses }) => {

    const generateListOfAddresses = listOfAddresses.map((address) => {
        return <li>{address.name}</li>
    })

    const navigate = useNavigate();

    return (
        <>
            <ul>
                {generateListOfAddresses}
            </ul>
            <button onClick={() => onButtonClick(navigate("/home"))}>Generate route</button>
        </>
    )
}

export default Manager