import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import Counter from './Counter';
import { useContext } from 'react';
import { DriverContext } from '../container/AppContainer';
import logo from '../logo.png'


const Template = ({ completedCheckpoints, route, onButtonClick, setDriverUser }) => {

    const driverUser = useContext(DriverContext)
    console.log(driverUser);

    return (<>
        <section className="landing-title">
            <img src={logo} className="logo"/>
            {
                driverUser.isManager ? null: <Counter completedCheckpoints={completedCheckpoints} route={route} />
            }
            <NavBar route={route} driverUser={driverUser} setDriverUser={setDriverUser} />
        </section>
        {/* {driverUser.isManager ? <button onClick={() => onButtonClick()}>Generate route</button> : null} */}

        <Outlet/>

        <footer className='footer'>
            <p>Under Construction ©</p>
        </footer>
    </>
    );
}

export default Template;