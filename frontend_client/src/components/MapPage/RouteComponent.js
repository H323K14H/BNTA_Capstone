import DeliveredButton from "./DeliveredButton";
import RouteMap from "./RouteMap";

const RouteComponent = ({ optimizedRoute, route }) => {


    return (
        <>
            <h1>Next address:</h1>
            <RouteMap optimizedRoute={optimizedRoute}/>
            <DeliveredButton route={route} />
        </>
    );
}

export default RouteComponent;