import MapComponent from "./MapComponent";

const LandingPage = ({ optimizedRoute }) => {



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