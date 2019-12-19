import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { prop } from 'styled-tools';
import { colorType } from 'utils/types';

const borderColor = ({ theme }) => theme.cbcs[2];
const vPadding = ({ theme }) => theme.spb * 5;
const hPadding = ({ theme }) => theme.spb * 2;

const TitleWrapper = styled.div`
    border: ${prop('theme.b')} solid ${borderColor};
    border-radius: ${prop('theme.br.lg')};
    background-color: ${prop('theme.cb')};
    padding: ${vPadding}rem 0 ${hPadding}rem;
    transition: ${prop('theme.ts.easeIn')};
`;

const ButtonWrapper = styled.div`
    position: relative;
    cursor: pointer;
    padding-top: ${({ theme }) => theme.spb * 3.5}rem;
    width: 100%;
    transition: ${prop('theme.ts.easeIn')};

    &:hover {
        padding-top: ${({ theme }) => theme.spb * 2.5}rem;

        ${TitleWrapper} {
            border-color: ${prop('color')};
            box-shadow: 0 1.5rem 5rem -2rem rgba(0, 0, 0, 0.4);
        }
    }
`;

const IconWrapper = styled.div`
    position: absolute;
    display: flex;
    width: 100%;
    justify-content: center;
    z-index: 10;
    bottom: ${({ theme }) => theme.spb * 6.5}rem;
`;

const ActionTitle = styled.div`
    text-align: center;
    color: ${prop('theme.cbc')};
    font-weight: 500;
    font-size: ${({ theme }) => theme.fsb * 2}rem;
`;

const ActionButton = ({ icon, color, children }) => (
    <ButtonWrapper color={color}>
        <IconWrapper>{icon}</IconWrapper>
        <TitleWrapper>
            <ActionTitle>{children}</ActionTitle>
        </TitleWrapper>
    </ButtonWrapper>
);

ActionButton.propTypes = {
    color: colorType.isRequired,
    icon: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
};
ActionButton.displayName = 'ActionButton';

export default ActionButton;
