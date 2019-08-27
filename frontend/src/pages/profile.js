import React, { useState, useEffect } from 'react';
import { ProfileContainer, ClassContainer, LifeTimeStatContainer, RectangleContainer, CLASS_STATS, SVG_ICONS, PROFILE_URLS, PROFILE_SVGS} from './../components/profile/infoRectangle';
import TempusContainer from './../components/profile/data-containers/tempus-data';
//import {Masonry} from 'react-masonry'
import { PageCenter, MarginContainer} from './../components/structure/containers';
import { ReactComponent as TF2Logo } from '../assets/imgs/icons/svgs/tf2-logo.svg';

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
                <ProfileContainer userIcons={PROFILE_SVGS} userLinks={PROFILE_URLS} userData={fetchProfile.data.data}/>
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

//Shouldn't use this anymore, this calls on the API rather than the SQL Database Will be used for registration instead
const {data, loading, error} = useFetch(`https://tempus.xyz/api/players/steamid/${props.match.params.steamID}/rank`);
if (data) {
    
    const names = {
        3: 'data',
        4: 'data',
        'total': 'data'
    }

    const TEMPUS_INFO = {...data.class_rank_info};
    TEMPUS_INFO.total = {...data.rank_info};

    TEMPUS_POINTS = Object.keys(TEMPUS_INFO).map((key) => {
        const newKey = names[key] || key;
        return { [newKey] : TEMPUS_INFO[key] };
    });

    TEMPUS_POINTS[0].name = 'soldier';
    TEMPUS_POINTS[0].image = soldier;
    TEMPUS_POINTS[1].name = 'demo';
    TEMPUS_POINTS[1].image = demo;
    TEMPUS_POINTS[2].name = 'total';
    TEMPUS_POINTS[2].image = demoAndSoldier;

    console.log('testing tempus API', TEMPUS_POINTS);
}