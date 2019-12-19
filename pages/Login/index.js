import React from 'react';
import styled from 'styled-components';

import H1 from 'components/H1';
import LoginForm from './views/LoginForm';

const LoginWrapper = styled.div`
    padding: 20px;
    width: 500px;
    height: 300px;
    margin: 0 auto;
    flex-direction: column;
`;

const LoginPage = () => (
    <LoginWrapper>
        <H1>Login</H1>
        <LoginForm />
    </LoginWrapper>
);

export default LoginPage;
