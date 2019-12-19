import React from 'react';
import styled from 'styled-components';
import { prop } from 'styled-tools';

import Icon from 'components/Icon';
import UserProfileDropdown from './UserProfileDropdown';
import Navigation from './Navigation';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

const RightWrapper = styled.div`
    display: flex;
    margin-left: auto;
    align-items: center;
`;

const IconStyled = styled(Icon)`
    margin-right: ${prop('theme.sp.lg')};
    width: ${({ theme }) => theme.szb * 1.7}rem;
`;

const AuthenticatedHeader = props => (
    <Wrapper>
        <Navigation />
        <RightWrapper>
            <IconStyled type="search" />
            <UserProfileDropdown {...props} />
        </RightWrapper>
    </Wrapper>
);

export default AuthenticatedHeader;
