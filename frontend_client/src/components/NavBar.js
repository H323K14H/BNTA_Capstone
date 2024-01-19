import { slide as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom';

const NavBar = ({ route, driverUser, setDriverUser }) => {



    const addresses = (route && route.checkpoints) ? route.checkpoints.map((checkpoint, index) => {
        return <li className='addresses' key={index}>{checkpoint.address.name}</li>
    }) : []

    const onLogOut = () => {
        setDriverUser({
            name: null,
            id: null,
            isManager: true
        })
    }
    console.log(driverUser);

    return (
        <>
            <Menu>
                {driverUser.id ? <div className="driver-initials">
                    <h3>{driverUser.initials}</h3>
                </div> : null}
                {driverUser.id ? <Link to="/" id="home" onClick={onLogOut} className="menu-item btn"> <h3>Log Out</h3></Link> : null}

                <Link to="/home" id="home" className="menu-item btn"><h3>Overall Route </h3> </Link>
                {
                    driverUser.isManager ?
                        <Link to="/manager" id="home" className="menu-item btn"><h3>All addresses</h3></Link> :
                        <Link to="/map-page" id="home" className="menu-item btn"><h3>Progress Tracker</h3> </Link>
                }

                {addresses.length === 0 ? null : <div className='address-list'>
                    <h3 className="addresses">List of addresses:</h3>

                    <p className='addresses'>{addresses}</p>
                </div>}


            </Menu>
        </>
    )
}
export default NavBar