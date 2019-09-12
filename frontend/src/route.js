import React from 'react';
import { LobbyLayout, LandingLayout, TextLayout, ProfileLayout }from './components/structure/layout';
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import HomePage from './pages/home';
import LobbyPage from './pages/lobby';
import AboutPage from './pages/about';
import RulesPage from './pages/rules';
import StatPage from './pages/stats';
import ConductPage from './pages/conduct';
import DonatePage from './pages/donate';
import ProfilePage from './pages/profile';
import snakewater from './assets/imgs/maps/snakewater.jpg';
import prolands from './assets/imgs/maps/prolands.jpg';
import process from './assets/imgs/maps/process.jpg';
import sunshine from './assets/imgs/maps/sunshine.jpg';
import gullywash from './assets/imgs/maps/gullywash.jpg';
import grannary from './assets/imgs/maps/grannary.jpg';
import ravine from './assets/imgs/themes/ravine.png';
import interlaced from './assets/imgs/background/interlaced.png';


//Home
const Home = () => (
    <LandingLayout imageUrl={sunshine}> 
        <HomePage/>
    </LandingLayout>
);
//END HOME

//Main Lobby Area
const Lobby = () => (
    <LobbyLayout imageUrl={prolands}>
        <LobbyPage/>
    </LobbyLayout>
);
//END LOBBY

//Website information, rules, terms etc Using TextLayout
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
//END

//Displays an array of all data from the database (all users on the site, or all matches played)
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
//END

//Displays a specifically chosen user or match from the database (singular)
const Profile = props => (
    <ProfileLayout imageUrl={interlaced}>
        <ProfilePage {...props}></ProfilePage>
    </ProfileLayout>
);

const MatchSingle = () => (
    <LobbyLayout>
        <h2>This Match Specifically</h2>;
    </LobbyLayout>
);
//END

//User Specific Only change options and settings
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
                {/* logout */}
                <Route path="/matches" component={Matches} />
                <Route path="/profile/:steamID" component={Profile} />
                <Route path="/settings" component={Settings} />
            </Switch>
        </Router>
    );
}
  
export default AppRouter;