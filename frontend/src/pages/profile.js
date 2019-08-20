import React, { useState, useEffect } from 'react';
import { ProfileContainer, ClassContainer, LifeTimeStatContainer, RectangleContainer, TempusContainer, PercentageContainer, CLASS_STATS, SVG_ICONS, PROFILE_URLS, COLORS, PROFILE_SVGS} from './../components/profile/infoRectangle';
//import {Masonry} from 'react-masonry'
import Example from './../components/profile/testajax';
//import { ninvoke } from 'q';
import { parse, format } from 'date-fns';

//Class imports
//import scout from './../assets/imgs/icons/classes/scout.png';
//import pocketScout from './../assets/imgs/icons/classes/pocketScout.png';
import soldier from './../assets/imgs/icons/classes/soldier.png';
//import pocketSoldier from './../assets/imgs/icons/classes/pocketSoldier.png';
import demo from './../assets/imgs/icons/classes/demo.png';
//import medic from './../assets/imgs/icons/classes/medic.png';
import demoAndSoldier from './../assets/imgs/icons/classes/demoAndSoldier.png';


let TEMPUS_DATA;
// let TEMPUS_HISTORY;
let TEMPUS_POINTS;
// let TEMPUS_HISTORY_MODIFIED;
let itsbeenrun = false;


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

    const {data, loading, error} = useFetch(`https://tempus.xyz/api/players/steamid/${props.match.params.steamID}/rank`);
    const fetchProfile = useFetch(`http://localhost:3001/users/${props.match.params.steamID}`);

    const fetchTempus = useFetch(
        fetchProfile.data
            ? `http://localhost:3001/tempus-history/${fetchProfile.data.data[0].user_id}`
            : null
    );

    let PROFILE_INFO = [
        {
            steamCommunityId: props.match.params.steamID,
        }
    ];

    //Fetch Profile Data
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
    }

    //Fetch SINGLE Tempus Data
    if(fetchTempus.data && fetchTempus.data.data) {
        //Most recent tempus record with index of 0


        console.log();


        TEMPUS_DATA = [
            {
                name: 'soldier', 
                image: soldier,
                points: fetchTempus.data.data[0].soldier_points,
                title: fetchTempus.data.data[0].soldier_title,
                rank: fetchTempus.data.data[0].soldier_rank,
                fluctuation: fetchTempus.data.data[1].soldier_rank - fetchTempus.data.data[0].soldier_rank
            },
            { 
                name: 'demo', 
                image: demo,
                points: fetchTempus.data.data[0].demo_points,
                title: fetchTempus.data.data[0].demo_title,
                rank: fetchTempus.data.data[0].demo_rank,
                fluctuation: fetchTempus.data.data[1].demo_rank - fetchTempus.data.data[0].demo_rank
            },
            { 
                name: 'total', 
                image: demoAndSoldier,
                points: fetchTempus.data.data[0].total_points, 
                rank: fetchTempus.data.data[0].total_rank,
                fluctuation: fetchTempus.data.data[1].total_rank - fetchTempus.data.data[0].total_rank
            }
        ]
      
        const TEMPUS_HISTORY = fetchTempus.data.data;

        var TEMPUS_HISTORY_MODIFIED = TEMPUS_HISTORY.map(item => {
            //const date = parse(item.timestamp)
            item.formattedDate = format(parse(item.timestamp), 'MMM')
            return item
        })
    }

    //Shouldn't use this anymore, this calls on the API rather than the SQL Database Will be used for registration instead
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
                { !fetchTempus && (
                    <div>Fetching Tempus Data...</div>
                )}
                { (fetchTempus.data) && (
                    <TempusContainer tempusStats={TEMPUS_DATA} tempusHistory={TEMPUS_HISTORY_MODIFIED} />
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