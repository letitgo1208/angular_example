import React from 'react';
import { withTheme } from 'styled-components';
import { defaultProps, propTypes } from '../props';
import SVGWrapper from '../views/SVGWrapper';

const Sms = props => (
    <SVGWrapper defaultWidth={80} defaultHeight={71} {...props}>
        <g
            stroke={props.stroke || props.theme.cp}
            strokeWidth="3.333"
            fillRule="evenodd"
            strokeLinejoin="round"
        >
            <path
                fill={props.fill || 'none'}
                strokeLinecap="round"
                d="M38.333 55.941L25 69.275V55.94H1.667V2.608h76.666v53.333z"
            />
            <path
                fill={props.fill || props.theme.cp}
                d="M20 32.608c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zM45 27.608c0 2.76-2.24 5-5 5s-5-2.24-5-5 2.24-5 5-5 5 2.24 5 5zM65 27.608c0 2.76-2.24 5-5 5s-5-2.24-5-5 2.24-5 5-5 5 2.24 5 5z"
            />
        </g>
    </SVGWrapper>
);

Sms.defaultProps = defaultProps;
Sms.propTypes = propTypes;

export default withTheme(Sms);
