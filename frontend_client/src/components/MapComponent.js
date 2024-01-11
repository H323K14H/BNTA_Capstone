import { Icon } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";

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


    return (
        <>
            <MapContainer center={[48.8566, 2.3522]} zoom={13}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers.map((marker) => (
                    <Marker position={marker.geocode} icon={customIcon}>
                        <Popup>
                            {marker.popUp}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </>
    );
}

export default MapComponent;