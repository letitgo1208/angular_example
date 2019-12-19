import React from 'react';
import { withTheme } from 'styled-components';
import { defaultProps, propTypes } from '../props';
import SVGWrapper from '../views/SVGWrapper';

const ArrowRight = props => (
    <SVGWrapper defaultWidth={7} defaultHeight={11} {...props}>
        <g
            stroke={props.fill || props.theme.cpc}
            strokeWidth={props.thickness || 2}
            fill="none"
            fillRule="evenodd"
            strokeLinecap="square"
        >
            <path d="M2 9l3.523-3.523M2 2l3.523 3.523" />
        </g>
    </SVGWrapper>
);

ArrowRight.defaultProps = defaultProps;
ArrowRight.propTypes = propTypes;

export default withTheme(ArrowRight);
