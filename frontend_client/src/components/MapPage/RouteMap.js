import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet';
import RoutingMachine from '../LandingPage/RoutingMachine';
import RouteMappingMachine from './RouteMappingMachine';

const RouteMap = ({ optimizedRoute}) => {

    if (optimizedRoute.length === 0 ) {
        // Handle the case when the data is not available
        return <p>Loading...</p>;
    }

   


    // const waypoints = optimizedRoute.checkpoints.map((waypoint) => {
    //     console.log(optimizedRoute);
        
    //     return (

    //     {
    //     latitude: waypoint.address.latitude,
    //     longitude: waypoint.address.longitude,
    //     address: waypoint.address.name
        
    //     }
    
    // )});
    

    return (
        <>
            <MapContainer

                center={[51, -0.7]} //make warehouse location
                zoom={5}
                zoomControl={true}
            >

                <RouteMappingMachine
                    position={'topright'}
                    waypoints={optimizedRoute}
                    color={'rgb(255, 24, 132)'}
                    key={optimizedRoute.findIndex((checkpoint)=> !checkpoint.completed)}
                />

                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                    maxZoom={20}
                    subdomains={["mt0", "mt1", "mt2", "mt3"]}
                />
            </MapContainer>
        </>
    );
}

export default RouteMap