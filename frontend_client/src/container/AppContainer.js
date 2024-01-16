
import "leaflet/dist/leaflet.css";
import MapComponent from "../components/MapComponent";
import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "../components/LandingPage";
import Template from "../components/Template";
import RouteComponent from "../components/RouteComponent";



const AppContainer = () => {

    const [optimizedRoute, setOptimizedRoute] = useState({});
    const [route, setRoute] = useState({})

    const getOptimizedRoute = async () => {
        const response = await fetch(`http://localhost:8080/routes/start`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify("")
        })

        const postedRoute = await response.json()
        setOptimizedRoute(postedRoute);
    }

    const getRouteById = async (id) => {
        const response = await fetch(`http://localhost:8080/routes/${id}`);
        const jsonData = await response.json();

        setRoute(jsonData);

    }

    

    useEffect(() => {
        getOptimizedRoute();
        getRouteById(1); //hardcoded 1 for now
    },[])



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