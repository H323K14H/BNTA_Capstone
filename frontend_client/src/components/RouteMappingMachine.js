import React from 'react'
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";


const createRoutineMachineLayer = ({ waypoints, color, position }) => {

    const generateIcons = (i) => {
        if (i === 0) {

            return new L.Icon({
                iconUrl: "https://icons.veryicon.com/png/o/miscellaneous/indata/warehouse-alt.png",
                iconSize: [32, 32],
            });
        }

        return new L.Icon({
            iconUrl: "https://icons.iconarchive.com/icons/fa-team/fontawesome/256/FontAwesome-House-Chimney-User-icon.png",
            iconSize: [32, 32],
        });
    };

    const allAddresses = waypoints.map(waypoint => waypoint.address);

    const instance = L.Routing.control({
        position,
        waypoints: waypoints.map((waypoint) => L.latLng(waypoint.latitude, waypoint.longitude)),
        collapsible: true,
        addWaypoints: false,
        lineOptions: {
            styles: [{ color }],
        },

        createMarker: (i, waypoints, n) => {

            const address = allAddresses[i];

            const marker = generateIcons(i);

            return L.marker(waypoints.latLng, {

                draggable: false,

                bounceOnAdd: false,
                bounceOnAddOptions: {
                    duration: 1000,
                    height: 800,
                },
                icon: marker,

            })

                .bindPopup(address)
                .openPopup();
        },

    });

    return instance;
};

const RouteMappingMachine = createControlComponent(createRoutineMachineLayer);


export default RouteMappingMachine