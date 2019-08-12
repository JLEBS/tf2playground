import React, { useState, useEffect } from 'react';
import { ProfileContainer, ClassContainer, LifeTimeStatContainer, RectangleContainer, TempusContainer, PercentageContainer, CLASS_STATS, SVG_ICONS, PROFILE_URLS, COLORS, PROFILE_SVGS} from './../components/profile/infoRectangle';
import {Masonry} from 'react-masonry'
import Example from './../components/profile/testajax';
import { ninvoke } from 'q';

//Class imports
import scout from './../assets/imgs/icons/classes/scout.png';
import pocketScout from './../assets/imgs/icons/classes/pocketScout.png';
import soldier from './../assets/imgs/icons/classes/soldier.png';
import pocketSoldier from './../assets/imgs/icons/classes/pocketSoldier.png';
import demo from './../assets/imgs/icons/classes/demo.png';
import medic from './../assets/imgs/icons/classes/medic.png';
import demoAndSoldier from './../assets/imgs/icons/classes/demoAndSoldier.png';

const useFetch = url => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    async function fetchData() {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, []);

    return {loading,data};
};

const ProfilePage = (props) => {

    console.log('props = ', props);
    const {data, loading, error} = useFetch(`https://tempus.xyz/api/players/steamid/${props.match.params.steamID}/rank`);
    const fetchProfile = useFetch(`http://localhost:3001/users/${props.match.params.steamID}`);
    //const fetchTemus = useFetch(`http://localhost:3001/user_tempus/${props.match.params.steamID}`);

    let PROFILE_INFO = [
        {
            steamCommunityId: props.match.params.steamID,
        }
    ];

    let TEMPUS_HISTORY;
    let TEMPUS_POINTS;

    if(fetchProfile.data) {


        PROFILE_INFO = [
            {
                steamCommunityId: props.match.params.steamID,
                avatar: fetchProfile.data.data[0].avatar,
                steamName: fetchProfile.data.data[0].realname,
                discordName: 'Mac#2645',
                twitchName: fetchProfile.data,
                status: fetchProfile.data.data[0].personstate,
                twitchStatus: fetchProfile.data.data[0].avatar
            }
            
        ];
        console.log('DATA', fetchProfile.data.data[0].avatar);
        
    }

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
    }

    return (
        <>
            <RectangleContainer direction='column' maxWidth='600px'>
                { !fetchProfile && (
                    <div>Fetching Profile Data...</div>
                )}
                { fetchProfile && (
                    
                    <ProfileContainer userIcons={PROFILE_SVGS} userLinks={PROFILE_URLS} userData={PROFILE_INFO}/>
                )}
            </RectangleContainer> 
            <RectangleContainer direction='row' maxWidth='510px' minWidth='300px' header={'Overall'} >
                <LifeTimeStatContainer lifetimeStats={SVG_ICONS} />
            </RectangleContainer> 
            <RectangleContainer  minWidth='500px' header={'tempus progression'}>
                { !data && (
                    <div>Fetching Tempus Data...</div>
                )}
                { data && (
                    <TempusContainer tempusHistory={TEMPUS_HISTORY} tempusStats={TEMPUS_POINTS} />
                )}
            </RectangleContainer>
            <RectangleContainer direction='row' maxWidth='800px' minWidth='300px' header={'class wins'}>
                <ClassContainer classStats={CLASS_STATS} />
            </RectangleContainer>
            <Example/>
        </>
    )
};

export default ProfilePage;