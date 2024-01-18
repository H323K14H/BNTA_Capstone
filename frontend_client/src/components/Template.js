import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import Counter from './Counter';



const Template = ({ completedCheckpoints, route, onButtonClick }) => {
    return (<>
        <section className="landing-title">
            <h1 className="title">PitStop</h1>
            <Counter completedCheckpoints={completedCheckpoints} route={route} />
            <NavBar route={route} />
        </section>
        <button onClick={() => onButtonClick()}>Generate route</button>

        <Outlet />

        <footer className='footer'>
            <p>this is the footer</p>
        </footer>
    </>
    );
}

export default Template;