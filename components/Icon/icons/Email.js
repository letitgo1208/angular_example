import React from 'react';
import { withTheme } from 'styled-components';
import { defaultProps, propTypes } from '../props';
import SVGWrapper from '../views/SVGWrapper';

const Email = props => (
    <SVGWrapper defaultWidth={80} defaultHeight={55} {...props}>
        <g
            stroke={props.stroke || '#F6CC85'}
            strokeWidth="3.333"
            fill="none"
            fillRule="evenodd"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path
                fill={props.fill || 'none'}
                d="M78.333 47.375c0 2.743-2.24 4.969-5 4.969H6.667c-2.76 0-5-2.226-5-4.969V7.625c0-2.746 2.24-4.969 5-4.969h66.666c2.76 0 5 2.223 5 4.969v39.75z"
            />
            <path d="M68.333 15.906L40 34.125 11.667 15.906M11.667 40.75l11.666-6.625M68.333 40.75l-11.666-6.625" />
        </g>
    </SVGWrapper>
);

Email.defaultProps = defaultProps;
Email.propTypes = propTypes;

export default withTheme(Email);
