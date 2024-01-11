import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";



const AppContainer = () => {
    return (
        <>
            <h1>Hello from container</h1>
            <MapContainer center={[48.8566, 2.3522]} zoom={15}>
                <TileLayer
                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </>
    );
}

export default AppContainer;