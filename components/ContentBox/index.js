import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const verticalPadding = 2.5;
export const horizontalPadding = 4;

const padding = ({ theme, variant }) => {
    if (variant === 'transparent') return '0';
    const vPadding = theme.spb * verticalPadding;
    const hPadding = theme.spb * horizontalPadding;
    return `${vPadding}rem ${hPadding}rem`;
};

const background = ({ variant, theme }) =>
    variant === 'transparent' ? 'transparent' : theme.cb;

const ContentBoxWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background: ${background};
    width: ${({ theme }) => theme.szb * 84.5}rem;
    height: 100%;
    margin: 0 auto;
    border-radius: ${({ theme }) => theme.brb * 0.6}rem;
    padding: ${padding};
`;

const ContentBox = ({ header, children, variant }) => (
    <ContentBoxWrapper variant={variant}>
        {header && header}
        {children}
    </ContentBoxWrapper>
);

ContentBox.defaultProps = {
    header: false,
    variant: 'primary',
};
ContentBox.propTypes = {
    header: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
    variant: PropTypes.oneOf(['transparent', 'primary']),
    children: PropTypes.node.isRequired,
};
ContentBox.displayName = 'ContentBox';

export default ContentBox;
