import React from 'react';
import { withTheme } from 'styled-components';
import { defaultProps, propTypes } from '../props';
import SVGWrapper from '../views/SVGWrapper';

const Hybrid = props => (
    <SVGWrapper defaultWidth={25} defaultHeight={25} {...props}>
        <g
            stroke={props.stroke || props.theme.cpc}
            strokeWidth="1.2"
            fill={props.fill || 'none'}
            fillRule="evenodd"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M1 4h13V1H1zM11 15h13v-3H11zM1 24h13v-3H1zM8 4v3.5C8 8.327 8.672 9 9.5 9h3a1.5 1.5 0 0 1 1.5 1.5V12M19 15v5.5a1.5 1.5 0 0 1-1.5 1.5H14" />
        </g>
    </SVGWrapper>
);

Hybrid.defaultProps = defaultProps;
Hybrid.propTypes = propTypes;

export default withTheme(Hybrid);
