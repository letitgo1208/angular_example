import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withOnClickOutside from 'react-onclickoutside';
import omit from 'lodash/omit';
import styled, { css } from 'styled-components';
import { prop } from 'styled-tools';
import get from 'lodash/get';
import findIndex from 'lodash/findIndex';

import { List, ListItem } from 'components/List';
import Button from 'components/Button';

const activeAndHover = css`
    background: ${prop('theme.cp')};
    color: ${prop('theme.cpc')};
`;

const ListStyled = List.extend`
    border-radius: ${prop('theme.br.md')};
    border: 0;
    min-width: ${({ width, fluid }) => (!fluid && width ? width : 0)}rem;
    margin: -${prop('theme.sp.lg')};
`;

const ListItemStyled = styled(ListItem)`
    padding: 0;
    cursor: pointer;
    line-height: initial;
    margin: 0;
    height: auto;
`;

const Category = styled.h4`
    font-weight: 700;
    font-size: ${prop('theme.fs.lg')};
    padding: ${({ theme }) => theme.spb * 0.8}rem ${' '} ${prop('theme.sp.lg')}
        ${' '} ${prop('theme.sp.sm')} ${' '} ${prop('theme.sp.lg')};
    margin: 0;
`;

const ButtonPadding = ({ theme, indent }) => {
    if (!indent) {
        return `${theme.spb * 0.8}rem ${theme.sp.lg} ${theme.sp.sm} ${
            theme.sp.lg
        }`;
    }
    return `${theme.spb * 0.8}rem ${theme.sp.lg} ${theme.sp.sm} ${theme.spb *
        4}rem`;
};

const ButtonStyled = Button.extend`
    width: 100%;
    &&.ant-btn {
        background: none;
        text-transform: none;
        cursor: pointer;
        min-width: ${({ theme }) => theme.szb * 16}rem;
        border: 0;
        color: ${prop('theme.cbc')};
        border-radius: 0;
        font-weight: 500;
        font-size: ${prop('theme.fs.lg')};
        height: 100%;
        text-align: left;
        padding: ${ButtonPadding};
        ${({ selected }) => selected && activeAndHover};
        &:hover,
        &:focus {
            ${activeAndHover};
        }
    }
`;

// No recompose here because this has to use refs - so it must be a class
// I'm no longer using a ref here - so we could totally refactor using recompose - don't want to right now
class SelectableMenu extends Component {
    static defaultProps = {
        width: 16,
        fluid: false,
        className: '',
    };

    static propTypes = {
        isOpen: PropTypes.bool.isRequired,
        setIsOpen: PropTypes.func.isRequired,
        items: PropTypes.arrayOf(
            PropTypes.shape({
                text: PropTypes.string,
                category: PropTypes.string,
                onClick: PropTypes.func,
            })
        ).isRequired,
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        fluid: PropTypes.bool,
        className: PropTypes.string,
    };

    state = {
        // if there's nothing selected findIndex returns -1 which will start from the beginning
        focusedItem: findIndex(this.props.items, item => item.selected),
    };

    // eslint-disable-next-line react/sort-comp
    handleArrowPress = e => {
        e.preventDefault();
        const keyPressed = e.which;
        const upKey = 38;
        const downKey = 40;
        const lastKey = this.props.items.length - 1;
        if (keyPressed === upKey) {
            e.preventDefault();
            if (
                this.state.focusedItem === 0 ||
                (typeof this.props.items[0].category !== 'undefined' &&
                    this.state.focusedItem === 1)
            ) {
                const isLastCategory =
                    typeof this.props.items[lastKey].category !== 'undefined';
                if (isLastCategory) {
                    this.setState({ focusedItem: lastKey - 1 });
                } else {
                    this.setState({ focusedItem: lastKey });
                }
            } else {
                this.setState(prevState => {
                    let prevItem = prevState.focusedItem - 1;
                    if (prevState.focusedItem === -1) {
                        prevItem = lastKey;
                    }
                    const isPrevCategory =
                        typeof this.props.items[prevItem].category !==
                        'undefined';
                    if (isPrevCategory) {
                        return { focusedItem: prevState.focusedItem - 2 };
                    }
                    return { focusedItem: prevItem };
                });
            }
        }
        if (keyPressed === downKey) {
            e.preventDefault();
            if (lastKey === this.state.focusedItem) {
                const isFirstCategory =
                    typeof this.props.items[0].category !== 'undefined';
                if (isFirstCategory) {
                    this.setState({ focusedItem: 1 });
                } else {
                    this.setState({ focusedItem: 0 });
                }
            } else {
                this.setState(prevState => {
                    const nextItem = prevState.focusedItem + 1;
                    const isNextCategory =
                        typeof this.props.items[nextItem].category !==
                        'undefined';
                    if (isNextCategory) {
                        return { focusedItem: prevState.focusedItem + 2 };
                    }
                    return { focusedItem: nextItem };
                });
            }
        }
    };

