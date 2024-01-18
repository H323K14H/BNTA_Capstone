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
                <p>{driverUser.initials}</p>
                <Link to="/map-page" id="home" className="menu-item">My Route </Link>
                <ul>
                    <p>List of addresses:</p>
                    {addresses}
                </ul>
                <Link to="/home" id="home" className="menu-item">More info </Link>
            </Menu>
        </>
    )
}
export default NavBar