import React from 'react';
import { LobbyLayout, LandingLayout, TextLayout }from './components/structure/layout';
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import HomePage from './pages/home';
import LobbyPage from './pages/lobby';
import AboutPage from './pages/about';
import RulesPage from './pages/rules';
import StatPage from './pages/stats';
import ConductPage from './pages/conduct';
import DonatePage from './pages/donate';
import snakewater from './assets/imgs/maps/snakewater.jpg';
import prolands from './assets/imgs/maps/prolands.jpg';
import process from './assets/imgs/maps/process.jpg';
import sunshine from './assets/imgs/maps/sunshine.jpg';
import gullywash from './assets/imgs/maps/gullywash.jpg';
import grannary from './assets/imgs/maps/grannary.jpg';
import ravine from './assets/imgs/themes/ravine.png';

const Home = () => (
    <LandingLayout imageUrl={sunshine}> 
        <HomePage/>
    </LandingLayout>
);

//Main Lobby Area
const Lobby = () => (
    <LobbyLayout imageUrl={prolands}>
        <LobbyPage/>
    </LobbyLayout>
);

//Heading Nav Links
const About = () => (
    <TextLayout imageUrl={ravine}>
        <AboutPage/>
    </TextLayout>
);

const Rules = () => (
    <TextLayout imageUrl={snakewater}>
        <RulesPage/>
    </TextLayout>
);

const Stats = () => (
    <TextLayout imageUrl={process}>
        <StatPage/>
    </TextLayout>
);

const Conduct = () => (
    <TextLayout imageUrl={grannary}>
        <ConductPage/>
    </TextLayout>
);

const Donate = () => (
    <TextLayout>
        <DonatePage/>
    </TextLayout>
);

//Multiple
const Users = () => (
    <LobbyLayout>
        <h2>Users</h2>;
    </LobbyLayout>
);

const Matches = () => (
    <LobbyLayout>
        <h2>Matches</h2>;
    </LobbyLayout>
);

//User Specific
const Profile = () => (
    <LobbyLayout>
        <h2>Profile</h2>;
    </LobbyLayout>
);

const Settings = () => (
    <LobbyLayout>
        <h2>Settings</h2>;
    </LobbyLayout>
);

const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/lobby" component={Lobby} />
                <Route path="/about" component={About} />
                <Route path="/rules" component={Rules} />
                <Route path="/stats" component={Stats} />
                <Route path="/conduct" component={Conduct} />
                <Route path="/donate" component={Donate} />
                <Route path="/users" component={Users} />
                <Route path="/matches" component={Matches} />
                <Route path="/profile" component={Profile} />
                <Route path="/settings" component={Settings} />
            </Switch>
        </Router>
    );
}
  
export default AppRouter;