    /**
     * Scrolling with react is harder than it should be - so here we just scroll with id's
     * it's a little hacky - but much easier if you ask me
     */
    scrollToActiveItem = () => {
        const getSelectedItem = item => item.selected;
        const selectedItem = this.props.items.find(getSelectedItem);
        const selectedId = get(selectedItem, 'id', false);
        if (selectedId) {
            if (document.getElementById(selectedId) === null) return;
            const topPos = document.getElementById(selectedId).offsetTop;
            // There should only be one dropdown open at once - so we can check them with these classes
            // if for some reason there is more than one open at the same time in the future this needs
            // to be revisited
            const scrollContainer = document
                .getElementsByClassName('popover')[0]
                .getElementsByClassName('scrollbar-container')[0];
            // The timeout is needed or it doesn't scroll at all - hasn't been completely rendered yet?
            setTimeout(() => {
                scrollContainer.scrollTop = topPos;
            });
        }
    };

    componentDidMount() {
        document.addEventListener('keydown', this.handleArrowPress, false);
        this.scrollToActiveItem();
    }

    componentDidUpdate() {
        // I'm not using refs because I hate refs. Spent like 3 hours trying to get them to work but styled
        // components doesn't want to play well. Classes work just fine
        if (this.state.focusedItem > -1) {
            const button = document.getElementsByClassName(
                `dropdown-menu-${this.state.focusedItem}`
            )[0];
            button.focus();
        }
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleArrowPress, false);
    }

    handleClickOutside = () => {
        this.setState({ focusedItem: -1 });
    };

    renderCategory = item => <Category>{item.category}</Category>;

    renderItem = ({ itemKey, item, withCategory }) => {
        const adjustedItem = omit(item, ['text', 'id']);
        if (typeof item.category !== 'undefined')
            return this.renderCategory(item);

        return (
            <ButtonStyled
                {...adjustedItem}
                onClick={e => {
                    e.stopPropagation();
                    this.props.setIsOpen(false);
                    item.onClick(e);
                }}
                className={`selectable-menu dropdown-menu-${itemKey}`}
                indent={!!withCategory}
            >
                {item.text}
            </ButtonStyled>
        );
    };

    renderItems = () => {
        const { items } = this.props;
        const menuItems = [];
        let withCategory = false;
        for (let i = 0; i < items.length; i += 1) {
            let id = items[i].id;

            // randomId is our mock value used for testing so our snapshots
            // don't change every time, but then we get a warning saying keys
            // are not unique
            if (typeof id === 'undefined' || id === 'randomId') id = `key${i}`;
            if (typeof items[i].category !== 'undefined') withCategory = true;

            menuItems.push([
                <ListItemStyled key={id} id={id} variant="no-divider">
                    {this.renderItem({
                        itemKey: i,
                        item: items[i],
                        withCategory,
                    })}
                </ListItemStyled>,
            ]);
        }
        return menuItems;
    };

    render() {
        const { width, fluid, className } = this.props;
        return (
            <ListStyled width={width} fluid={fluid} className={className}>
                {this.renderItems()}
            </ListStyled>
        );
    }
}

export default withOnClickOutside(SelectableMenu);
