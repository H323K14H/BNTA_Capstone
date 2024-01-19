import { useState } from "react";
import DeliveredButton from "./DeliveredButton";
import RouteMap from "./RouteMap";

const RouteComponent = ({ optimizedRoute, route , checkpointData, markCheckpointAsComplete, getRouteById }) => {

    // const[nextAddress, setNextAddress] = useState("")



    const nextCheckpoint = optimizedRoute.find(waypoint=>!waypoint.completed)
    // const isWarehouse = nextCheckpoint.address.isWarehouse

    return (
        <>
            <div className="address-title">
            {nextCheckpoint? <h1>{nextCheckpoint.address.isWarehouse? "Collecting from" : "Next address"}: {nextCheckpoint.address.name}</h1>
            : 
            <h1><strong>Deliveries complete!</strong></h1>}
            </div>
            <DeliveredButton 
            route={route} 
            checkpointData= {checkpointData} 
            markCheckpointAsComplete={markCheckpointAsComplete} 
            getRouteById={getRouteById}
            />
            <RouteMap optimizedRoute={optimizedRoute}/>
        </>
    );
}

export default RouteComponent;