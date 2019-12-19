import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { Layout as AntdLayout } from 'antd';

import { logoutUser } from 'pages/Login/actions';
import Header, { HeaderMarginBottom } from '../views/Header';
const { Content } = AntdLayout;

const height = ({ theme }) =>
    `calc(100vh - ${HeaderMarginBottom({ theme })} - ${
        theme.antTheme['layout-header-height']
    })`;

const LayoutWrapper = styled(AntdLayout)`
    height: ${height};
`;

const ContentWrapper = styled(Content)`
    height: ${height};
`;

const Layout = ({ logout, children }) => (
    <LayoutWrapper>
        <Header logoutUser={logout} />
        <ContentWrapper>{children}</ContentWrapper>
    </LayoutWrapper>
);

Layout.propTypes = {
    logout: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logoutUser()),
        dispatch,
    };
}

export default compose(withRouter, connect(null, mapDispatchToProps))(Layout);
