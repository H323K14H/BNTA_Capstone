import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import {
    TileLayer,
    MapContainer,
    LayersControl
} from "react-leaflet";

import RoutingMachine from "./RoutingMachine";

const MapComponent = () => {
    const [map, setMap] = useState(null);
    const [start, setStart] = useState([38.9072, -77.0369]);
    const [end, setEnd] = useState([37.7749, -122.4194]);

    return (
        <>
            <MapContainer
                center={[37.0902, -95.7129]}
                zoom={3}
                zoomControl={false}
            >
                {/* *************** */}
                {/* Pass in our custom control layer here, inside of the map container */}
                {/* *************** */}
                <RoutingMachine
                    position={'topleft'}
                    start={start}
                    end={end}
                    color={'#757de8'}
                />
                <LayersControl position="topright">
                    <LayersControl.BaseLayer checked name="Map">
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                            maxZoom={20}
                            subdomains={["mt0", "mt1", "mt2", "mt3"]}
                        />
                    </LayersControl.BaseLayer>
                </LayersControl>
            </MapContainer>
        </>
    );
};

export default MapComponent;
