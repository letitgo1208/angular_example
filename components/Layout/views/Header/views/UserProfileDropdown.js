import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { prop } from 'styled-tools';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { Avatar } from 'antd';
import { logout } from 'utils/storage';
import { logoutUser } from 'pages/Login/actions';

import Icon from 'components/Icon';
import { DropdownMenu } from 'components/Popover';

const Wrapper = styled.div`
    height: ${prop('theme.antTheme["layout-header-height"]')};
    border-left: ${prop('theme.b')} solid rgba(255, 255, 255, 0.2);
    cursor: pointer;
    .ant-avatar {
        border: 0.2rem solid ${prop('theme.cps[3]')};
        // Margin top here has to be based on size - because this is being centered vertically with this
        // margin and depends on the height of the header which changes with size
        margin: ${({ theme }) => theme.szb * 2}rem 0 0 ${prop('theme.sp.lg')};
    }
`;

const ArrowWrapper = styled.div`
    position: relative;
    margin-left: ${prop('theme.sp.sm')};
    top: ${({ theme }) => theme.szb * 1.3}rem;
    display: inline-block;
`;

const enhance = compose(withTheme, withRouter);

const UserProfileDropdown = props => (
    <DropdownMenu
        placement="bottom-end"
        items={[
            {
                text: 'Settings',
                onClick: () => {
                    props.history.push('/settings');
                },
            },
            {
                text: 'Logout',
                onClick: () => {
                    logoutUser();
                    setTimeout(() => {
                        logout();
                        props.history.push('/login');
                    });
                },
            },
        ]}
        {...props}
    >
        <Wrapper>
            <Avatar
                src="https://fast.wistia.net/embed/medias/p5ki0v5kzu/swatch"
                shape="circle"
                size="large"
            />
            <ArrowWrapper>
                <Icon
                    type="arrow-down"
                    width={1.6}
                    color={props.theme.primaryContrast}
                />
            </ArrowWrapper>
        </Wrapper>
    </DropdownMenu>
);

UserProfileDropdown.propTypes = {
    theme: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

export default enhance(UserProfileDropdown);
