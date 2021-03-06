import styled, {css} from 'styled-components';
import {fluidRange} from 'polished';
import Colors from './colors';
import {Link as ReactRouterLink} from 'react-router-dom';
import tf2logo from './../assets/imgs/themes/tf2logo.png';

const colorPrimary = Colors.standard.primary;
const colorSecondary = Colors.standard.secondary;

export const TitleLogo = styled.div`
  background-image: url(${tf2logo});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  display: block;
  position: relative;
  height: 0;
  cursor: pointer;

  ${props => props.main && css`
    width: 40%;
    padding-bottom: 170px;
    max-width: 800px;
    min-width: 500px;
  `}

  ${props => props.header && css`
    width: 20%;
    padding-bottom: 90px;
    min-width: 300px;
    margin-top:10px;
  `}
`;

export const Title = styled.h1`
  font-style: normal;
  font-size: 70px;
  font-weight: 900;
  text-transform: uppercase;
  color: ${colorPrimary};
  text-shadow: -3px -3px  #000000;
  display: inline-block;

  ${props => props.main && css`
    font-size: 70px;
  `}

  ${props => props.header && css`
    font-size: 36px;
    margin: 0 auto;
  `}

  ${props => props.banner && css`
    ${fluidRange(
      {
          prop: 'font-size',
          fromSize: '36px',
          toSize: '70px',
      },
    '400px',
    '2000px',
    )}

    line-height:71px;
    margin: 0 auto;
    padding-top:60px;
    padding-bottom: 60px;
    flex: 1;
  `}
`;

export const LobbyFont = styled.p`
  font-style: normal;
  font-weight: 600;
  text-transform: uppercase;
  line-height: 150%;
`;

export const ProfileDropdown = styled(ReactRouterLink)`
  padding: 8px 0px 8px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  color: inherit;
  opacity: 0.6;
  transition: all 0.3s ease-in-out;
  &:hover{
    opacity: 1;
  }
`;

export const Link = styled(ReactRouterLink)`
  color: inherit;
  display: block;
`;

export const MinorFont = styled.p`
  font-style: normal;
  font-size: 14px;
  line-height: 16px;

  ${props => props.lobby && css`
    color: ${colorPrimary};
  `}

  ${props => props.user && css`
    color: ${colorSecondary};
  `}
`;

export const BtnText = styled.p`
  font-weight: 600;
  font-style: normal;
  text-transform: uppercase;

  ${props => props.largebtn && css`
    font-size:24px;
  `}

  ${props => props.smallbtn && css`
    font-size: 12px;
    text-align: right;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 110px;
    margin-left: 8px;
  `}
`;

export const UserHeading = styled.h2`
  font-size: 24px;
  font-weight: 600;
  font-style: normal;
  text-align: center;
  text-transform: capitalize;
  color: ${colorPrimary};
  position:relative;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

${props => props.heading && css`
  background-color: ${Colors.standard.secondary};
  border-radius: 10px 10px 0px 0px;
  letter-spacing: 1.5px;

  ${fluidRange(
    {
        prop: 'padding',
        fromSize: '12px',
        toSize: '24px',
    },
    '1200px',
    '2000px',
  )}

  @media (max-width: 500px){
    border-radius: unset;
  }

  &::after{
    content: '>';
    position:absolute;
    right: 0;
    padding: 20px;
    cursor: pointer;
    font-size: 16px;
  }

  &::before{
    content: '<';
    position:absolute;
    left: 0;
    padding: 20px;
    cursor: pointer;
    font-size: 16px;
  }
  `}
`;

export const UserSubHeading = styled.h3`
  font-style: normal;
  font-size: 18px;
  font-weight: 600;
  text-transform: capitalize;
  color: ${colorSecondary};
  float: left;
  padding:10px;

  ${props => props.color && css`
    color: ${props.color};
    background-color: black;
  `}
`;

export const UserContent = styled.h4`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  text-transform: capitalize;
  color: ${colorSecondary};
  float: left;

  ${props => props.grow && css`
    min-width: 120px;
  `};
`;

export const UserLinks = styled.h3`
  font-style: normal;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: ${colorSecondary};
  text-align: center;
`;


//Numerical calculator, 
export const UserValue = styled.div`
  color: black;
  font-style: normal;
  font-size: 16px;
  font-weight: 600;
  width:60px;
  text-align: center;
  text-transform: uppercase;

  ${props => props.percentage && css`
    max-width: 40px;
    position: absolute;
    left: 8px;
    height: 100%;
    max-width: 40px;
    font-size: 12px;
    font-weight: 600;
    padding-top:0px;

    :after{
      content:'%';
    }
  `};

  ${props => props.rank && css`
    :before{
      content:'#';
    }
  `};
`;

export const TempusTitle = styled.span`
  color: ${props => props.color};
  font-weight: 600;
  text-transform: capitalize;

  &::before{
    color: ${props => props.bracket};
    content: '[';
  }

  &::after{
    color: ${props => props.bracket};
    content: ']';
  }
`;

export const Fluctuation = styled.div`
  display: flex;

  &.neutral{
    svg{
      transform: rotate(90deg);
    }
  };

  &.increase{
    color: ${Colors.standard.green};
    .tempus-change::before{
      content: '+';
    }
  };

  &.decrease{
    color: ${Colors.standard.red};
    svg{
      transform: rotate(180deg);
    }
  };
`;

export const Notification = styled.div`
  font-family: tf2-secondary;
  font-weight: bold;
  color: #5C7A8B;
  background-color: #F1E9CC;
  padding:1em;
  border-radius: 20px;
`;