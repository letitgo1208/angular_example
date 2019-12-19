import React from 'react';
import { withTheme } from 'styled-components';
import { defaultProps, propTypes } from '../props';
import SVGWrapper from '../views/SVGWrapper';

const People = props => (
    <SVGWrapper defaultWidth={24} defaultHeight={19} {...props}>
        <g
            stroke={props.stroke || props.theme.pc}
            fill={props.fill || 'none'}
            fillRule="evenodd"
            strokeLinejoin="round"
        >
            <path d="M7.919 18.5h7.58V14c0-.5-3-2-5.5-3V9s1-.35 1-2.5c.696 0 1-2 .033-2 0-.212.766-1.308.468-2.5-.5-2-5.5-2-6 0C3.395 1.569 5 4.212 5 4.5c-1 0-.696 2 0 2C5 8.65 6 9 6 9v2C3.5 12 .5 13.5.5 14v4.5h7.419z" />
            <path
                d="M18 18.5h5.5V14c0-.5-2.5-1.2-4.5-2v-1.5s1-.28 1-2c.557 0 .774-2 0-2 0-.169.811-1.067.5-2-.5-1.5-4.5-1.5-5 0-1.685-.345-.5 1.77-.5 2-.8 0-.557 2 0 2 0 1.72 1 2 1 2v1"
                strokeLinecap="round"
            />
        </g>
    </SVGWrapper>
);

People.defaultProps = defaultProps;
People.propTypes = propTypes;

export default withTheme(People);
