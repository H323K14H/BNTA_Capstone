import { Icon, divIcon, point } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";


const MapComponent = () => {

    const markers = [
            {
                geocode: [48.86, 2.3522],
                popUp: "Hello, I am a pop up 1"
            }, 
            {
                geocode: [48.85, 2.3522],
                popUp: "Hello, I am a pop up 2"
            }, 
            {
                geocode: [48.855, 2.34],
                popUp: "Hello, I am a pop up 3"
            }
        ]

    const customIcon = new Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854952.png",
        iconSize:[38, 38]
    })

    const createCustomClusterIcon = (cluster) => {
        return new divIcon({
            html: `<div class="cluster-icon"> ${cluster.getChildCount()}</div>`,
            iconSize: point(33, 33, true),
            className: "custom-marker-cluster"
        })
    }


    return (
        <>
            <MapContainer center={[48.8566, 2.3522]} zoom={13}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MarkerClusterGroup chunkedLoading iconCreateFunction={createCustomClusterIcon}>
                    {markers.map((marker) => (
                        <Marker position={marker.geocode} icon={customIcon}>
                            <Popup>
                                {marker.popUp}
                            </Popup>
                        </Marker>
                    ))}
                </MarkerClusterGroup>
            </MapContainer>
        </>
    );
}

export default MapComponent;