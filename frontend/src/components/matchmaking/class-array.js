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
    id: 'pocket-scout',
    name: 'pocket scout',
    icon: pocketScoutIcon,
    torso: pocketScoutTorso
  },
  {
    id: 'flank-scout',
    name: 'flank scout',
    icon: flankScoutIcon,
    torso: flankScoutTorso
  },
  {
    id: 'pocket-soldier',
    name: 'pocket',
    icon: pocketSoldierIcon,
    torso: pocketSoldierTorso
  },
  {
    id: 'roamer-soldier',
    name: 'roamer',
    icon: roamerSoldierIcon,
    torso: roamerSoldierTorso
  },
  {
    id: 'demoman',
    name: 'demoman',
    icon: demoIcon,
    torso: demoTorso
  },
  {
    id: 'medic',
    name: 'medic',
    icon: medicIcon,
    torso: medicTorso
  }
];

export default classSelectionArray;