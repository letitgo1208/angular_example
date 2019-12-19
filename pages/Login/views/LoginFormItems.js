import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;

const LoginFormItems = ({ getFieldDecorator, handleSubmit }) => (
    <Form onSubmit={handleSubmit} className="login-form">
        <FormItem>
            {getFieldDecorator('username', {
                rules: [
                    { required: true, message: 'Please input your username!' },
                ],
            })(
                <Input
                    prefix={
                        <Icon
                            type="user"
                            style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                    }
                    placeholder="Username"
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
            {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            <a className="login-form-forgot" href="">
                Forgot password
            </a>
            <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
            >
                Log in
            </Button>
            Or <Link to="/register">register now!</Link>
        </FormItem>
    </Form>
);

LoginFormItems.propTypes = {
    getFieldDecorator: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default LoginFormItems;
