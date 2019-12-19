import React from 'react';
import { withTheme } from 'styled-components';
import { defaultProps, propTypes } from '../props';
import SVGWrapper from '../views/SVGWrapper';

const ArrowDown = props => (
    <SVGWrapper defaultWidth={11} defaultHeight={6} {...props}>
        <g
            transform="rotate(-47 2.128 .925)"
            fill={props.fill || props.theme.cpc}
            fillRule="evenodd"
        >
            <rect
                transform="rotate(8 4.476 6.552)"
                x="1.143"
                y="5.885"
                width="6.667"
                height="1.333"
                rx=".667"
            />
            <rect
                transform="rotate(-8 1.44 3.526)"
                x=".773"
                y=".193"
                width="1.333"
                height="6.667"
                rx=".667"
            />
        </g>
    </SVGWrapper>
);

ArrowDown.defaultProps = defaultProps;
ArrowDown.propTypes = propTypes;

export default withTheme(ArrowDown);
