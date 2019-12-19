import React from 'react';
import { withTheme } from 'styled-components';
import { defaultProps, propTypes } from '../props';
import SVGWrapper from '../views/SVGWrapper';

const Flow = props => (
    <SVGWrapper defaultWidth={23} defaultHeight={22} {...props}>
        <g
            stroke={props.stroke || props.theme.cpc}
            strokeWidth="1.2"
            fill={props.fill || 'none'}
            fillRule="evenodd"
            strokeLinejoin="round"
        >
            <path d="M22.364 1.455L1.454 10.09l8.182 3.182zM22.364 1.455l-3.637 16.818-9.09-5zM9.636 13.273v7.272l3.182-5.454" />
        </g>
    </SVGWrapper>
);

Flow.defaultProps = defaultProps;
Flow.propTypes = propTypes;

export default withTheme(Flow);
