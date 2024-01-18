import MapComponent from "./MapComponent";
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete'
import '@geoapify/geocoder-autocomplete/styles/minimal.css'

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

   
  const onPlaceSelect=(event) => {
    console.log(event);
    console.log("hey");
  }
 
  const onSuggestionChange=(value) => {
    console.log(value);
    console.log("hi");
  }
  const postprocessHook= (event)=>{
    console.log(event);
    return event.properties.address_line1+ ", " +event.properties.address_line2
  }
  return (
    <>
    <GeoapifyContext apiKey="API_KEY">
      <GeoapifyGeocoderAutocomplete placeholder="Enter address here"
        // type={"street"}
        lang={"en"}
        position={"relative"}
        filterByCountryCode={["gb"]}
        limit={"5"}
        // value={""}
        placeSelect={()=>onPlaceSelect()}
        suggestionsChange={onSuggestionChange}
        postprocessHook={postprocessHook}
        allowNonVerifiedHouseNumber={true}
        />
    </GeoapifyContext>

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
