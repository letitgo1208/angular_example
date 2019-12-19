import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { prop } from 'styled-tools';

const HeaderWrapper = styled.div`
    position: relative;
    margin-bottom: ${({ theme }) => theme.spb * 3}rem;
`;

const IconWrapper = styled.div`
    position: absolute;
    display: flex;
    width: 100%;
    justify-content: center;
    top: -${({ theme }) => theme.spb * 4.5}rem;
`;

const PaperWrapper = styled.div`
    border-radius: ${prop('theme.br.lg')};
    background-color: ${prop('theme.cb')};
    margin-top: ${({ theme }) => theme.spb * 3}rem;
`;

const ActionsWrapper = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    display: flex;

    > * {
        &:not(:last-child) {
            margin-right: ${prop('theme.sp.lg')};
        }
        &:first-child {
            margin-left: auto;
        }
    }
`;

const TitleWrapper = styled.div`
    text-align: center;
    color: ${prop('theme.cbc')};
    font-weight: 500;
    font-size: ${({ theme }) => theme.fsb * 2}rem;
`;

const RichHeader = ({ icon, actions, title }) => (
    <HeaderWrapper>
        {icon && <IconWrapper>{icon}</IconWrapper>}
        <PaperWrapper>
            {actions.length > 0 && <ActionsWrapper>{actions}</ActionsWrapper>}
            <TitleWrapper>{title}</TitleWrapper>
        </PaperWrapper>
    </HeaderWrapper>
);

RichHeader.displayName = 'RichHeader';
RichHeader.defaultProps = {
    actions: [],
    icon: false,
};
RichHeader.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
    actions: PropTypes.arrayOf(PropTypes.node.isRequired),
};

export default RichHeader;
