import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { prop } from 'styled-tools';
import omit from 'lodash/omit';

import Hero from '../views/Hero';

const Body = styled.div`
    background: ${prop('theme.cbcs[1]')};
    min-height: 100vh;
    padding-top: ${({ theme }) => theme.spb * 6}rem;
    padding-bottom: ${({ theme }) => theme.spb * 4}rem;
`;

const HeroLayout = props => {
    const adjustedProps = omit(props, [props.children]);
    return (
        <div>
            <Hero {...adjustedProps} />
            <Body>{props.children}</Body>
        </div>
    );
};

HeroLayout.defaultProps = {
    children: false,
};
HeroLayout.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
};

HeroLayout.displayName = 'HeroLayout';

export default HeroLayout;
