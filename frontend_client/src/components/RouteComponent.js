import RouteMap from "./RouteMap";

const RouteComponent = ({ optimizedRoute }) => {


    return (
        <>
            <h1>Next address:</h1>
            <RouteMap optimizedRoute={optimizedRoute}/>
        </>
    );
}

export default RouteComponent;