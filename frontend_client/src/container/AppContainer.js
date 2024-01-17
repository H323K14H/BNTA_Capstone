import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "../components/LandingPage/LandingPage";
import Template from "../components/Template";
import RouteComponent from "../components/MapPage/RouteComponent";


const AppContainer = () => {

    const [optimizedRoute, setOptimizedRoute] = useState([]);
    
    const [route, setRoute] = useState({});
    const [checkpoint, setCheckpoint] = useState([]);
    const [completedCheckpoints, setCompletedCheckpoints] = useState([]);
  


    const getOptimizedRoute = async () => {
        const response = await fetch(`http://localhost:8080/routes/start`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify("")
        })

        const postedRoute = await response.json()

        setOptimizedRoute(postedRoute);
    }

    // const waypoints = optimizedRoute.checkpoints.map((waypoint) => {
    //     // latitude: waypoint.address.latitude,
    //     // longitude: waypoint.address.longitude,
    //     return waypoint.address
    // });

    const waypoints = optimizedRoute.checkpoints ? optimizedRoute.checkpoints.map((waypoint) => {
        return waypoint.address;
    }) : [];

    const checkpointData = optimizedRoute.checkpoints || [];

    

    const getRouteById = async (id) => {
        const response = await fetch(`http://localhost:8080/routes/${id}`);
        const jsonData = await response.json();

        setRoute(jsonData);
        console.log(getRouteById);
    }

    const markCheckpointAsComplete = async (id) => {
        const response = await fetch(`http://localhost:8080/checkpoints/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify("")
        });
    
        const getData = await response.json();
        setCompletedCheckpoints(getData);
      };
    
      useEffect(() => {
        // Add any additional logic you want to run after completing the PATCH request
      }, [completedCheckpoints]);

    // const updateDriver = async (id, driverId) => {
    //     const response = await fetch(`http://localhost:8080/routes/${id}?driverId=${driverId}`, {
    //         method: "PATCH",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify("")
    //     })
    //     const getData = await response.json()

    //     setRoute(getData)
    // }

    // useEffect(() => {
    //     // getOptimizedRoute();
    //     getRouteById(1); //hardcoded 1 for now
    //     // updateDriver(1, 1);

    // }, [optimizedRoute])

    const appRoutes = createBrowserRouter([
        {
            path: "/",
            element: <Template completedCheckpoints = {completedCheckpoints} route={optimizedRoute} />,
            children: [

                {
                    path: "/",
                    element: <LandingPage onButtonClick= {getOptimizedRoute} 
                                        optimizedRoute={waypoints}
                                        completedCheckpoints = {completedCheckpoints} />

                },
                {
                    path: "/map-page",
                    element: <RouteComponent 
                    optimizedRoute={waypoints}
                    route={route}
                    checkpointData = {checkpointData}
                    markCheckpointAsComplete={markCheckpointAsComplete}
                    />
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