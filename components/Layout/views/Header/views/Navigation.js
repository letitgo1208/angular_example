import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { prop } from 'styled-tools';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { Menu } from 'antd';
import Icon from 'components/Icon';
import Link from 'components/Link';

import { CALENDAR_VIEWS } from 'pages/Home/types';

const Selector = styled.div`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: ${({ theme }) => theme.szb * -2.17}rem;
    border-left: ${({ theme }) => theme.szb * 1.24}rem solid transparent;
    border-right: ${({ theme }) => theme.szb * 1.24}rem solid transparent;
    border-bottom: ${({ theme }) => theme.szb * 1}rem solid ${prop('theme.cb')};
    opacity: 0;
    transition: ${prop('theme.ts.easeIn')};
`;

const Wrapper = styled.div`
    .ant-menu-horizontal {
        background: none;
        border: none;
        text-transform: uppercase;
        letter-spacing: ${({ theme }) => theme.fsb * 0.1}rem;
    }

    // There's a hover underline on menu items in antd that we want to remove
    .ant-menu-horizontal > .ant-menu-item,
    .ant-menu-horizontal > .ant-menu-submenu {
        border: 0;
        color: ${prop('theme.cpc')};
    }

    .ant-menu-item:hover > .arrow-up,
    .ant-menu-item-selected > .arrow-up {
        opacity: 1;
    }

    .ant-menu-horizontal > .ant-menu-item:hover,
    .ant-menu-horizontal > .ant-menu-submenu:hover,
    .ant-menu-horizontal > .ant-menu-item-active,
    .ant-menu-horizontal > .ant-menu-submenu-active,
    .ant-menu-horizontal > .ant-menu-item-open,
    .ant-menu-horizontal > .ant-menu-submenu-open,
    .ant-menu-horizontal > .ant-menu-item-selected,
    .ant-menu-horizontal > .ant-menu-submenu-selected {
        border: none;
        color: ${prop('theme.cpc')};
    }
`;

const LinkStyled = styled(Link)`
    position: relative;
    top: ${({ theme }) => theme.spb * 0.11}rem;
    font-weight: 700;
    color: ${prop('theme.cpc')};
    &:hover {
        color: ${prop('theme.cpc')};
    }
`;

const IconStyled = styled(Icon)`
    margin-right: ${prop('theme.sp.sm')};
`;

const mapStateToProps = ({ home }) => ({
    selectedDate: home.selectedDate,
    calendarView: home.calendarView,
});

const enhance = compose(withTheme, connect(mapStateToProps));

const Navigation = ({ theme, selectedDate, calendarView }) => {
    const iconHeight = theme.szb * 2;

    const calendarPath = () => {
        if (!selectedDate) return '';
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth() + 1;
        const day = selectedDate.getDate();

        return `/${calendarView}/${year}/${month}/${day}`;
    };

    return (
        <Wrapper>
            <Menu mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                    <IconStyled type="calendar" height={iconHeight} />
                    <LinkStyled to={`/calendar${calendarPath()}`}>
                        Calendar
                    </LinkStyled>
                    <Selector className="arrow-up" />
                </Menu.Item>
                <Menu.Item key="2">
                    <IconStyled type="person" height={iconHeight} />
                    <LinkStyled to="/people">People</LinkStyled>
                    <Selector className="arrow-up" />
                </Menu.Item>
                <Menu.Item key="3">
                    <IconStyled type="flow" height={iconHeight} />
                    <LinkStyled to="/flows">Flows</LinkStyled>
                    <Selector className="arrow-up" />
                </Menu.Item>
                <Menu.Item key="4">
                    <IconStyled type="form" height={iconHeight} />
                    <LinkStyled to="/forms">Forms</LinkStyled>
                    <Selector className="arrow-up" />
                </Menu.Item>
            </Menu>
        </Wrapper>
    );
};

Navigation.defaultProps = {
    calendarView: 'month',
};

Navigation.propTypes = {
    theme: PropTypes.object.isRequired,
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    calendarView: CALENDAR_VIEWS,
};

Navigation.displayName = 'Navigation';

export default enhance(Navigation);
