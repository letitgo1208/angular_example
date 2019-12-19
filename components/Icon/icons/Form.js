import React from 'react';
import { withTheme } from 'styled-components';
import { defaultProps, propTypes } from '../props';
import SVGWrapper from '../views/SVGWrapper';

const Form = props => (
    <SVGWrapper defaultWidth={22} defaultHeight={22} {...props}>
        <g
            stroke={props.stroke || props.theme.cpc}
            strokeWidth="1.2"
            fill={props.fill || 'none'}
            fillRule="evenodd"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M14.75 20.583H1.417V1.417h19.166V14.75z" />
            <path d="M14.75 20.583V14.75h5.833" />
        </g>
    </SVGWrapper>
);

Form.defaultProps = defaultProps;
Form.propTypes = propTypes;

export default withTheme(Form);
