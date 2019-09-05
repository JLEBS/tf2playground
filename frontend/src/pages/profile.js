import React, { useState, useEffect } from 'react';
import { RectangleContainer} from './../components/profile/infoRectangle';
import TempusContainer from './../components/profile/data-containers/tempus-data';
import ProfileContainer from './../components/profile/data-containers/profile-data';
import LifeTimeStatContainer from './../components/profile/data-containers/life-time-stats';
import ClassContainer from './../components/profile/data-containers/class-stats';
import { PageCenter, MarginContainer} from './../components/structure/containers';
import { ReactComponent as TF2Logo } from '../assets/imgs/icons/svgs/tf2-logo.svg';
import Colors from '../misc/colors';

//Class imports
import scout from '../assets/imgs/icons/classes/scout.png';
import pocketScout from '../assets/imgs/icons/classes/pocketScout.png';
import soldier from '../assets/imgs/icons/classes/soldier.png';
import pocketSoldier from '../assets/imgs/icons/classes/pocketSoldier.png';
import demo from '../assets/imgs/icons/classes/demo.png';
import medic from '../assets/imgs/icons/classes/medic.png';

//SVG imporst
import Fist from '../assets/imgs/icons/svgs/fist.svg';
import Trophy from '../assets/imgs/icons/svgs/trophy.svg';
import Clock from '../assets/imgs/icons/svgs/clock.svg';
import Injured from '../assets/imgs/icons/svgs/broken-arm.svg';
import PeopleCarry from '../assets/imgs/icons/svgs/people_carry.svg';
import SwordMultiple from '../assets/imgs/icons/svgs/sword-multiple.svg';
import SwordSingle from '../assets/imgs/icons/svgs/sword-single.svg';
import Handshake from '../assets/imgs/icons/svgs/hands-helping.svg';

const CLASS_STATS = [
    {   
        id: 1,
        name: 'pocket scout',
        shortname: 'pocket scout',
        image: pocketScout,
        value: 1234,       
        color: Colors.standard.class.pocketScout
    },
    {
        id: 2,
        name: 'flank scout',
        shortname: 'flank scout',
        image: scout,
        value: 529,       
        color: Colors.standard.class.flankScout
    },
    {
        id: 3,
        name: 'pocket soldier',
        shortname: 'pocket',
        image: pocketSoldier,
        value: 627,       
        color: Colors.standard.class.pocketSoldier
    },
    {
        id: 4,
        name: 'roaming soldier',
        shortname: 'roamer',
        image: soldier,
        value: 123,       
        color: Colors.standard.class.roamer
    },
    {
        id: 5,
        name: 'demoman',
        shortname: 'demo',
        image: demo,
        value: 256,      
        color: Colors.standard.class.demoman
    },
    {
        id: 6,
        name: 'medic',
        shortname: 'medic',
        image: medic,
        value: 362,
        color: Colors.standard.class.medic
    }
];

const SVG_ICONS = [
    {
        id: 1,
        name: 'lobbies played',
        description: 'fist raised',
        image: Fist,
        testData: 41
    },
    {
        id: 2,
        name: 'total wins',
        description: 'trophy',
        image: Trophy,
        testData: 10
    },
    {
        id: 3,
        name: 'hours played',
        description: 'clock',
        image: Clock,
        testData: 8973
    },
    {
        id: 4,
        name: 'disconnects',
        description: 'brokenarm',
        image: Injured,
        testData: 3
    },
    {
        id: 5,
        name: 'sub count',
        description: 'carry',
        image: PeopleCarry,
        testData: 7
    },
    {
        id: 6,
        name: 'Most played',
        description: 'medal',
        image: medic,
        testData: 823
    },
    {
        id: 7,
        name: 'kills',
        description: 'sword',
        image: SwordSingle,
        testData: 7392
    },
    {
        id: 9,
        name: 'assists',
        description: 'fist raised',
        image: Handshake,
        testData: 130353
    },
    {
        id: 9,
        name: 'top killstreak',
        description: 'fist raised',
        image: SwordMultiple,
        testData: 9
    },
];

const useFetch = url => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pending, setPending] = useState(false);

    async function fetchData() {
        if (!url) {
            setPending(true);
            return;
        }

        setPending(false);
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setLoading(false)
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

const ProfilePage = (props) => {

    const fetchProfile = useFetch(`http://localhost:3001/users/${props.match.params.steamID}`);

    const fetchTempus = useFetch(
        fetchProfile.data
            ? `http://localhost:3001/tempus-history/${fetchProfile.data.data[0].user_id}`
            : null
    );

    if (!fetchProfile.data || !fetchTempus.data) {
        return <PageCenter><MarginContainer direction='column' content='center'><TF2Logo/><div>Fetching Data...</div></MarginContainer></PageCenter>
    }
    
    return (
        <>
            <RectangleContainer direction='column' maxWidth='600px'>
                <ProfileContainer userData={fetchProfile.data.data}/>
            </RectangleContainer> 
            <RectangleContainer direction='row' maxWidth='510px' minWidth='300px' header={'Overall'} >
                <LifeTimeStatContainer lifetimeStats={SVG_ICONS} />
            </RectangleContainer> 
            <RectangleContainer  minWidth='500px' header={'tempus progression'}>
                <TempusContainer tempusData={fetchTempus.data.data} />
            </RectangleContainer>
            <RectangleContainer direction='row' maxWidth='800px' minWidth='300px' header={'class wins'}>
                <ClassContainer classStats={CLASS_STATS} />
            </RectangleContainer>
        </>
    )
};

export default ProfilePage;