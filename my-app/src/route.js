import React from 'react';
import Layout from './components/structure/layout.js/index.js.js';
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import HeaderContainer from './components/header/mainHeader/mainHeader';

//Login Screen, skipped if logged in
// const = Index() {
//     return <h2>Home</h2>;
// }

const Home = () => (
    <Layout>
        <div>sfsdf</div>
    </Layout>
);

//Main Lobby Area
const  Lobby = () => (
    <Layout>
        <h2>This is lobby</h2>
    </Layout>
);

//Heading Nav Links
const About = () => (
    <Layout>
        <h2>About</h2>;
    </Layout>
);

const Rules = () => (
    <Layout>
        <h2>Rules</h2>;
    </Layout>
);

const Stats = () => (
    <Layout>
        <h2>Stats</h2>;
    </Layout>
);

const Conduct = () => (
    <Layout>
        <h2>Conduct</h2>;
    </Layout>
);

const Donate = () => (
    <Layout>
        <h2>Donate</h2>;
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
                <Route path="/lobby" exact component={Lobby} />
                <Route path="/about/" component={About} />
                <Route path="/rules/" component={Rules} />
                <Route path="/stats/" component={Stats} />
                <Route path="/conduct/" component={Conduct} />
                <Route path="/donate/" component={Donate} />
                <Route path="/users/" component={Users} />
                <Route path="/matches/" component={Matches} />
                <Route path="/profile/" component={Profile} />
                <Route path="/settings/" component={Settings} />
            </Switch>
        </Router>
    );
}
  
export default AppRouter;