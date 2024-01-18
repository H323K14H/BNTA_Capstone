import { slide as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom';

const NavBar = ({ route, driverUser}) => {


    // if (!route || !route.checkpoints) {
    //     return null; // Return null or handle the case when route or checkpoints is undefined
    // }

    const addresses = (route && route.checkpoints)? route.checkpoints.map((checkpoint, index) => {
        return <li key={index}>{checkpoint.address.name}</li>
    }):null

    console.log(driverUser);

    return (
        <>
            <Menu>
                <h3>{driverUser.initials}</h3>
                <Link to="/map-page" id="home" className="menu-item">Progress Tracker </Link>
                <ul>
                    <p>List of addresses:</p>
                    {addresses}
                </ul>
                <Link to="/home" id="home" className="menu-item">Overall Route  </Link>

                { driverUser.id ? <Link to="/login" id="home" className="menu-item"> Log Out</Link> : null}
            </Menu>
        </>
    )
}
export default NavBar