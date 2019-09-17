import React,  { useState } from 'react';
import styled from 'styled-components';
import ScoutPocket from '../../assets/imgs/characters/scout-pocket-torso.png';
import ScoutFlank from '../../assets/imgs/characters/scout-flank-torso.png';
import SoldierPocket from '../../assets/imgs/characters/soldier-pocket-torso.png';
import SoldierRoamer from '../../assets/imgs/characters/soldier-roamer-torso.png';
import Demo from '../../assets/imgs/characters/demo-torso.png';
import Medic from '../../assets/imgs/characters/medic-torso.png';

const ImageArray = {
    scoutPocket: {
        class: 'pocket-scout-slider',
        img: ScoutPocket,
        left: '100px'
    },
    scoutFlank: {
        class: 'flank-scout-slider',
        img: ScoutFlank,
        left: '300px'
    },
    {
        class: 'pocket-soldier-slider',
        img: SoldierPocket,
        left: '500px'
    },
    {
        class: 'roamer-soldier-slider',
        img: SoldierRoamer,
        left: '700px'
    },
    {
        class: 'demo-slider',
        img: Demo,
        left: '900px'
    },
    {
        class: 'medic-slider',
        img: Medic,
        left: '1200px'
    }
}

const Image = styled.div`
    ${props => `background-image: url(${props.imageUrl});`}
    background-size: cover;
    padding-top: 440px;
    position: fixed;
    z-index: 4;
    bottom: -500px;
    ${props => `left: ${props.left};`}
    width: 600px;
    transition: all 3s ease-in-out;
`;

const SlideImageContainer = styled.div`
`;

const CharacterPopup = ({selected}) => {

    // const [active, inactive] = useState(0);

    console.log(imageArray[selected]);

    return(
        <SlideImageContainer>
            <Image 
                className={`${active ? 'active' : 'inactive'}`}
                id={e.class}
                imageUrl={e.img}
                left={e.left}
                text={e.text}
                key={key} // <-- herer
            />
        </SlideImageContainer>
    );
}

export default CharacterPopup;