import React from 'react';
import Index from './pages/index.js';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

//Login Screen, skipped if logged in
// const = Index() {
//     return <h2>Home</h2>;
// }

const Home = () => (
    <Index>
        <div></div>
    </Index>
);

//Main Lobby Area
const  Lobby = () => (
    <div>
        <h2>This is lobby</h2>
    </div>
);

//Heading Nav Links
const About = () => (
    <div>
        <h2>About</h2>;
    </div>
);

const Rules = () => (
    <div>
        <h2>Rules</h2>;
    </div>
);

const Stats = () => (
    <div>
        <h2>Stats</h2>;
    </div>
);

const Conduct = () => (
    <div>
        <h2>Conduct</h2>;
    </div>
);

const Donate = () => (
    <div>
        <h2>Donate</h2>;
    </div>
);

//Multiple
const Users = () => (
    <div>
        <h2>Users</h2>;
    </div>
);

const Matches = () => (
    <div>
        <h2>Matches</h2>;
    </div>
);

//User Specific
const Profile = () => (
    <div>
        <h2>Profile</h2>;
    </div>
);

const Settings = () => (
    <div>
        <h2>Settings</h2>;
    </div>
);

const AppRouter = () => {
    return (
        <Router>
            <div>
                <nav>
                <ul>
                    <li>
                    <Link to="/">Home</Link>
                    </li>
                    <li>
                    <Link to="/lobby/">Lobby</Link>
                    </li>
                    <li>
                    <Link to="/users/">Users</Link>
                    </li>
                </ul>
                </nav>

                <Route path="/" exact component={Home} />
                <Route path="/lobby/" component={Lobby} />
                <Route path="/users/" component={Users} />
            </div>
        </Router>
    );
}
  
export default AppRouter;