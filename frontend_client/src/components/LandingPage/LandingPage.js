import MapComponent from "./MapComponent";

const LandingPage = ({
  onButtonClick,
  optimizedRoute,
  completedCheckpoints,
}) => {
  const completedAddresses = completedCheckpoints.map((checkpoint) => {
    return <li key={checkpoint.id}>{checkpoint.address.name}</li>;
  });

  return (
    <>
      {optimizedRoute.length == 0 ? (
        <button onClick={() => onButtonClick()}>Generate route</button>
      ) : (
        <>
          <MapComponent optimizedRoute={optimizedRoute} />

          {completedAddresses.length > 0 ? (
            <>
              <h3>Visited:</h3>
              <ul>{completedAddresses}</ul>
            </>
          ) : (
            <h3>No Deliveries Made</h3>
          )}
        </>
      )}
    </>
  );
};

export default LandingPage;
