import React from 'react';
import { withTheme } from 'styled-components';
import { defaultProps, propTypes } from '../props';
import SVGWrapper from '../views/SVGWrapper';

const Repeat = props => (
    <SVGWrapper defaultWidth={24} defaultHeight={24} {...props}>
        <g
            stroke={props.stroke || props.theme.pc}
            fill={props.fill || 'none'}
            fillRule="evenodd"
            strokeLinejoin="round"
        >
            <path d="M23.5 17.5a6 6 0 1 1-12 0 6 6 0 0 1 12 0z" />
            <path
                d="M15 20l5-5M20 20l-5-5M20.5 10V2.5h-4M4.5 2.5h-4v16h9"
                strokeLinecap="round"
            />
            <path
                strokeLinecap="round"
                d="M4.5 4.5h3v-4h-3zM13.5 4.5h3v-4h-3zM7.5 2.5h6M.5 7.5h20"
            />
        </g>
    </SVGWrapper>
);

Repeat.defaultProps = defaultProps;
Repeat.propTypes = propTypes;

export default withTheme(Repeat);
