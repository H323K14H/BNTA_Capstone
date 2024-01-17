
import "leaflet/dist/leaflet.css";
import MapComponent from "../components/LandingPage/MapComponent";
import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "../components/LandingPage/LandingPage";
import Template from "../components/Template";
import RouteComponent from "../components/MapPage/RouteComponent";



const AppContainer = () => {

    const [optimizedRoute, setOptimizedRoute] = useState([]);
    const [route, setRoute] = useState({})

    const getOptimizedRoute = async () => {
        const response = await fetch(`http://localhost:8080/routes/start`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify("")
        })

        const postedRoute = await response.json()

        const waypoints = postedRoute.checkpoints.map((waypoint) => {
            // latitude: waypoint.address.latitude,
            // longitude: waypoint.address.longitude,
            return waypoint.address
        });

        setOptimizedRoute(waypoints);
    }

    const getRouteById = async (id) => {
        const response = await fetch(`http://localhost:8080/routes/${id}`);
        const jsonData = await response.json();

        setRoute(jsonData);

    }

    

    useEffect(() => {
        getOptimizedRoute();
        getRouteById(1); //hardcoded 1 for now
        
    },[optimizedRoute])

    console.log(optimizedRoute);

    const appRoutes = createBrowserRouter([
        {
            path: "/",
            element: <Template route = {route}/>,
            children: [

                {
                    path:"/",
                    element: <LandingPage optimizedRoute={optimizedRoute} />

                },
                {
                    path: "/map-page",
                    element: <RouteComponent optimizedRoute={optimizedRoute}/>
                }

            ]
        }
    ])



    return (
        <>
            
            <RouterProvider router={appRoutes} />

        </>
    );
}

export default AppContainer;