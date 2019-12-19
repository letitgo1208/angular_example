import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { prop } from 'styled-tools';
import { verticalPadding, horizontalPadding } from '../index';

const HeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: ${({ theme }) => theme.spb * 2.5}rem;
    border-bottom: ${prop('theme.b')} solid ${prop('theme.cbcs[3]')};
    margin-left: -${horizontalPadding}rem;
    width: calc(100% + ${horizontalPadding * 2}rem);
    padding: 0 ${horizontalPadding}rem ${verticalPadding}rem;
`;
const TitleWrapper = styled.div`
    font-size: ${({ theme }) => theme.fsb * 2.4}rem;
    font-weight: 500;
`;

const Header = ({ children, action }) => (
    <HeaderWrapper>
        <TitleWrapper>{children}</TitleWrapper>
        {action}
    </HeaderWrapper>
);

Header.defaultProps = {
    action: false,
};

Header.propTypes = {
    children: PropTypes.node.isRequired,
    action: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
};
Header.displayName = 'ContentBoxHeader';

export default Header;
