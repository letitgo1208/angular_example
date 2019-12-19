import React from 'react';
import styled, { withTheme } from 'styled-components';
import { prop } from 'styled-tools';
import PropTypes from 'prop-types';
import Popover from './Popover';

const ErrorMessage = styled.div`
    margin: 0;
    color: ${prop('theme.cec')};
    font-size: ${prop('theme.fs.lg')};
    font-weight: 500;
`;

const ErrorPopover = ({ message, children, theme, popoverProps }) => (
    <Popover
        manualState
        background={theme.ce}
        placement="bottom-start"
        overlay={<ErrorMessage>{message}</ErrorMessage>}
        padding={`${theme.spb * 1}rem ${theme.spb * 1.5}rem`}
        lightShadow
        {...popoverProps}
    >
        {({ isOpen, setIsOpen, id }) => children({ isOpen, setIsOpen, id })}
    </Popover>
);

ErrorPopover.defaultProps = {
    popoverProps: {},
};

ErrorPopover.propTypes = {
    message: PropTypes.node.isRequired,
    children: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    popoverProps: PropTypes.object,
};

ErrorPopover.displayName = 'ErrorPopover';

export default withTheme(ErrorPopover);
