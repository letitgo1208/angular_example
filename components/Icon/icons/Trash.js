import React from 'react';
import { withTheme } from 'styled-components';
import { defaultProps, propTypes } from '../props';
import SVGWrapper from '../views/SVGWrapper';

const Trash = props => (
    <SVGWrapper defaultWidth={18} defaultHeight={20} {...props}>
        <g
            stroke={props.stroke || props.theme.cbcs[5]}
            fill={props.fill || 'none'}
            fillRule="evenodd"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M2.818 18.625h11.637v-15H2.818zM5.727 3.625h5.818v-2.25H5.727zM1 3.625h16M5.727 6.25v9M8.636 6.25v9M11.545 6.25v9" />
        </g>
    </SVGWrapper>
);

Trash.defaultProps = defaultProps;
Trash.propTypes = propTypes;

export default withTheme(Trash);
