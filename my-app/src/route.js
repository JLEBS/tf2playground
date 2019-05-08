import React from 'react';
import { Layout, LandingLayout }from './components/structure/layout';
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import HomePage from './pages/home';
import LobbyPage from './pages/lobby';
import AboutPage from './pages/about';
import RulesPage from './pages/rules';
import StatPage from './pages/stats';
import ConductPage from './pages/conduct';
import DonatePage from './pages/donate';

const Home = () => (
    <LandingLayout>
        <HomePage/>
    </LandingLayout>
);

//Main Lobby Area
const Lobby = () => (
    <Layout>
        <LobbyPage/>
    </Layout>
);

//Heading Nav Links
const About = () => (
    <Layout>
        <AboutPage/>
    </Layout>
);

const Rules = () => (
    <Layout>
        <RulesPage/>
    </Layout>
);

const Stats = () => (
    <Layout>
        <StatPage/>
    </Layout>
);

const Conduct = () => (
    <Layout>
        <ConductPage/>
    </Layout>
);

const Donate = () => (
    <Layout>
        <DonatePage/>
    </Layout>
);

//Multiple
const Users = () => (
    <Layout>
        <h2>Users</h2>;
    </Layout>
);

const Matches = () => (
    <Layout>
        <h2>Matches</h2>;
    </Layout>
);

//User Specific
const Profile = () => (
    <Layout>
        <h2>Profile</h2>;
    </Layout>
);

const Settings = () => (
    <Layout>
        <h2>Settings</h2>;
    </Layout>
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