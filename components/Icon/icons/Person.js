import React from 'react';
import { withTheme } from 'styled-components';
import { defaultProps, propTypes } from '../props';
import SVGWrapper from '../views/SVGWrapper';

const Person = props => (
    <SVGWrapper defaultWidth={20} defaultHeight={22} {...props}>
        <path
            d="M10.045 20.524h8.574s0-3.193-.451-4.554c-.394-1.183-3.235-1.976-6.216-3.1v-2.38s.953-.59.953-2.858c.952 0 .952-1.904 0-1.904 0-.223 1.027-1.598.714-2.858-.451-1.813-5.858-1.813-6.31 0-2.256-.453-1.07 2.554-1.07 2.858v1.904c0 2.268 1.904 2.858 1.904 2.858v2.38c-2.646 1.006-5.823 1.917-6.215 3.1-.452 1.361-.452 4.554-.452 4.554h8.569z"
            stroke={props.stroke || props.theme.cpc}
            strokeWidth="1.2"
            fill={props.fill || 'none'}
            fillRule="evenodd"
            strokeLinejoin="round"
        />
    </SVGWrapper>
);

Person.defaultProps = defaultProps;
Person.propTypes = propTypes;

export default withTheme(Person);
