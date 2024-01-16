import React, { useEffect, useState, useRef } from "react";
import { TileLayer, MapContainer } from "react-leaflet";
import RoutingMachine from "./RoutingMachine";


const MapComponent = ({ getOptimizedRoute }) => {

    const [warehouse, setWarehouse] = useState(

        {
            address: "Warehouse, 4 pivot road",
            geocode: [51.5, -0.1]
        }
    );

    const [deliveryAddresses, setDeliveryAddresses] = useState(

        [
            {
                address: "house 1",
                geocode: [51.5, -0.2]
            },
            {
                address: "house 2",
                geocode: [51.477, -0.25]
            },
            {
                address: "house 3",
                geocode: [51.51, -0.2]
            }
        ]

    );

    // if (!getOptimizedRoute || !getOptimizedRoute.checkpoints) {
    //     // Handle the case when the data is not available
    //     return <p>Loading...</p>; // or any other appropriate fallback
    //   }


    // const waypoints = getOptimizedRoute.checkpoints.map((waypoint) => ({
    //     latitude: waypoint.latitude,
    //     longitude: waypoint.longitude,
    //     address: waypoint.address,
    // }));

    return (
        <>
            <MapContainer

                center={[51, -0.7]}
                zoom={5}
                zoomControl={true}
            >

                <RoutingMachine
                    position={'topright'}
                    warehouse={warehouse}
                    deliveryAddresses={deliveryAddresses}
                    // waypoints={waypoints}
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
