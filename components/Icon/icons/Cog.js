import React from 'react';
import { withTheme } from 'styled-components';
import { defaultProps, propTypes } from '../props';
import SVGWrapper from '../views/SVGWrapper';

const Cog = props => (
    <SVGWrapper defaultWidth={35} defaultHeight={35} {...props}>
        <g
            stroke={props.stroke || props.theme.cbcs[5]}
            fill={props.fill || 'none'}
            fillRule="evenodd"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M29.537 19.688h4.734v-4.375h-4.736c-.304-1.265-.803-3.181-1.462-4.262l3.348-3.347-4.126-4.125-3.35 3.348c-1.078-.66-2.993-1.156-4.258-1.461V.729h-4.375v4.737c-1.264.305-3.18.802-4.26 1.461L7.703 3.58 3.578 7.704l3.35 3.349c-.66 1.079-1.158 2.995-1.464 4.26H.729v4.374h4.734c.306 1.265.805 3.181 1.464 4.26l-3.35 3.35 4.126 4.124 3.348-3.35c1.08.661 2.997 1.16 4.261 1.466v4.734h4.375v-4.734c1.265-.306 3.181-.805 4.259-1.464l3.35 3.348 4.125-4.124-3.348-3.35c.659-1.079 1.158-2.995 1.464-4.26z" />
            <path d="M24.063 17.5a6.562 6.562 0 1 1-13.125 0 6.563 6.563 0 0 1 13.124 0z" />
        </g>
    </SVGWrapper>
);

Cog.defaultProps = defaultProps;
Cog.propTypes = propTypes;

export default withTheme(Cog);
