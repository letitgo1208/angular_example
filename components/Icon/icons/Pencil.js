import React from 'react';
import { withTheme } from 'styled-components';
import { defaultProps, propTypes } from '../props';
import SVGWrapper from '../views/SVGWrapper';

const Pencil = props => (
    <SVGWrapper defaultWidth={19} defaultHeight={19} {...props}>
        <g
            stroke={props.stroke || props.theme.cbcs[5]}
            fill="none"
            fillRule="evenodd"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5.47 17.256L.622 18.394l1.138-4.849 11.7-11.701a1.501 1.501 0 0 1 2.122 0l1.591 1.59a1.502 1.502 0 0 1 0 2.122l-11.701 11.7zM16.643 6.088l-3.715-3.715M15.573 7.159l-3.706-3.724M5.66 17.068l-3.713-3.712" />
        </g>
    </SVGWrapper>
);

Pencil.defaultProps = defaultProps;
Pencil.propTypes = propTypes;

export default withTheme(Pencil);
