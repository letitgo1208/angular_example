import React from 'react';
import { withTheme } from 'styled-components';
import { defaultProps, propTypes } from '../props';
import SVGWrapper from '../views/SVGWrapper';

const Check = props => (
    <SVGWrapper defaultWidth={12} defaultHeight={10} {...props}>
        <path
            d="M9.749 0L3.82 5.929l-1.66-1.66L.5 5.929l3.32 3.32 7.59-7.589z"
            fill={props.fill || props.theme.cpc}
            fillRule="evenodd"
        />
    </SVGWrapper>
);

Check.defaultProps = defaultProps;
Check.propTypes = propTypes;

export default withTheme(Check);
