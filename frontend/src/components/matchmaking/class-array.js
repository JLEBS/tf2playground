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

//Sounds
import rocket from './../../assets/audio/weapons/rocket.mp3';
import scattergun from './../../assets/audio/weapons/scattergun.mp3';
import sticky from './../../assets/audio/weapons/stickybomb.mp3';
import medigun from './../../assets/audio/weapons/medigun.mp3';

const ClassSounds = {
  pocketScout: scattergun,
  flankScout: scattergun,
  roamerSoldier : rocket,
  pocketSoldier : rocket,
  demo : sticky,
  medic: medigun
}

const ClassImages = {
  pocketScout: {
    name: 'Pocket scout',   
    icon: pocketScoutIcon,
    torso: pocketScoutTorso
  },
  flankScout: {
    name: 'Flank scout',
    icon: flankScoutIcon,
    torso: flankScoutTorso
  },
  pocketSoldier: {
    name: 'Pocket',
    icon: pocketSoldierIcon,
    torso: pocketSoldierTorso
  },
  roamerSoldier: {
    name: 'Roamer',
    icon: roamerSoldierIcon,
    torso: roamerSoldierTorso
  },
  demo: {
    name: 'Demo',
    icon: demoIcon,
    torso: demoTorso
  },
  medic: {
    name: 'Medic',
    icon: medicIcon,
    torso: medicTorso
  }
};

export {ClassImages, ClassSounds};