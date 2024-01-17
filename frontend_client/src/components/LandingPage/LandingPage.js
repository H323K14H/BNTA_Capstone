import CounterButton from "../Counter";
import MapComponent from "./MapComponent";
import NavBar from "../NavBar";

const LandingPage = ({ optimizedRoute }) => {

    console.log(optimizedRoute);

    return (
        <>
            

            <MapComponent optimizedRoute={optimizedRoute} />

            <ul>
                <li>
                    Deliveries to Complete:
                </li>
                <li>
                    Completed Deliveries:
                </li>
            </ul>

          
        </>
    );
}

export default LandingPage;