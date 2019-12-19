import React from 'react';
import { withTheme } from 'styled-components';
import { defaultProps, propTypes } from '../props';
import SVGWrapper from '../views/SVGWrapper';

const Search = props => (
    <SVGWrapper defaultWidth={22} defaultHeight={22} {...props}>
        <g
            stroke={props.stroke || props.theme.cpc}
            strokeWidth="1.2"
            fill="none"
            fillRule="evenodd"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18.083 9.75a8.334 8.334 0 1 1-16.667 0 8.334 8.334 0 0 1 16.667 0zM15.644 15.645l4.94 4.938" />
        </g>
    </SVGWrapper>
);

Search.defaultProps = defaultProps;
Search.propTypes = propTypes;

export default withTheme(Search);
