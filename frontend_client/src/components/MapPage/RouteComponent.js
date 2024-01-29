import DeliveredButton from "./DeliveredButton";
import RouteMap from "./RouteMap";


const RouteComponent = (
    {
        optimizedRoute,
        route,
        checkpointData,
        markCheckpointAsComplete,
        getRouteById
    }) => {


    const nextCheckpoint = optimizedRoute.find(waypoint => !waypoint.completed)

    return (
        <>
            <section className="next-address-container">
                <section className="next-address">
                    {nextCheckpoint ? (
                        <>
                            <h1 className="delivery-status">
                                {nextCheckpoint.address.isWarehouse ? "Collecting from" : "Next address"}:
                            </h1>

                            <p className="upcoming-address">
                                {nextCheckpoint.address.name}
                            </p>
                        </>
                    ) : (
                        <h1 className="delivery-status">Deliveries done!</h1>
                    )}
                </section>
                <DeliveredButton
                    route={route}
                    checkpointData={checkpointData}
                    markCheckpointAsComplete={markCheckpointAsComplete}
                    getRouteById={getRouteById}
                />
            </section>
            <RouteMap optimizedRoute={optimizedRoute} />
        </>
    );
}


export default RouteComponent;