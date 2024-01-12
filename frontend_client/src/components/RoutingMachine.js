import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";


const createRoutineMachineLayer = ({ position, warehouse, deliveryAddresses, color }) => {

  const generateIcons = (i)=>{
    if (i===0){
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

  const getGeoCodes = deliveryAddresses.map((delivery) => {
    return delivery.geocode
  });

  const getAddresses = deliveryAddresses.map((delivery) => {
    return delivery.address
  });

  const allWaypoints = [warehouse.geocode, ...getGeoCodes];

  const allAddresses = [warehouse.address, ...getAddresses];


  const instance = L.Routing.control({
    position,
    waypoints: allWaypoints.map((geo) => L.latLng(geo[0], geo[1])),
    lineOptions: {
      styles: [{ color }],
    },
    
    createMarker: (i, waypoints, n) => {

      const address = allAddresses[i];

      const marker = generateIcons(i);

      return L.marker(waypoints.latLng, {
        draggable: true,
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

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
