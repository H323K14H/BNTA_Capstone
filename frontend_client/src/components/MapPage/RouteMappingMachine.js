import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";


const createRoutineMachineLayer = ({ position, color, waypoints }) => {


  const generateIcons = (i) => {
    if (incompleteWaypoints[i].address.isWarehouse) {

      return new L.Icon({
        iconUrl: "https://icons.veryicon.com/png/o/miscellaneous/indata/warehouse-alt.png",
        iconSize: [32, 32]
      });
    }

    return new L.Icon({
      iconUrl: "https://icons.iconarchive.com/icons/fa-team/fontawesome/256/FontAwesome-House-Chimney-User-icon.png",
      iconSize: [32, 32],
    });
  };


  const incompleteWaypoints = waypoints.filter((waypoint) => {
    return !waypoint.completed;
  });


  const lastCompleteWaypoint = waypoints.findLast((waypoint) => waypoint.completed)

  if (lastCompleteWaypoint) {
    incompleteWaypoints.unshift(lastCompleteWaypoint)
  }

  console.log(incompleteWaypoints);


  const allAddresses = incompleteWaypoints.map(waypoint => waypoint.address.name);


  const instance = L.Routing.control({
    position,
    waypoints: incompleteWaypoints.map((waypoint) => L.latLng(waypoint.address.latitude, waypoint.address.longitude)),
    collapsible: true,
    addWaypoints: false,
    lineOptions: {
      styles: [{ color }]
    },

    createMarker: (i, coordinates, n) => {

      const address = allAddresses[i];

      const marker = generateIcons(i);

      return L.marker(coordinates.latLng, {

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

  L.Routing.errorControl(instance);


  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);


export default RoutingMachine;