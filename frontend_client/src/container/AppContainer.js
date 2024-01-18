import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { createBrowserRouter, json, RouterProvider } from "react-router-dom";
import LandingPage from "../components/LandingPage/LandingPage";
import Template from "../components/Template";
import RouteComponent from "../components/MapPage/RouteComponent";
import LoginForm from "../components/LogInForm";


const AppContainer = () => {

    console.log(localStorage.getItem("optimizedRoute"));

    const [optimizedRoute, setOptimizedRoute] = useState([]);

    const [route, setRoute] = useState({});
    const [checkpoint, setCheckpoint] = useState([]);
    const [completedCheckpoints, setCompletedCheckpoints] = useState([]);

    const [clientUser,setClientUser] = useState([
        {   
            name: null,
            id: null,
            isManager: false
        }
    ]);
    

    const setLoginInUser = async (userId) => {
        const response = await fetch(`http://localhost:8080/drivers/${userId}`);
        const jsonData = await response.json();
        setClientUser({
            initials: jsonData.name,
            id: jsonData.id,
            // role: jsonData.role,
        });          
    }


    const getOptimizedRoute = async () => {
        const response = await fetch(`http://localhost:8080/routes/start`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify("")
        })

        const postedRoute = await response.json()

        setOptimizedRoute(postedRoute);
        localStorage.setItem("optimizedRoute", postedRoute.id);
        // console.log(localStorage.getItem("optimizedRoute"));
        // localStorage.setItem("checkpointIndex", "0")
    }

    const checkpointData = optimizedRoute.checkpoints || [];

    const realTimeWaypoint = route.checkpoints ? route.checkpoints.map((waypoint) => {
        return waypoint;
    }) : [];

    const getRouteById = async (id) => {
        const response = await fetch(`http://localhost:8080/routes/${id}`);
        const jsonData = await response.json();

        setOptimizedRoute(jsonData);
        console.log(jsonData);
    }

    const markCheckpointAsComplete = async (id) => {
        const response = await fetch(`http://localhost:8080/checkpoints/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify("")
        });

        const routeData = await response.json();
        // localStorage.setItem("checkpointIndex", routeData.upcomingCheckpointIndex);
        setRoute(routeData)
        setCompletedCheckpoints(
            routeData.checkpoints.filter(
                checkpoint => checkpoint.completed === true
            )
        );
        console.log(routeData);
        console.log(routeData.checkpoints.filter(
            checkpoint => checkpoint.completed === true
        ));
    };

    // May need this in the future...
    useEffect(() => {
        if (localStorage.getItem("optimizedRoute")) {
            getRouteById(localStorage.getItem("optimizedRoute"))
            localStorage.setItem("checkpointIndex", 0)
        }
    }, [])

    useEffect(() => {
        if (optimizedRoute && optimizedRoute.checkpoints) {
            setRoute(optimizedRoute);
            setCompletedCheckpoints(
                optimizedRoute.checkpoints.filter(
                    checkpoint => checkpoint.completed === true
                )
            );
        }
    }, [optimizedRoute])


    //   useEffect(() => {
    //     // Add any additional logic you want to run after completing the PATCH request
    //   }, [completedCheckpoints]);

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

    // }, [completedCheckpoints])

    const appRoutes = createBrowserRouter([
        {
            path: "/",
            element: <Template completedCheckpoints={completedCheckpoints}
                route={optimizedRoute}
                onButtonClick={getOptimizedRoute} />,
            children: [
                {
                    path: "/home",
                    element: <LandingPage onButtonClick={getOptimizedRoute}
                        optimizedRoute={realTimeWaypoint}
                        completedCheckpoints={completedCheckpoints}
                        route={route} />
                },
                {
                    path: "/map-page",
                    element: <RouteComponent
                        optimizedRoute={realTimeWaypoint}
                        route={route}
                        checkpointData={checkpointData}
                        markCheckpointAsComplete={markCheckpointAsComplete}
                        getRouteById={getRouteById}
                    />
                }
            ]
        },
        {
            path:"/log-in",
            element: <LoginForm setLoginInUser={setLoginInUser}/>

        }
    ])


    return (
        <>
            <RouterProvider router={appRoutes} />
        </>
    );
}

export default AppContainer;