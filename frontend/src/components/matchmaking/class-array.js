//Icons
import pocketScoutIcon from './../../assets/imgs/icons/classes/pocketScout.png';
import flankScoutIcon from './../../assets/imgs/icons/classes/scout.png';
import pocketSoldierIcon from './../../assets/imgs/icons/classes/pocketSoldier.png';
import roamerSoldierIcon from './../../assets/imgs/icons/classes/soldier.png';
import demoIcon from './../../assets/imgs/icons/classes/demo.png';
import medicIcon from './../../assets/imgs/icons/classes/medic.png';

//Torso
import pocketScoutTorso from './../../assets/imgs/characters/scout-pocket-torso.png';
import flankScoutTorso from './../../assets/imgs/characters/scout-flank-torso.png';
import pocketSoldierTorso from './../../assets/imgs/characters/soldier-pocket-torso.png';
import roamerSoldierTorso from './../../assets/imgs/characters/soldier-roamer-torso.png';
import demoTorso from './../../assets/imgs/characters/demo-torso.png';
import medicTorso from './../../assets/imgs/characters/medic-torso.png';

const classSelectionArray = [
  {   
    id: 0,
    name: 'pocket-scout-selected',
    icon: pocketScoutIcon,
    torso: pocketScoutTorso
  },
  {
    id: 1,
    name: 'flank-scout-selected',
    icon: flankScoutIcon,
    torso: flankScoutTorso
  },
  {
    id: 2,
    name: 'pocket-soldier-selected',
    icon: pocketSoldierIcon,
    torso: pocketSoldierTorso
  },
  {
    id: 3,
    name: 'roaming-soldier-selected',
    icon: roamerSoldierIcon,
    torso: roamerSoldierTorso
  },
  {
    id: 4,
    name: 'demoman-selected',
    icon: demoIcon,
    torso: demoTorso
  },
  {
    id: 5,
    name: 'medic-selected',
    icon: medicIcon,
    torso: medicTorso
  }
];

export default classSelectionArray;