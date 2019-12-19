import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { prop } from 'styled-tools';
import { Portal } from 'react-portal';
import Transition from 'react-transition-group/Transition';
import ReactPerfectScrollbar from 'react-perfect-scrollbar';
import { compose, withState } from 'recompose';

const right = ({ theme, transition }) => {
    if (transition === 'entering' || transition === 'entered') {
        return 0;
    }
    return theme.szb * -61.1;
};

const opacity = ({ transition }) => {
    if (transition === 'entering' || transition === 'entered') {
        return 1;
    }
    return 0;
};

export const eventSidebarPadding = 6;

// Popover containers have a z-index of up to 200
const SidebarPopoutPanel = styled.div`
    width: ${({ theme }) => theme.szb * 56.5}rem;
    height: 100vh;
    position: absolute;
    // Remove the sidebar from the screen - "right" is bigger than the width because of the box-shadow
    right: ${right}rem;
    background-color: ${prop('theme.cb')};
    padding: ${({ theme }) => theme.spb * eventSidebarPadding}rem;
    box-shadow: 0 2.4rem 3.8rem 0.3rem rgba(0, 0, 0, 0.14),
        0 0.9rem 4.6rem 0.8rem rgba(0, 0, 0, 0.12),
        0 1.1rem 1.5rem -0.7rem rgba(0, 0, 0, 0.2);
    z-index: 202;
    transition: right ${prop('theme.td')}ms;
`;

const SidebarPopoutBG = styled.div`
    width: 100%;
    height: 100vh;
    position: absolute;
    z-index: 201;
    background: rgba(0, 0, 0, 0.4);
    left: 0;
    opacity: ${opacity};
    transition: opacity ${prop('theme.td')}ms;
`;

const PerfectScrollbar = styled(ReactPerfectScrollbar)`
    padding: ${({ theme }) => theme.szb * eventSidebarPadding}rem;
    margin: -${({ theme }) => theme.szb * eventSidebarPadding}rem;
    height: 100vh !important;
`;

const enhance = compose(
    withTheme,
    withState('isTransitionFinished', 'setIsTransitionFinished', false)
);

const SidebarPopout = ({
    children,
    isOpen,
    handleClose,
    theme,
    isTransitionFinished,
    setIsTransitionFinished,
}) => (
    <Transition
        in={isOpen}
        mountOnEnter
        unmountOnExit
        onEntering={() => {
            document.body.style.overflowX = 'hidden';
        }}
        onEntered={() => setIsTransitionFinished(true)}
        onExited={() => {
            document.body.style.overflowX = 'auto';
            setIsTransitionFinished(false);
        }}
        timeout={theme.td}
    >
        {state => (
            <Portal>
                <SidebarPopoutPanel transition={state}>
                    <PerfectScrollbar>
                        {children({
                            isSidebarTransitionFinished: isTransitionFinished,
                        })}
                    </PerfectScrollbar>
                </SidebarPopoutPanel>
                <SidebarPopoutBG transition={state} onClick={handleClose} />
            </Portal>
        )}
    </Transition>
);

SidebarPopout.propTypes = {
    children: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    isTransitionFinished: PropTypes.bool.isRequired,
    setIsTransitionFinished: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
};

export default enhance(SidebarPopout);
