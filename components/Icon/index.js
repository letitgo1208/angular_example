import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, withTheme } from 'styled-components';
import { withProp, prop } from 'styled-tools';
import { compose, withState } from 'recompose';
import omit from 'lodash/omit';
import Button from 'components/Button';

import HoverCircle from './views/HoverCircle';

import Close from './icons/Close';
import Calendar from './icons/Calendar';
import Flow from './icons/Flow';
import Person from './icons/Person';
import People from './icons/People';
import Form from './icons/Form';
import Clock from './icons/Clock';
import Busy from './icons/Busy';
import Repeat from './icons/Repeat';
import Search from './icons/Search';
import VerticalDots from './icons/VerticalDots';
import Check from './icons/Check';
import Cog from './icons/Cog';
import Trash from './icons/Trash';
import ArrowUp from './icons/ArrowUp';
import ArrowRight from './icons/ArrowRight';
import ArrowDown from './icons/ArrowDown';
import ArrowLeft from './icons/ArrowLeft';
import Twitter from './icons/Twitter';
import Hybrid from './icons/Hybrid';
import Sms from './icons/Sms';
import Email from './icons/Email';
import Note from './icons/Note';
import Pencil from './icons/Pencil';
import Insert from './icons/Insert';

const components = {
    close: Close,
    calendar: Calendar,
    flow: Flow,
    person: Person,
    people: People,
    form: Form,
    clock: Clock,
    busy: Busy,
    repeat: Repeat,
    search: Search,
    check: Check,
    cog: Cog,
    trash: Trash,
    pencil: Pencil,
    twitter: Twitter,
    hybrid: Hybrid,
    sms: Sms,
    email: Email,
    note: Note,
    insert: Insert,
    'vertical-dots': VerticalDots,
    'arrow-up': ArrowUp,
    'arrow-right': ArrowRight,
    'arrow-down': ArrowDown,
    'arrow-left': ArrowLeft,
    'twitter-rich': Twitter,
    'sms-rich': Sms,
    'email-rich': Email,
    'note-rich': Note,
};

const ShadowWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: ${prop('width')}rem;
`;
const Shadow = styled.div`
    width: 100%;
    height: ${withProp('width', width => width * 0.125)}rem;
    border-radius: 50%;
    margin-top: ${withProp('width', width => width * -0.05)}rem;
    background-color: ${({ theme }) => theme.cbcs[2]};
`;

const InlineIcon = css`
    && {
        position: absolute;
        right: ${prop('theme.sp.lg')};
        top: 50%;
        transform: translateY(-50%);
        line-height: 1;
        padding: 0;
    }
`;

const enhance = compose(
    withState('isHovering', 'setIsHovering', false),
    withTheme
);

// Width and height are defined in rem
const Icon = props => {
    const Tag = components[props.type];

    const hoveringHandlers = {
        onMouseEnter: () => props.setIsHovering(true),
        onMouseLeave: () => props.setIsHovering(false),
    };

    const StyledTag = styled(Tag)`
        display: flex;
        margin: 0 auto;
    `;

    // The wrappers of the icon don't need the icon props so take them off
    const parentProps = omit(props, [
        'type',
        'hover',
        'hoverFill',
        'shadow',
        'setIsHovering',
        'variant',
        'isButton',
        // Props used just for styling on a parent component
        'styleProps',
    ]);

    // The parent should be getting all this stuff not the children
    const passedProps = omit(props, [
        'className',
        'id',
        'onClick',
        'onMouseEnter',
        'onMouseLeave',
        // Props used just for styling on a parent component
        'styleProps',
    ]);

    if (props.hover) {
        if (props.isButton) {
            return (
                <Button
                    {...parentProps}
                    {...hoveringHandlers}
                    variant="invisible"
                >
                    <HoverCircle>
                        <StyledTag {...passedProps} />
                    </HoverCircle>
                </Button>
            );
        }
        return (
            <HoverCircle {...parentProps} {...hoveringHandlers}>
                <StyledTag {...passedProps} />
            </HoverCircle>
        );
    }

    if (props.shadow) {
        if (props.isButton) {
            return (
                <Button
                    variant="invisible"
                    {...parentProps}
                    {...hoveringHandlers}
                >
                    <ShadowWrapper {...passedProps}>
                        <Tag {...passedProps} />
                        <Shadow {...passedProps} />
                    </ShadowWrapper>
                </Button>
            );
        }
        return (
            <ShadowWrapper {...parentProps} {...hoveringHandlers}>
                <Tag {...passedProps} />
                <Shadow {...passedProps} />
            </ShadowWrapper>
        );
    }

    // Style the icon to appear on the right hand side of an input field
    if (props.variant === 'inputInline') {
        const StyledInlineTag = styled(Tag)`
            ${InlineIcon};
        `;
        if (props.isButton) {
            const inlineButtonStyles = {
                position: 'absolute',
                right: props.theme.sp.lg,
                top: '50%',
                transform: 'translateY(-50%)',
                lineHeight: '1',
                padding: '0',
            };

            return (
                <Button
                    // using styled components `css` here makes the popover
                    // show in the wrong place - I have no idea why - using
                    // styles is a bit of a hack here, but not worth the time
                    // to figure it out
                    style={inlineButtonStyles}
                    variant="invisible"
                    {...parentProps}
                    {...hoveringHandlers}
                >
                    <Tag {...passedProps} />
                </Button>
            );
        }
        return <StyledInlineTag {...parentProps} {...hoveringHandlers} />;
    }

    if (props.isButton) {
        return (
            <Button variant="invisible" {...parentProps} {...hoveringHandlers}>
                <Tag {...passedProps} />
            </Button>
        );
    }

    return <Tag {...props} {...hoveringHandlers} />;
};

export const icons = Object.keys(components);

Icon.defaultProps = {
    hover: false,
    shadow: false,
    variant: false,
    isButton: false,
    onClick: () => {},
};

Icon.propTypes = {
    type: PropTypes.oneOf(icons).isRequired,
    hover: PropTypes.bool,
    shadow: PropTypes.bool,
    isHovering: PropTypes.bool.isRequired,
    setIsHovering: PropTypes.func.isRequired,
    variant: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf(['inputInline']),
    ]),
    isButton: PropTypes.bool,
    onClick: PropTypes.func,
    theme: PropTypes.object.isRequired,
};

export default enhance(Icon);
