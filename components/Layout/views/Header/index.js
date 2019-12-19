import React from 'react';
import styled from 'styled-components';
import { prop } from 'styled-tools';
import { Layout } from 'antd';
import { authenticatedOrElse } from 'utils/authenticatedUser';

import Logo from './views/Logo';
import AuthenticatedHeader from './views/AuthenticatedHeader';

export const HeaderMarginBottom = ({ theme }) => theme.sp.lg;

const HeaderWrapper = styled.div`
    margin-bottom: ${HeaderMarginBottom};
    .ant-layout-header {
        line-height: inherit;
        background: ${prop('theme.cp')};
        display: flex;
    }
`;

const { Header } = Layout;

const HeaderComponent = authenticatedOrElse(AuthenticatedHeader, () => false);

function AppHeader(props) {
    return (
        <HeaderWrapper>
            <Header>
                <Logo />
                <HeaderComponent {...props} />
            </Header>
        </HeaderWrapper>
    );
}

export default AppHeader;
