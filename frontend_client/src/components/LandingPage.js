import CounterButton from "./CounterButton";
import MapComponent from "./MapComponent";
import NavBar from "./NavBar";

const LandingPage = ({ getOptimizedRoute }) => {

    return (
        <>
            <section className="landing-title">
                <h1 className="title">Landing page</h1>
                <CounterButton />
                <NavBar />
            </section>

            <MapComponent getOptimizedRoute={getOptimizedRoute} />

            <ul>
                <li>
                    Deliveries to Complete:
                </li>
                <li>
                    Completed Deliveries:
                </li>
            </ul>

            <footer>
                <p>this is the footer</p>
            </footer>
        </>
    );
}

export default LandingPage;