import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import isFunction from 'lodash/isFunction';
import styled, { withTheme } from 'styled-components';
import { prop } from 'styled-tools';
import Transition from 'react-transition-group/Transition';
import { withState, withHandlers, compose, lifecycle } from 'recompose';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { getRandomId } from 'utils/functions';
import { colorType } from 'types';

import PerfectScrollbar from 'react-perfect-scrollbar';
import ReactPopover from 'reactstrap/lib/Popover';
import ReactPopoverBody from 'reactstrap/lib/PopoverBody';
import ReactPopoverHeader from 'reactstrap/lib/PopoverHeader';

import Icon from 'components/Icon';

const popoverBackground = ({ theme, background }) => {
    if (background) return background;
    return theme.cb;
};

const shadows = ({ lightShadow }) => {
    if (!lightShadow) {
        return `0 0.5rem 0.5rem -0.3rem rgba(0, 0, 0, 0.2),
           0 0.3rem 1.4rem 0.2rem rgba(0, 0, 0, 0.12),
           0 0.8rem 1rem 0.1rem rgba(0, 0, 0, 0.32)`;
    }
    return `0 2.4rem 3.8rem 0rem rgba(0,0,0,0.14), 
      0 -0.1rem 3.6rem 0 rgba(0,0,0,0.12), 
      0 1.1rem 1.5rem -0.7rem rgba(0,0,0,0.20)`;
};

const PopoverWrapper = styled.div`
    background: ${popoverBackground};
    border-radius: ${prop('theme.br.md')};
    box-shadow: ${shadows};
    max-width: ${prop('maxWidth')}rem;
`;

const ScrollbarPadding = styled.div`
    padding: ${prop('theme.sp.xs')} 0;
    margin-top: ${({ theme, marginTop }) => theme.spb * marginTop}rem;
    margin-bottom: ${({ theme, marginBottom }) => theme.spb * marginBottom}rem;
`;

const PopoverHeader = styled(ReactPopoverHeader)`
    padding: ${({ theme }) => theme.spb * 2}rem;
`;

const PopoverFooter = styled.div`
    border-top: ${prop('theme.b')} solid ${prop('theme.cbcs[1]')};
    padding: ${({ theme }) => theme.spb * 2}rem;
    margin-top: -${prop('theme.sp.xs')};
`;

const paddingBody = ({ theme, padding }) => {
    if (!padding) return `${theme.spb * 2}rem`;
    return padding;
};

const PerfectScrollWrapper = styled(PerfectScrollbar)`
    position: relative;
    padding: ${paddingBody};
    line-height: 1;
    max-height: ${({ height, maxHeight, scroll }) =>
        height > maxHeight || !scroll ? 'none' : `${maxHeight}rem`};
    height: ${({ height }) =>
        height === 'auto' ? 'auto' : `${height}rem !important`};
`;

const opacity = ({ transition }) => {
    if (transition === 'entering' || transition === 'entered') {
        return 1;
    }
    return 0;
};

const StyledReactPopover = styled(ReactPopover)`
    opacity: ${opacity};
    transition: opacity ${prop('theme.td')}ms ${prop('theme.antTheme[ease-in]')};
    && .arrow:before,
    && .arrow:after {
        color: ${popoverBackground};
    }
`;

const StyledIcon = styled(Icon)`
    position: fixed;
    top: ${prop('theme.sp.sm')};
    right: ${prop('theme.sp.sm')};
`;

const enhance = compose(
    withTheme,
    withState('isOpen', 'setIsOpen', false),
    withState('id', 'setId', () => getRandomId()),
    withHandlers({
        handleEscape: ({ setIsOpen }) => e => {
            const escapeKey = 27;
            const pressedKey = e.which;
            if (pressedKey === escapeKey) {
                setIsOpen(false);
            }
        },
    }),
    lifecycle({
        componentDidUpdate() {
            if (this.props.isOpen) {
                document.addEventListener(
                    'keydown',
                    this.props.handleEscape,
                    false
                );
            } else {
                document.removeEventListener(
                    'keydown',
                    this.props.handleEscape,
                    false
                );
            }
        },
    })
);

