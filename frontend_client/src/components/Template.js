import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import Counter from './Counter';
import { useContext } from 'react';
import { DriverContext } from '../container/AppContainer';


const Template = ({ completedCheckpoints, route, onButtonClick }) => {

    const driverUser = useContext(DriverContext)
    console.log(driverUser);

    return (<>
        <section className="landing-title">
            <div className="logo"></div>
            {
                driverUser.isManager ? null: <Counter completedCheckpoints={completedCheckpoints} route={route} />
            }
            <NavBar route={route} driverUser={driverUser} />
        </section>
        {/* {driverUser.isManager ? <button onClick={() => onButtonClick()}>Generate route</button> : null} */}

        <Outlet/>

        <footer className='footer'>
            <p>this is the footer</p>
        </footer>
    </>
    );
}

export default Template;