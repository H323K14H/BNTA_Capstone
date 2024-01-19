import "leaflet/dist/leaflet.css";
import { createContext, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "../components/LandingPage/LandingPage";
import Template from "../components/Template";
import RouteComponent from "../components/MapPage/RouteComponent";
import LoginForm from "../components/LogInForm";
import Manager from "../components/Manager";

export const DriverContext = createContext()

const AppContainer = () => {

    const [optimizedRoute, setOptimizedRoute] = useState([]);

    const [route, setRoute] = useState({});
    const [listOfAddresses, setListOfAddresses] = useState([]);
    const [checkpoint, setCheckpoint] = useState([]);
    const [completedCheckpoints, setCompletedCheckpoints] = useState([]);
    const [listOfDrivers, setListOfDrivers] = useState([])

    const [driverUser, setDriverUser] = useState(
        {
            name: null,
            id: null,
            isManager: true
        }
    );
    

    const driverUserId = () => {
        return (
            <DriverContext.Provider value={driverUser}>
            </DriverContext.Provider>
        )
    }


    const setLoginInUser = async (userId) => {
        const response = await fetch(`http://localhost:8080/drivers/${userId}`);
        const jsonData = await response.json();

        setDriverUser({
            initials: jsonData.initials,
            id: jsonData.id,
            isManager: jsonData.isManager
        });

    }

    const getAllAddresses = async () => {
        const response = await fetch(`http://localhost:8080/delivery-addresses`);
        const jsonData = await response.json();

        setListOfAddresses(jsonData);
    }

    const getAllDrivers = async () => {
        const response = await fetch(`http://localhost:8080/drivers`);
        const jsonData = await response.json();

        setListOfDrivers(jsonData);
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

    const postAddress = async (addressToAdd)=>{
        const response = await fetch(`http://localhost:8080/delivery-addresses`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(addressToAdd)
        })
        getAllAddresses()
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
        getAllAddresses();
        getAllDrivers();
    }, [optimizedRoute])


    useEffect(() => {
        driverUserId();
    }, [driverUser])



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
            element:
                <DriverContext.Provider value={driverUser}>
                    <Template
                        completedCheckpoints={completedCheckpoints}
                        route={optimizedRoute}
                        onButtonClick={getOptimizedRoute} />
                </DriverContext.Provider>,
            children: [
                {
                    path: "/home",
                    element:
                    <DriverContext.Provider value={driverUser}>
                    <LandingPage
                        onButtonClick={getOptimizedRoute}
                        optimizedRoute={realTimeWaypoint}
                        completedCheckpoints={completedCheckpoints}
                        route={route} 
                        listOfDrivers={listOfDrivers}
                        driverUser={driverUser}/>
                    </DriverContext.Provider>
                },
                {
                    path: "/map-page",
                    element:
                    <DriverContext.Provider value={driverUser}>
                    <RouteComponent
                        optimizedRoute={realTimeWaypoint}
                        route={route}
                        checkpointData={checkpointData}
                        markCheckpointAsComplete={markCheckpointAsComplete}
                        getRouteById={getRouteById}
                    />
                    </DriverContext.Provider>
                },
                {
                    path: "/",
                    element: 
                    <DriverContext.Provider value={driverUser}>
                    <LoginForm
                        setLoginInUser={setLoginInUser}
                        driverUser={driverUser} />
                    </DriverContext.Provider>

                },
                {
                    path: "/manager",
                    element: 
                    <DriverContext.Provider value={driverUser}>
                    <Manager
                        listOfAddresses={listOfAddresses}
                        onButtonClick={getOptimizedRoute}
                        postAddress={postAddress} 
                        listOfDrivers={listOfDrivers}/>
                    </DriverContext.Provider>
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