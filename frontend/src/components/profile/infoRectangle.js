import React from 'react';
import styled from 'styled-components';
import {UserHeading} from '../../misc/fonts';
import {MarginContainer} from '../structure/containers';
import Colors from '../../misc/colors';

//Main Wrapper for each content section
const InfoRectangle = styled.div`
    border-radius: 10px;
    background-color: ${Colors.standard.primary};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    ${props => `max-width: ${props.maxWidth};`};
    ${props => `min-width: ${props.minWidth};`};

    @media (max-width: 510px){
        width: 100%;
        border-radius: unset;
        box-shadow: unset;
    }
`;

const RectangleContainer = ({header, children, maxWidth, minWidth, direction, content}) => (
    <InfoRectangle maxWidth={maxWidth} minWidth={minWidth}>
        {header && (
            <UserHeading heading>
                {header}
            </UserHeading>
        )}
        <MarginContainer classname='sdsf' content={'space-between'} sidepadding verticalpadding shrink direction={direction}  >
            {children}
        </MarginContainer>
    </InfoRectangle>
);

export { RectangleContainer}