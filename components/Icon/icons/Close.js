import React from 'react';
import { withTheme } from 'styled-components';
import { defaultProps, propTypes } from '../props';
import SVGWrapper from '../views/SVGWrapper';

const Close = props => (
    <SVGWrapper defaultWidth={16} defaultHeight={16} {...props}>
        <g
            transform="rotate(45 11.414 6.586)"
            fill={props.stroke || props.theme.cbcs[5]}
            fillRule="evenodd"
        >
            <rect x="9" width="2" height="20" rx="1" />
            <rect y="9" width="20" height="2" rx="1" />
        </g>
    </SVGWrapper>
);

Close.defaultProps = defaultProps;
Close.propTypes = propTypes;

export default withTheme(Close);
