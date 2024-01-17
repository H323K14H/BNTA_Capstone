import MapComponent from "./MapComponent";

const LandingPage = ({
  onButtonClick,
  optimizedRoute,
  completedCheckpoints,
  route
}) => {
  const completedAddresses = completedCheckpoints.map((checkpoint) => {
    return <li key={checkpoint.id}>{checkpoint.address.name}</li>;
  });

  const checkpoints = route.checkpoints || [];

const addressesToVisit = checkpoints
  .filter((checkpoint) => !completedAddresses.includes(checkpoint))
  .map((checkpoint) => (
    <li key={checkpoint.id}>{checkpoint.address.name}</li>
  ));

  // const addressesToVisit = listOfAddressesToVisit.map((checkpoint) => {
  //   return <li key={checkpoint.id}>{checkpoint.address.name}</li>;
  // })

  return (
    <>
      {optimizedRoute.length == 0 ? (
        <button onClick={() => onButtonClick()}>Generate route</button>
      ) : (
        <>
          <MapComponent optimizedRoute={optimizedRoute} />

          {optimizedRoute.length > 0 ? (
            <>
              <h3>To Visit:</h3>
              <ul>{addressesToVisit}</ul>
            </>
          ) : (
            <h3>No More To Visit</h3>
          )}

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
