
import "leaflet/dist/leaflet.css";
import MapComponent from "../components/MapComponent";
import { useState } from "react";


const AppContainer = () => {

    const [optimizedRoute, setOptimizedRoute] = useState({})

    const getOptimizedRoute = async (route) => {
        const response = await fetch(`http://localhost:8080/routes/start`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(route)
        })

        const postedRoute = await response.json()
        setOptimizedRoute(postedRoute);
    }




    return (
        <>
            <h1>Hello from container</h1>
            <MapComponent getOptimizedRoute = {getOptimizedRoute}/>
        </>
    );
}

export default AppContainer;