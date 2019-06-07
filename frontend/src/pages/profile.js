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

const PROFILE_sdsINFOss = [
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

const PROFsdfsfILE_INFO = [
    {
        steamId: '[U:1:81264176]',
        steamCommunityId: '76561198028929109',
        avatar: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/05/051ff2ea8a6ac560f2410dc38952dea2b93122f8_full.jpg',
        steamName: 'planck',
        discordName: 'planck#2645',
        twitchName: 'planccck',
        status: 1,
        twitchStatus: true
    }
];

const PROFILsdsfE_INFO = [
    {
        steamId: '[U:1:81264176]',
        steamCommunityId: '76561198041285102',
        avatar: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/b1/b1869d8a45b5cf9c05f6288f5a18a496d7ef0915_full.jpg',
        steamName: '009eff',
        discordName: '009eff#2645',
        twitchName: '009eff',
        status: 1,
        twitchStatus: true
    }
];

const PROFILE_INFO = [
    {
        steamId: '[U:1:81264176]',
        steamCommunityId: '76561198001371660',
        avatar: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/82/8238710cae8e9aa37c07adb5362992950cb288fe_full.jpg',
        steamName: 'Mac',
        discordName: 'Mac#2645',
        twitchName: 'Mac',
        status: 1,
        twitchStatus: true
    }
];

const PROFILE_INFOb = [
    {
        steamId: '[U:1:81264176]',
        steamCommunityId: '76561198046601398',
        avatar: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/f6/f6723c28f8dbc034330c57b4a5a6d6cc9228d683_full.jpg',
        steamName: 'Boshy',
        discordName: 'Boshy#2645',
        twitchName: 'Boshy',
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

const ProfilePage = () => {

    const {loading,data} = useFetch(`https://tempus.xyz/api/players/steamid/${PROFILE_INFO[0].steamCommunityId}/rank`);

    let TEMPUS_POINTS;

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