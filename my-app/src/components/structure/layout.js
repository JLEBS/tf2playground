import React from 'react';
import HeaderContainer from '../header/mainHeader/mainHeader';

const LandingLayout = ({children}) => (
    <div>   
        <div>{children}</div>
    </div>
);

const Layout = ({children}) => (
    <div>
        <HeaderContainer/>
        <div>{children}</div>
    </div>
);

export default Layout;

//this is a layout page