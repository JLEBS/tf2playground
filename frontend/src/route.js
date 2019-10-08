import React, {useEffect, useState }  from 'react';
import { LobbyLayout, LandingLayout, TextLayout, ProfileLayout, NotificationContainer }from './components/structure/layout';
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
import HeaderContainer from './components/header/mainHeader/mainHeader';
import SubHeaderContainer from './components/header/subHeader/subHeader';

const Home = () => (
  <LandingLayout imageUrl={sunshine}> 
    <HomePage/>
  </LandingLayout>
);

const Lobby = ({loading, playerData}) => (
  <LobbyLayout imageUrl={prolands}>
    <LobbyPage loading={loading} playerData={playerData}  />
  </LobbyLayout>
);

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

const Settings = () => (
  <LobbyLayout>
      <h2>Settings</h2>;
  </LobbyLayout>
);

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);

  function fetchData() {
    if (!url) {
    setPending(true);
    return false;
  }

  setPending(false);

  fetch(url, {
    credentials: 'include',
    'mode': 'cors'
  })
  .then(res => res.json())
  .then(res => {
    setData(res)
    setLoading(false)
  })
  .catch(err => {
    setData(false)
    setLoading(false)
  });
  }

  useEffect(() => {
    fetchData()
  }, [ url ]);

  return {
    pending,
    loading,
    data
  };
};
  
const AppRouter = () => {

  const fetchUser = useFetch(`http://localhost:3001/profile`);

  
  return (
    <Router>
      {console.log(fetchUser, 'fetchuser')}

      {/* { fetchUser.loading === false )} */}
      <HeaderContainer loading={fetchUser.loading} playerData={fetchUser.data} className='mainHeader'/>
      <SubHeaderContainer className='subHeader'/>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/lobby" render={() => <Lobby loading={fetchUser.loading} playerData={fetchUser.data}></Lobby> } />
        <Route path="/about" component={About} />
        <Route path="/rules" component={Rules} />
        <Route path="/stats" component={Stats} />
        <Route path="/conduct" component={Conduct} />
        <Route path="/donate" component={Donate} />
        <Route path="/users" component={Users} />
        <Route path="/matches" component={Matches} />
        <Route path="/profile/:steamID" component={Profile} />
        <Route path="/settings" component={Settings} />
      </Switch>
    </Router>
  );
}
  
export default AppRouter;