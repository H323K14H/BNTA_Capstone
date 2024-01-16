import CounterButton from "./CounterButton";
import MapComponent from "./MapComponent";

const LandingPage = ({getOptimizedRoute}) => {

    return (
        <>
        <h1 className="landing-title">landing page</h1>
        <CounterButton/>
         <MapComponent getOptimizedRoute = {getOptimizedRoute}/>
        </>
    );
}

export default LandingPage;