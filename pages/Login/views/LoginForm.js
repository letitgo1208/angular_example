import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Form } from 'antd';
import get from 'lodash/get';
import log from 'utils/logger';
import { setToken, setUser } from 'utils/storage';

import { loginUser, loginMutation } from '../actions';
import LoginFormItems from './LoginFormItems';

const LoginFormWrapper = styled.div`
    .login-form {
        max-width: 300px;
    }
    .login-form-forgot {
        float: right;
    }
    .login-form-button {
        width: 100%;
    }
`;

class LoginForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            try {
                if (err) {
                    log.error('Unable to validate form', err);
                    return;
                }
                const {
                    data: { login },
                } = await this.props.loginMutation(values);
                const token = get(login, 'auth_token.access_token');
                const user = get(login, 'user');
                if (token && user) {
                    setToken(token);
                    setUser(user);
                    this.props.loginUser(user);
                }
            } catch (asyncErr) {
                log.error('Unable to log in', asyncErr);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <LoginFormWrapper>
                <LoginFormItems
                    getFieldDecorator={getFieldDecorator}
                    handleSubmit={this.handleSubmit}
                />
            </LoginFormWrapper>
        );
    }
}

LoginForm.propTypes = {
    form: PropTypes.object.isRequired,
    loginMutation: PropTypes.func.isRequired,
    loginUser: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
    return {
        loginUser: credentials => dispatch(loginUser(credentials)),
        dispatch,
    };
}

export default compose(
    loginMutation,
    connect(null, mapDispatchToProps),
    Form.create({})
)(LoginForm);
