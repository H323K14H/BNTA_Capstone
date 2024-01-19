import MapComponent from "./MapComponent";

const LandingPage = ({ onButtonClick, optimizedRoute, completedCheckpoints, route, listOfDrivers, driverUser }) => {

  if (!route){
    return <p>Loading...</p>
  }

  const completedAddresses = completedCheckpoints.map((checkpoint) => {
    return <li key={checkpoint.id}>{checkpoint.address.name}</li>;
  });

  const checkpoints = route.checkpoints || [];

  const listOfAddressesToVisit = checkpoints.filter((checkpoint) => {
    return !checkpoint.completed;
  });

  const addressesToVisit = listOfAddressesToVisit.map((checkpoint) => {
    return <li key={checkpoint.id}>{checkpoint.address.name}</li>;
  })

  const driverOptions = listOfDrivers.map((driver) => {
    return driver.isManager ? null : <option>{driver.initials}</option>
  })

  const getAlert = (event) => {
    event.preventDefault();
    alert("Driver Successfully added");
  };


  return (
    <section className="landing-page-section">

      {optimizedRoute.length === 0 ? (
        <button onClick={() => onButtonClick()}>Generate route</button>
      ) : (
        <>
          {driverUser && driverUser.isManager ?
            (
              <section className="assign-driver-form-container">
                <form className="assign-driver-form" onSubmit={(event) => { getAlert(event) }}>
                  <select className="select-driver">
                    {driverOptions}
                  </select>
                  <input className="submit-assign-driver btn-default" type="submit" value="Assign Driver" ></input>
                </form>
              </section>)
            : null}
          <MapComponent waypoints={optimizedRoute} />

          {optimizedRoute.length > 0 ? (listOfAddressesToVisit.length > 0 ?
            (<>
              <h3>To Visit:</h3>
              <ul>{addressesToVisit}</ul>
            </>
            ) : <h3>You have no more deliveries to do today</h3>) : (
            <h3>Route has not been generated yet</h3>
          )}

          {completedAddresses.length > 0 ? (
            <>
              <h3>Visited:</h3>
              <ul>{completedAddresses}</ul>
            </>
          ) : (
            <h3>No Deliveries Made Yet Today</h3>
          )}
        </>

      )}
    </section>
  );
};

export default LandingPage;
