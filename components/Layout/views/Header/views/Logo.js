import React from 'react';
import styled from 'styled-components';
import { prop } from 'styled-tools';

import LogoImage from 'images/logo.svg';
import { APP_NAME } from 'utils/constants';
import Img from 'components/Img';

const LogoWrapper = styled.div`
    border-right: ${prop('theme.b')} solid rgba(255, 255, 255, 0.2);
    height: ${prop('theme.antTheme["layout-header-height"]')};
    display: flex;
    align-items: center;
`;

const StyledLogo = styled(Img)`
    width: ${({ theme }) => theme.szb * 6.4}rem;
    height: ${({ theme }) => theme.szb * 3.2}rem;
    margin: ${prop('theme.sp.xs')} ${prop('theme.sp.lg')} 0 0;
`;

const Logo = () => (
    <LogoWrapper>
        <StyledLogo src={LogoImage} alt={APP_NAME} />
    </LogoWrapper>
);

export default Logo;
