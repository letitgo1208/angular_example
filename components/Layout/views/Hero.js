import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { prop } from 'styled-tools';
import Sticky from 'react-stickynode';

const Title = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    margin-left: -0.2rem;
    margin-bottom: ${prop('theme.sp.sm')};
    line-height: ${({ theme }) => theme.fsb * 3.2}rem;
    font-size: ${({ theme }) => theme.fsb * 3.6}rem;
    color: ${prop('theme.cbc')};
`;

const HeroContainer = styled.div`
    background: ${prop('theme.cb')};
`;

const HeroWrapper = styled.div`
    display: flex;
    background: ${prop('theme.cb')};
    padding: ${({ theme }) => theme.spb * 4}rem 0;
    margin-top: -${prop('theme.sp.lg')};
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 0;
    width: 114rem;
`;

const ContentWrapper = styled.div`
    flex-grow: 1;
`;

const Description = styled.p`
    margin: 0;
    font-size: ${({ theme }) => theme.fsb * 1.8}rem;
    color: ${prop('theme.cbcs[5]')};
    font-weight: 500;
`;

const IconWrapper = styled.div`
    margin-right: ${prop('theme.sp.lg')};
`;

const Hero = ({ renderIcon, title, description }) => (
    <Sticky innerZ={10}>
        <HeroContainer>
            <HeroWrapper>
                <IconWrapper>{renderIcon}</IconWrapper>
                <ContentWrapper>
                    <Title>{title}</Title>
                    <Description>{description}</Description>
                </ContentWrapper>
            </HeroWrapper>
        </HeroContainer>
    </Sticky>
);

Hero.defaultProps = {
    renderIcon: false,
    title: '',
    description: '',
};
Hero.propTypes = {
    renderIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};
Hero.displayName = 'Hero';

export default Hero;
