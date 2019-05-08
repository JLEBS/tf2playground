import React from 'react';
import HeaderContainer from '../header/mainHeader/mainHeader';
import SubHeaderContainer from '../header/subHeader/subHeader';
import {PageContainer, FlexColumn} from './containers';


//For landing and login page
export const LandingLayout = ({children}) => (
    <PageContainer>
        {children}
    </PageContainer>
);

//Lobby Layout
export const Layout = ({children}) => (
    <PageContainer>
        <HeaderContainer/>
        <SubHeaderContainer/>
       {children}
    </PageContainer>
 
);