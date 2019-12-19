import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Form } from 'antd';
import get from 'lodash/get';
import log from 'utils/logger';
import { setToken, setUser } from 'utils/storage';

import { registerUser } from '../actions';
import { registerMutation } from '../queries';
import RegisterFormItems from './RegisterFormItems';

const RegisterFormWrapper = styled.div`
    .register-form {
        max-width: 300px;
    }
    .register-form-forgot {
        float: right;
    }
    .register-form-button {
        width: 100%;
    }
`;

class RegisterForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            try {
                if (err) {
                    log.error('Unable to validate form', values, err);
                    return;
                }
                const { data } = await this.props.registerMutation({
                    ...values,
                    password_confirmation: values.password,
                });
                const { user, createAccount } = data;
                const token = get(createAccount, 'auth_token.access_token');
                setToken(token);
                setUser(user);
                this.props.registerUser(user);
            } catch (asyncErr) {
                log.error('Unable to log in', asyncErr);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <RegisterFormWrapper>
                <RegisterFormItems
                    getFieldDecorator={getFieldDecorator}
                    handleSubmit={this.handleSubmit}
                />
            </RegisterFormWrapper>
        );
    }
}

RegisterForm.propTypes = {
    form: PropTypes.object.isRequired,
    registerMutation: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
    return {
        registerUser: credentials => dispatch(registerUser(credentials)),
        dispatch,
    };
}

export default compose(
    registerMutation,
    connect(null, mapDispatchToProps),
    Form.create({})
)(RegisterForm);
