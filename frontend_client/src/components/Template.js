import NavBar from './NavBar'
import LandingPage from './LandingPage'
import { Outlet } from 'react-router-dom'
import CounterButton from './CounterButton';



const Template = () => {
    return (<>
        <section className="landing-title">
            <h1 className="title">PitStop</h1>
            <CounterButton />
            <NavBar />
        </section>

        <Outlet />

        <footer>
            <p>this is the footer</p>
        </footer>
    </>
    );
}

export default Template;