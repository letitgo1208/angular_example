import React from 'react';
import { withTheme } from 'styled-components';
import { defaultProps, propTypes } from '../props';
import SVGWrapper from '../views/SVGWrapper';

const Busy = props => (
    <SVGWrapper defaultWidth={24} defaultHeight={24} {...props}>
        <g
            stroke={props.stroke || props.theme.cpc}
            fill={props.fill || 'none'}
            fillRule="evenodd"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M23.478 12c0 6.338-5.14 11.478-11.478 11.478C5.66 23.478.522 18.338.522 12 .522 5.66 5.66.522 12 .522 18.338.522 23.478 5.66 23.478 12zM18.26 12H5.74" />
        </g>
    </SVGWrapper>
);

Busy.defaultProps = defaultProps;
Busy.propTypes = propTypes;

export default withTheme(Busy);
