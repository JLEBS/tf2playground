import React from 'react';
import { ClassContainer, LifeTimeStatContainer, RectangleContainer, TempusContainer, Chart, TEMPUS_POINTS, CLASS_STATS, SVG_ICONS} from './../components/profile/infoRectangle'

const ProfilePage = () => (
    <>
       <RectangleContainer  maxWidth='500px' minWidth='350px' header={'Overall'} content={'space-between'}>
            <LifeTimeStatContainer lifetimeStats={SVG_ICONS} />
        </RectangleContainer> 
        <RectangleContainer direction='column' maxWidth='400px' minWidth='350px' header={'class wins'} content={'space-between'}>
            <ClassContainer classArray={CLASS_STATS} />
        </RectangleContainer>
        <RectangleContainer direction='column' maxWidth='600px' minWidth='250px' header={'tempus progression'} content={'space-between'}>
            <TempusContainer tempusStats={TEMPUS_POINTS} />
        </RectangleContainer>
    </>
);
export default ProfilePage;