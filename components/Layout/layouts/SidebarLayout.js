import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { prop } from 'styled-tools';

const SidebarLayout = styled.div`
    width: ${({ theme }) => theme.szb * 36.5}rem;
    margin-left: -1rem;
`;

export const ContainerWrapper = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
    padding: 0 ${prop('theme.sp.lg')};
`;

const ContainerLayout = styled.div`
    width: 100%;
`;

const ContainerWithSidebar = ({ sidebar, children }) => (
    <ContainerWrapper>
        <SidebarLayout>{sidebar}</SidebarLayout>
        <ContainerLayout>{children}</ContainerLayout>
    </ContainerWrapper>
);

ContainerWithSidebar.propTypes = {
    sidebar: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
};

export default ContainerWithSidebar;
