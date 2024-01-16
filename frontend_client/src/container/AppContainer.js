
import "leaflet/dist/leaflet.css";
import MapComponent from "../components/MapComponent";
import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "../components/LandingPage";


const AppContainer = () => {

    const [optimizedRoute, setOptimizedRoute] = useState({})

    const getOptimizedRoute = async () => {
        const response = await fetch(`http://localhost:8080/routes/start`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify("")
        })

        const postedRoute = await response.json()
        setOptimizedRoute(postedRoute);
    }

    useEffect(() => {
        getOptimizedRoute();
    },[])



    const appRoutes = createBrowserRouter([
        {
            path: "/",
            element: <>
                <LandingPage optimizedRoute= {optimizedRoute} />
            </>,
            children: [
                {
                    path:"/map-page",
                    element: <>


                    </>
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