const Popover = props => {
    const adjustedProps = omit(props, ['overlay', 'placement']);

    // Deconstruct here instead of in the definition because we need the
    // props object in the adjustedProps variable above
    const {
        isOpen,
        setIsOpen,
        id,
        manualState,
        children,
        placement,
        overlay,
        theme,
        closeButton,
        height,
        maxHeight,
        header,
        footer,
        closeOnClick,
        scroll,
        bodyProps,
        background,
        lightShadow,
        padding,
        maxWidth,
    } = props;

    // Props that will be available in the render prop
    const availableProps = {
        isOpen,
        setIsOpen,
        id,
    };

    // Get the child whether it's a function or just a regular component
    const getChildren = () => {
        if (isFunction(children)) {
            return children(availableProps);
        }
        return children;
    };

    // Get the child whether it's a function or just a regular component
    const getRender = type => {
        if (isFunction(type)) {
            return type(availableProps);
        }
        return type;
    };

    // Props added to the component triggering the dropdown
    const childrenProps = () => {
        // Let the consumer handle the state instead of doing it automatically
        // Don't forget to include the id if you do this! The id MUST be
        // on the trigger for the popover or you'll get an error
        if (manualState) return {};
        return {
            id,
            onFocus: e => {
                e.preventDefault();
                if (!closeOnClick) {
                    setIsOpen(true);
                }
                // If there is an onFocus prop on the children we don't want to just
                // override that - so this will execute it as well
                if (typeof getChildren().props.onFocus !== 'undefined') {
                    getChildren().props.onFocus(e);
                }
            },
            onClick: e => {
                e.preventDefault();
                if (closeOnClick) {
                    setIsOpen(!isOpen);
                }
                // If there is an onClick prop on the children we don't want to just
                // override that - so this will execute it as well
                if (typeof getChildren().props.onClick !== 'undefined') {
                    getChildren().props.onClick(e);
                }
            },
            tabIndex: 0,
            role: 'button',
            onKeyPress: e => {
                const keyPressed = e.which;
                const enterKey = 13;
                if (keyPressed === enterKey) {
                    setIsOpen(!isOpen);
                }
                if (typeof getChildren().props.onKeyPress !== 'undefined') {
                    getChildren().props.onKeyPress(e);
                }
            },
        };
    };

    return (
        <Transition key={id} in={isOpen} timeout={theme.td}>
            {state => (
                <Fragment>
                    {React.cloneElement(getChildren(), childrenProps())}
                    <StyledReactPopover
                        isOpen={isOpen}
                        toggle={() => setIsOpen(!isOpen)}
                        target={id}
                        placement={placement || 'bottom-start'}
                        transition={state}
                        {...adjustedProps}
                    >
                        <PopoverWrapper
                            height={height}
                            scroll={scroll}
                            background={background}
                            lightShadow={lightShadow}
                            maxWidth={maxWidth}
                        >
                            {header && (
                                <PopoverHeader>
                                    {getRender(header)}
                                </PopoverHeader>
                            )}
                            <ScrollbarPadding {...bodyProps}>
                                <PerfectScrollWrapper
                                    maxHeight={maxHeight}
                                    height={height}
                                    scroll={scroll}
                                    padding={padding}
                                >
                                    <ReactPopoverBody>
                                        {getRender(overlay)}
                                        {closeButton && (
                                            <StyledIcon
                                                type="close"
                                                hover
                                                width={theme.szb * 1.2}
                                                height={theme.szb * 1.2}
                                                onClick={() => setIsOpen(false)}
                                            />
                                        )}
                                    </ReactPopoverBody>
                                </PerfectScrollWrapper>
                            </ScrollbarPadding>
                            {footer && (
                                <PopoverFooter>
                                    {getRender(footer)}
                                </PopoverFooter>
                            )}
                        </PopoverWrapper>
                    </StyledReactPopover>
                </Fragment>
            )}
        </Transition>
    );
};

Popover.defaultProps = {
    placement: 'bottom',
    manualState: false,
    closeButton: false,
    height: 'auto',
    header: false,
    footer: false,
    closeOnClick: true,
    scroll: true,
    maxHeight: 31.5,
    maxWidth: 60,
    bodyProps: {
        marginTop: 0,
        marginBottom: 0,
    },
    background: false,
    lightShadow: false,
    padding: false,
};

export const popoverTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    overlay: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
    children: PropTypes.oneOfType([
        PropTypes.func.isRequired,
        PropTypes.object.isRequired,
    ]).isRequired,
    placement: PropTypes.string,
    manualState: PropTypes.bool,
    theme: PropTypes.object.isRequired,
    closeButton: PropTypes.bool,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
    header: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    footer: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    closeOnClick: PropTypes.bool,
    scroll: PropTypes.bool,
    maxHeight: PropTypes.number,
    maxWidth: PropTypes.number,
    bodyProps: PropTypes.object,
    background: PropTypes.oneOfType([colorType, PropTypes.bool]),
    padding: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    lightShadow: PropTypes.bool,
};

Popover.propTypes = popoverTypes;

Popover.displayName = 'Popover';

export default enhance(Popover);
