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


const PROFILE_INFO = [
    {
        steamId: '[U:1:81264176]',
        steamCommunityId: '76561198041529904',
        avatar: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ec/ecb8f3dd89bcd796eaaeb77d5547794053cfb120_full.jpg',
        steamName: 'eepily',
        discordName: 'eepily#2645',
        twitchName: 'eepily',
        status: 1,
        twitchStatus: true
    }
];

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

// const TEMPUS_POINTS = [
//     {
//         id: 1,
//         name: 'soldier',
//         shortName: 'soldier',
//         image: soldier,
//         rank: 1,
//         points: 248433,
//     },
//     {
//         id: 2,
//         name: 'demoman',
//         shortName: 'demo',
//         image: demo,
//         rank: 10,
//         points: 66398
//     },
//     {
//         id: 3,
//         name: 'average',
//         shortName: 'total',
//         image: demoAndSoldier,
//         rank: 1,
//         points: 314831
//     }
// ];


const ProfilePage = () => {

    let test;
    const {loading,data} = useFetch(`https://tempus.xyz/api/players/steamid/${PROFILE_INFO[0].steamCommunityId}/rank`);

    let TEMPUS_POINTS;
    // const NEW_TEMPUS = {
    //     className1: {
    //         title: 'noble',
    //         image: 'soldier',
    //         rank: 0,
    //         points: 0,
    //     },
    //     className2: {
    //         title: 'esquire',
    //         image: 'demo',
    //         rank: 0,
    //         points: 0
    //     },
    //     total: {
    //         title: null,
    //         image: 'demoAndSoldier',
    //         rank: 0,
    //         points: 0
    //     }
    // };



    if (data) {
        
        const names = {
            3: 'data',
            4: 'data',
            'total': 'data'
        }

        const images = {

        }
        
        const TEMPUS_INFO = {...data.class_rank_info};
        TEMPUS_INFO.total = {...data.rank_info};

        TEMPUS_POINTS = Object.keys(TEMPUS_INFO).map((key) => {
            const newKey = names[key] || key;
            return { [newKey] : TEMPUS_INFO[key] };
        });
    }

    return (
        <>
            <RectangleContainer direction='column' maxWidth='600px'>
                <ProfileContainer userIcons={PROFILE_SVGS} userLinks={PROFILE_URLS} userData={PROFILE_INFO}/>
            </RectangleContainer> 
            <RectangleContainer direction='row' maxWidth='510px' minWidth='300px' header={'Overall'} >
                <LifeTimeStatContainer lifetimeStats={SVG_ICONS} />
            </RectangleContainer> 
            <RectangleContainer  minWidth='500px' header={'tempus progression'}>
                { !data && (
                    <div>Fetching Tempus Data...</div>
                )}
                { data && (
                    <TempusContainer tempusStats={TEMPUS_POINTS} />
                )}
            </RectangleContainer>
            <RectangleContainer direction='row' maxWidth='800px' minWidth='300px' header={'class wins'}>
                <ClassContainer classStats={CLASS_STATS} />
            </RectangleContainer>
            {/* <Example/> */}
        </>
    )
};
export default ProfilePage;