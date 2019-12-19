import React from 'react';
import { withTheme } from 'styled-components';
import { defaultProps, propTypes } from '../props';
import SVGWrapper from '../views/SVGWrapper';

const Note = props => (
    <SVGWrapper defaultWidth={80} defaultHeight={59} {...props}>
        <g
            stroke={props.stroke || '#C8B67F'}
            fill={props.fill || 'none'}
            fillRule="evenodd"
            strokeLinejoin="round"
        >
            <path
                strokeWidth="3.33"
                fill={props.fill || 'none'}
                d="M51.667 38.085v18.957h-50V2.54h76.666v35.544z"
            />
            <path d="M78.333 38.085L51.667 57.042" strokeWidth="3.33" />
            <path
                strokeWidth="3.926"
                strokeLinecap="round"
                d="M16.667 25.167L20 21.25c1.84-2.162 4.827-2.162 6.667 0 1.84 2.162 4.826 2.162 6.666 0 1.84-2.162 4.827-2.162 6.667 0 1.84 2.162 4.827 2.162 6.667 0 1.84-2.162 4.826-2.162 6.666 0 1.84 2.162 4.827 2.162 6.667 0l3.333-3.917M16.667 44.75L20 40.833c1.84-2.162 4.827-2.162 6.667 0 1.84 2.162 4.826 2.162 6.666 0"
            />
        </g>
    </SVGWrapper>
);

Note.defaultProps = defaultProps;
Note.propTypes = propTypes;

export default withTheme(Note);
