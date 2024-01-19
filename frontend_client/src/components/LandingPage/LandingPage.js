import MapComponent from "./MapComponent";

const LandingPage = ({ onButtonClick, optimizedRoute, completedCheckpoints, route, listOfDrivers, driverUser }) => {

  const completedAddresses = completedCheckpoints.map((checkpoint) => {
    return <li key={checkpoint.id}>{checkpoint.address.name}</li>;
  });

  const checkpoints = route.checkpoints || [];

  const listOfAddressesToVisit = checkpoints.filter((checkpoint) => {
    return !checkpoint.completed;
  });

  const driverOptions = listOfDrivers.map((driver)=>{
    return driver.isManager? null: <option>{driver.initials}</option>
})

  const addressesToVisit = listOfAddressesToVisit.map((checkpoint) => {
    return <li key={checkpoint.id}>{checkpoint.address.name}</li>;
  })


  
  return (
    <>

      {optimizedRoute.length === 0 ? (
        <button onClick={() => onButtonClick()}>Generate route</button>
      ) : (
        <>
        {driverUser&&driverUser.isManager?
        (
        <form>
          <select>
            {driverOptions}
          </select>
          <input type="submit" value="Assign Driver" ></input>

        </form>): null}


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
    </>
  );
};

export default LandingPage;
