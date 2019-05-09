import React from 'react';
import snakewater from './../assets/imgs/maps/snakewater.jpg';
import HeaderContainer from '../components/header/mainHeader/mainHeader';
import {Wrapper, FlexColumn, TextOverlay} from './../components/structure/containers';
import {LobbyFont} from './../misc/fonts';

const AboutPage = () => (
    <div>
        <LobbyFont paragraph>  
            Playground was initially concieved as a spiritual successor to TF2Pickup, a popular PUG website that saw popularity amongst the TF2 community during the breif period in which it saw use. Now defunct, no replacement has filled the void of TF2Pickup’s legacy, primarily due to the immese popularity of both PugChamp and TF2Center. These websites are problamatic for a variety of reasons, TF2center allows anyone to play games are rarley close and the skill cieling remains low, it also makes it incredibly easy to stack players together to give one team an unfair advantage. 
        </LobbyFont>
        <LobbyFont paragraph>    
            PugChamp worked in a similar vain to TF2Pickup, the main issue is the opposite of TF2Center, where only very specific individuals get chance to play due to the picking system. This results in only the best players/regular players from being picked, which is offputting to players of a lower skillset or are less regular.
        </LobbyFont> 
        <LobbyFont paragraph>  
            To rectify this, the main goal of TF2Playground is emulate the mechanics of TF2Pickup whilst simplifying the design to be as minimal as possible. This lobby system will not support highlander or simultaneous lobbies, and will exlusively support 6 vs 6. Whereas tf2pickup would pre-emitvely choose the map, TF2Playground allows players to choose the map themselves through a voting system, which unlike pugchamp, is not exclusive to only captains.
        </LobbyFont> 
    </div>
);

export default AboutPage;