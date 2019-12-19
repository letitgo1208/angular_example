import React from 'react';
import styled from 'styled-components';
import H1 from 'components/H1';
import RegisterForm from './views/RegisterForm';

const RegisterWrapper = styled.div`
    padding: 20px;
    width: 500px;
    height: 300px;
    margin: 0 auto;
    flex-direction: column;
`;

const RegisterPage = () => (
    <RegisterWrapper>
        <H1>Register</H1>
        <RegisterForm />
    </RegisterWrapper>
);

export default RegisterPage;
