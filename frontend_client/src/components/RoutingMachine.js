import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";


const createRoutineMachineLayer = ({ position, warehouse, deliveryAddresses, color }) => {

  const walkMarker = new L.Icon({
    iconUrl: "https://icons.iconarchive.com/icons/fa-team/fontawesome/256/FontAwesome-House-Chimney-User-icon.png",
    iconSize: [32, 32],
  });

  
  const myPopup = warehouse.address;

  const generateGeoCodes = deliveryAddresses.map((address) => {
    return address.geocode
  });

  const allWaypoints = [warehouse.geocode, ...generateGeoCodes];

  const instance = L.Routing.control({
    position,
    waypoints: allWaypoints.map((geo) => L.latLng(geo[0], geo[1])),
    lineOptions: {
      styles: [{ color }],
    },
    createMarker: (i, waypoints, n) => {
      return L.marker(waypoints.latLng, {
        draggable: true,
        bounceOnAdd: false,
        bounceOnAddOptions: {
          duration: 1000,
          height: 800,
        },
        icon: walkMarker,
      })
        .bindPopup(myPopup)
        .openPopup();
    },
  });

  // Return the instance correctly outside the function's closing curly brace
  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
