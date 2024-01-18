import { slide as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom';

const NavBar = ({ route, driverUser }) => {

    

    const addresses = (route && route.checkpoints) ? route.checkpoints.map((checkpoint, index) => {
        return <li key={index}>{checkpoint.address.name}</li>
    }) : []

    console.log(driverUser);

    return (
        <>
            <Menu>
                <h3>{driverUser.initials}</h3>
                <Link to="/home" id="home" className="menu-item btn"><h3>Overall Route </h3> </Link>
                {
                    driverUser.isManager ?
                        <Link to="/manager" id="home" className="menu-item btn"><h3>All addresses</h3></Link> :
                        <Link to="/map-page" id="home" className="menu-item btn"><h3>Progress Tracker</h3> </Link>
                }
                
                    {addresses.length === 0 ? null : <h3 className="menu-item">List of addresses:</h3>}
                
                    {addresses}
                
                

                {driverUser.id ? <Link to="/" id="home" className="menu-item btn"> <h3>Log Out</h3></Link> : null}
            </Menu>
        </>
    )
}
export default NavBar