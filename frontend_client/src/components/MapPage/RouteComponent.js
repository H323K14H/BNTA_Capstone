import DeliveredButton from "./DeliveredButton";
import RouteMap from "./RouteMap";

const RouteComponent = ({ optimizedRoute, route , checkpointData, markCheckpointAsComplete, getRouteById }) => {


    return (
        <>
            <h1>Next address:</h1>
            <RouteMap optimizedRoute={optimizedRoute}/>
            <DeliveredButton route={route} checkpointData= {checkpointData} markCheckpointAsComplete={markCheckpointAsComplete} getRouteById={getRouteById}/>
        </>
    );
}

export default RouteComponent;