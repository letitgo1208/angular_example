import React from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';
import { colorType } from 'types';

const thickness = props => props.thickness / 10;
const color = props => (props.color ? props.color : props.theme.cpc);
const size = props => props.size / 10 * props.theme.szb;

const direction = props => {
    switch (props.direction) {
        case 'up':
            return '-135';
        case 'right':
            return '-45';
        case 'down':
            return '45';
        case 'left':
            return '135';
        default:
            return '45';
    }
};

const translate = props => {
    switch (props.direction) {
        case 'up':
            return 'translate(-50%, 15%)';
        case 'right':
            return 'translateX(-65%)';
        case 'down':
            return 'translate(-50%, -15%)';
        case 'left':
            return 'translateX(-35%)';
        default:
            return 'translateX(-50%)';
    }
};

const transform = props =>
    props.hover
        ? `${translate(props)} rotate(${direction(props)}deg)`
        : `rotate(${direction(props)}deg)`;

const ArrowIcon = styled.div`
    padding: ${size}rem;
    border: solid ${color};
    border-width: 0 ${thickness}rem ${thickness}rem 0;
    cursor: pointer;
    position: relative;
    transform: ${transform};
    display: inline-block;
    ${({ hover }) => hover && 'left: 50%;'};
`;

const Arrow = props => <ArrowIcon {...props} />;

Arrow.defaultProps = {
    direction: 'down',
    size: 3,
    thickness: 2,
    hover: false,
};

/* eslint-disable react/no-unused-prop-types */
Arrow.propTypes = {
    direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),
    // We can't access the theme in the default props
    // eslint-disable-next-line react/require-default-props
    color: colorType,
    size: PropTypes.number,
    thickness: PropTypes.number,
    hover: PropTypes.bool,
};

Arrow.displayName = 'Arrow';

export default styled(Arrow)``;
