import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { prop } from 'styled-tools';
import Link from 'components/Link';
import ListItemContent from './ListItemContent';

const borderColor = ({ theme }) => theme.cbcs[2];

const horizontalPaddingValues = type => ({
    horizontalPadding,
    to,
    variant,
}) => {
    if (!horizontalPadding) return false;
    // If we want the border on the bottom to extend for the full width and there
    // is padding then we have to add a negative margin and adjust the width
    const widthAdjustment = css`
        margin-left: -${horizontalPadding}rem;
        width: calc(100% + ${horizontalPadding * 2}rem);
    `;

    const padding = css`
        padding-right: ${horizontalPadding}rem;
        padding-left: ${horizontalPadding}rem;
    `;

    const hasLink = typeof to !== 'undefined' && to;
    const hasBorder = variant !== 'no-divider' && variant !== 'separated';

    if (
        (!hasLink && type === 'default' && !hasBorder) ||
        (hasLink && type === 'link')
    ) {
        return padding;
    }

    // If it's not a link just give the full adjustment to the parent
    if (type === 'default' && !hasLink && hasBorder) {
        return css`
            ${widthAdjustment};
            ${padding};
        `;
    }

    // The parent needs the width adjustment if it's a link
    if (type === 'default' && hasLink && hasBorder) {
        return widthAdjustment;
    }

    return false;
};

const verticalPaddingValues = type => ({
    to,
    theme,
    variant,
    verticalPadding,
}) => {
    const hasLink = typeof to !== 'undefined' && to;
    const hasBorder = variant !== 'no-divider' && variant !== 'separated';
    // We don't want vertical padding to double up one on parent and the link
    // So if this is the default ListItem AND it's a link - no vertical padding
    if (type === 'default' && hasLink) return false;
    const actualPadding = !verticalPadding
        ? theme.sp.lg
        : `${verticalPadding}rem`;

    const fullPadding = css`
        padding-top: ${actualPadding};
        padding-bottom: ${actualPadding};
    `;

    const fullMargin = css`
        &:not(:first-child) {
            margin-top: ${actualPadding};
        }
        &:not(:last-child) {
            margin-bottom: ${actualPadding};
        }
    `;

    if (type === 'default' && !hasLink && !hasBorder) {
        return fullMargin;
    }
    return fullPadding;
};

const DefaultStyles = css`
    display: flex;
    align-items: center;
    ${horizontalPaddingValues('default')};
    ${verticalPaddingValues('default')};

    &:not(:last-child) {
        border-bottom: ${prop('theme.b')} solid ${borderColor};
    }
`;

const Default = styled.li`
    ${DefaultStyles};
`;

const NoDivider = styled.li`
    ${DefaultStyles};
    margin-left: 0;
    width: 100%;
    padding: 0;
    && {
        border-bottom: 0;
    }
`;

const LinkStyled = styled(Link)`
    display: flex;
    width: 100%;
    align-items: center;

    > a {
        ${horizontalPaddingValues('link')};
        ${verticalPaddingValues('link')};
    }

    &:hover {
        ${ListItemContent} {
            transform: scale(1.02);
        }
    }
`;

const Separated = styled.li`
    ${DefaultStyles};
    border-radius: ${({ theme }) => theme.brb * 0.6}rem;
    margin-bottom: ${({ theme }) => theme.spb * 6}rem;
    background: ${prop('theme.cb')};

    && {
        border-bottom: 0;
    }
`;

const Styles = {
    primary: Default,
    'no-divider': NoDivider,
    separated: Separated,
};

const ListItem = props => {
    const Item = Styles[props.variant];

    if (props.to) {
        return (
            <Item {...props}>
                <LinkStyled
                    horizontalPadding={props.horizontalPadding}
                    verticalPadding={props.verticalPadding}
                    to={props.to}
                    variant={props.variant}
                >
                    {props.children}
                </LinkStyled>
            </Item>
        );
    }

    return <Item {...props} />;
};

ListItem.defaultProps = {
    variant: 'primary',
    to: false,
    children: false,
    horizontalPadding: 0,
    verticalPadding: 0,
};

ListItem.propTypes = {
    variant: PropTypes.oneOf(Object.keys(Styles)),
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
    horizontalPadding: PropTypes.number,
    verticalPadding: PropTypes.number,
};

export default ListItem;
