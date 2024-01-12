import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import {
    TileLayer,
    MapContainer
} from "react-leaflet";

import RoutingMachine from "./RoutingMachine";

const MapComponent = () => {

    const [warehouse, setWarehouse] = useState(

        {
            address: "Warehouse, 4 pivot road",
            geocode: [38.9072, -77.0369]
        }
    );

    const [deliveryAddresses, setDelievryAddresses] = useState(

        [
            {
                address: "house 1",
                geocode: [37.7749, -122.4194]
            },
            {
                address: "house 2",
                geocode: [37.75, -121.4194]
            },
            {
                address: "house 3",
                geocode: [36.7749, -120.4194]
            }
        ]

    );

    return (
        <>
            <MapContainer
                center={[37.0902, -95.7129]}
                zoom={3}
                zoomControl={false}
            >

                <RoutingMachine
                    position={'topleft'}
                    warehouse={warehouse}
                    deliveryAddresses={deliveryAddresses}
                    color={'#757de8'}
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
