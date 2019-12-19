import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { Link as RouterLink } from 'react-router-dom';

const LinkStyled = styled.span`
    & > a:focus {
        text-decoration: none;
    }
`;

const Link = props => {
    const passedProps = omit(props, ['horizontalPadding', 'verticalPadding']);
    return (
        <LinkStyled className={props.className}>
            <RouterLink {...passedProps} />
        </LinkStyled>
    );
};

Link.defaultProps = {
    className: '',
};

Link.propTypes = {
    className: PropTypes.string,
};

export default Link;
