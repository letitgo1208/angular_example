import React from 'react';
import { withTheme } from 'styled-components';
import { defaultProps, propTypes } from '../props';
import SVGWrapper from '../views/SVGWrapper';

const VerticalDots = props => (
    <SVGWrapper defaultWidth={4} defaultHeight={18} {...props}>
        <g fill={props.fill || props.theme.cbcs[5]} fillRule="evenodd">
            <circle cx="2" cy="2" r="2" />
            <circle cx="2" cy="9" r="2" />
            <circle cx="2" cy="16" r="2" />
        </g>
    </SVGWrapper>
);

VerticalDots.defaultProps = defaultProps;
VerticalDots.propTypes = propTypes;

export default withTheme(VerticalDots);
