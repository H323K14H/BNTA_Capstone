import React from "react";
import { TileLayer, MapContainer } from "react-leaflet";
import RoutingMachine from "./RoutingMachine";


const MapComponent = ({ waypoints }) => {

  
    if (waypoints.length === 0 ) {
        // Handle the case when the data is not available
        return <p>Loading...</p>; 
      }

    //   console.log(optimizedRoute);

    // const waypoints = optimizedRoute.checkpoints.map((waypoint) => ({
    //     latitude: waypoint.address.latitude,
    //     longitude: waypoint.address.longitude,
    //     address: waypoint.address.name
    // }));

    return (
        <>
            <MapContainer

                center={[51, -0.7]} //make warehouse location
                zoom={5}
                zoomControl={true}
            >

                <RoutingMachine
                    position={'topright'}
                    waypoints={waypoints}
                    color={'rgb(255, 0, 0)'}

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
};

export default MapComponent;
