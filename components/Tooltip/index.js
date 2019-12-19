import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { Tooltip as Tippy } from 'react-tippy';
import 'react-tippy/dist/tippy.css';

const Tooltip = props => {
    const { overlay, children, theme, ...tooltipProps } = props;

    return (
        <Tippy
            position="bottom"
            duration={theme.td}
            distance={5}
            touchHold
            html={<div>{overlay}</div>}
            unmountHTMLWhenHide
            {...tooltipProps}
        >
            {children}
        </Tippy>
    );
};

Tooltip.propTypes = {
    overlay: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
    children: PropTypes.node.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withTheme(Tooltip);
