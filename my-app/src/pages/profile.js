import React from 'react';
import { ProfileContainer, ClassContainer, LifeTimeStatContainer, RectangleContainer, TempusContainer, PercentageContainer, TEMPUS_POINTS, CLASS_STATS, SVG_ICONS, PROFILE_URLS, PROFILE_INFO, COLORS, PROFILE_SVGS} from './../components/profile/infoRectangle'
import {Masonry} from 'react-masonry'

const ProfilePage = () => (
    
   <>
        <RectangleContainer direction='column' maxWidth='600px'>
            <ProfileContainer userIcons={PROFILE_SVGS} userLinks={PROFILE_URLS} userData={PROFILE_INFO}/>
        </RectangleContainer> 
        <RectangleContainer direction='row' maxWidth='510px' minWidth='300px' header={'Overall'} >
            <LifeTimeStatContainer lifetimeStats={SVG_ICONS} />
        </RectangleContainer> 
        <RectangleContainer maxWidth='700px' minWidth='250px' header={'tempus progression'}>
            <TempusContainer tempusStats={TEMPUS_POINTS} />
        </RectangleContainer>
        <RectangleContainer direction='row' maxWidth='800px' minWidth='300px' header={'class wins'}>
            <ClassContainer classStats={CLASS_STATS} />
        </RectangleContainer>
     </>
);
export default ProfilePage;