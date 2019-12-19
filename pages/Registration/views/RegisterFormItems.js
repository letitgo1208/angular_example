import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;

const RegisterFormItems = ({ getFieldDecorator, handleSubmit }) => (
    <Form onSubmit={handleSubmit} className="register-form">
        <FormItem>
            {getFieldDecorator('first_name', {
                rules: [
                    {
                        required: true,
                        message: 'Please input your first name.',
                    },
                ],
            })(
                <Input
                    prefix={
                        <Icon
                            type="user"
                            style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                    }
                    placeholder="First Name"
                />
            )}
        </FormItem>
        <FormItem>
            {getFieldDecorator('last_name', {
                rules: [
                    { required: true, message: 'Please input your last name.' },
                ],
            })(
                <Input
                    prefix={
                        <Icon
                            type="user"
                            style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                    }
                    placeholder="Last Name"
                />
            )}
        </FormItem>
        <FormItem>
            {getFieldDecorator('email', {
                rules: [
                    {
                        required: true,
                        message: 'Please input your email address.',
                    },
                ],
            })(
                <Input
                    prefix={
                        <Icon
                            type="user"
                            style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                    }
                    placeholder="Email"
                />
            )}
        </FormItem>
        <FormItem>
            {getFieldDecorator('password', {
                rules: [
                    { required: true, message: 'Please input your Password!' },
                ],
            })(
                <Input
                    prefix={
                        <Icon
                            type="lock"
                            style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                    }
                    type="password"
                    placeholder="Password"
                />
            )}
        </FormItem>
        <FormItem>
            <Button
                type="primary"
                htmlType="submit"
                className="register-form-button"
            >
                Register
            </Button>
            Or <Link to="/login">login now!</Link>
        </FormItem>
    </Form>
);

RegisterFormItems.propTypes = {
    getFieldDecorator: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default RegisterFormItems;
