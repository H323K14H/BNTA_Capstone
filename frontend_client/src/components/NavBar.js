import { slide as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom';

const NavBar = ({ route }) => {


    // if (!route || !route.checkpoints) {
    //     return null; // Return null or handle the case when route or checkpoints is undefined
    // }

    const addresses = (route && route.checkpoints)? route.checkpoints.map((checkpoint, index) => {
        return <li key={index}>{checkpoint.address.name}</li>
    }):null

    return (
        <>
            <Menu>
                <Link to="/map-page" id="home" className="menu-item">Progress Tracker </Link>
                <ul>
                    <p>List of addresses:</p>
                    {addresses}
                </ul>
                <Link to="/" id="home" className="menu-item">Overall Route </Link>
            </Menu>
        </>
    )
}
export default NavBar