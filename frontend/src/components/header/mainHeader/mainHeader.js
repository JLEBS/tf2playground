import styled from 'styled-components';
import React, {useEffect, useState } from 'react';
import Colors from '../../../misc/colors';
import { Link, TitleLogo, Title } from '../../../misc/fonts';
import {MarginContainer} from '../../structure/containers';
import {LoginBtn, LogoutBtn} from '../../../components/buttons/steamBtn';
import {ReactComponent as Megaphone} from '../../../assets/imgs/icons/svgs/volume_mute_solid.svg'

// const useFetch = url => {
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [pending, setPending] = useState(false);

//     async function fetchData() {
//         if (!url) {
//             setPending(true);
//             return;
//         }

//         setPending(false);
//         const response = await fetch(url);
//         const json = await response.json();

//         setData(json);
//         setLoading(false)
//     }

//     useEffect(() => {
//         fetchData()
//     }, [ url ]);

//     return {
//         pending,
//         loading,
//         data
//     };
// };


const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pending, setPending] = useState(false);

    console.log('hello', url);
    function fetchData() {
        if (!url) {
            setPending(true);
            return false;
        }

        setPending(false);
       
        fetch(url, {
            credentials: 'include',
            'mode': 'cors'
        })
        .then(res => res.json())
        .then(res => {
            setData(res)
            setLoading(false)
        }).catch(err => {
            setData(false)
            setLoading(false)
        });
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

const MainHeader = styled.div`
    background-color: ${Colors.standard.secondary};
    width: 100%;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index:4;
`;

const SpeakerMod = styled(Megaphone)`
    height: 25px;
    color:white;
    margin-right:24px;
`;

const HeaderContainer = () => {
    const fetchUser = useFetch(`http://localhost:3001/profile`);
    return (
        <MainHeader>
            <MarginContainer sidepadding content='space-between'>
                <MarginContainer>
                    <TitleLogo header/>
                    <Title header>Playground</Title>
                </MarginContainer>
                <MarginContainer content='space-between' maxwidth='700px' float='right'>
                    <Link margin to="/about">about</Link>
                    <Link margin to="/rules">rules</Link>
                    <Link margin to="/stats">stats</Link>
                    <Link margin to="/conduct">conduct</Link>
                    <Link margin to="/donate">donate</Link>
                </MarginContainer>
                <MarginContainer direction='row' sidePadding='unset' topPadding='unset' content='space-between' align='center'>
                    <SpeakerMod/>
                    {!fetchUser.data && (
                        <LoginBtn smallbtn='true'/>
                    )}
                    {fetchUser.data && (
                        <div>{console.log('hello react')}
                        <LogoutBtn userData={fetchUser.data.data}/>
                        </div>
                    )}
                </MarginContainer>
            </MarginContainer>
        </MainHeader>
    );
}

export default HeaderContainer;