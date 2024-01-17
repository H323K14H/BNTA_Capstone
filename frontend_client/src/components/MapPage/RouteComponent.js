import DeliveredButton from "./DeliveredButton";
import RouteMap from "./RouteMap";

const RouteComponent = ({ optimizedRoute, route , checkpointData }) => {


    return (
        <>
            <h1>Next address:</h1>
            <RouteMap optimizedRoute={optimizedRoute}/>
            <DeliveredButton route={route} checkpointData= {checkpointData}/>
        </>
    );
}

export default RouteComponent;