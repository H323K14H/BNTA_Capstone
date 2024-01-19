import { Link } from "react-router-dom";


const Route = ({routes, listOfDrivers}) => {

    console.log(routes);
    if(routes && !routes.len){
        return <p>Loading...</p>
    }

    const driverOptions = listOfDrivers.map((driver)=>{
        return <option>{driver.initials}</option>
    })

    const mappedRoutes = routes? routes.map((route) => {
        return (
        <li 
        key={route.id}>{route}
        <Link to="/home"><button>View Route</button></Link>
        <select>
            {driverOptions}
        </select>
        </li>
        );
      }):[]
    return ( 
    <>

    <ul>
        {mappedRoutes}
    </ul>
    
    </> 
    
    );
}
 
export default Route;