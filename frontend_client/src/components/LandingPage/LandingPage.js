import MapComponent from "./MapComponent";

const LandingPage = ({ onButtonClick, optimizedRoute }) => {
  return (
    <>
      {optimizedRoute.length == 0 ? (
        <button onClick={()=>onButtonClick()}>Generate route</button>
      ) : (
        <>
          <MapComponent optimizedRoute={optimizedRoute} />

          <ul>
            <li>Deliveries to Complete:</li>
            <li>Completed Deliveries:</li>
          </ul>
        </>
      )}
    </>
  );
};

export default LandingPage;
