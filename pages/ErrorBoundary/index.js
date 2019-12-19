import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import H1 from 'components/H1';
import H2 from 'components/H2';

const ErrorWrapper = styled.div`
    width: 50%;
    margin: 0 auto;
`;

const ErrorBox = styled.div`
    padding: 2rem;
    background: red;
    border-radius: 2px;
    color: white;
    margin-bottom: 2rem;
`;

const Stack = styled.pre`
    font-weight: 700;
`;

const ErrorTitle = H2.extend`
    color: white;
    font-weight: 700;
`;

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: '', info: '' };
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true, error, info });
        // We should throw this to track js here
    }

    render() {
        if (!this.state.hasError) return this.props.children;
        return (
            <ErrorWrapper>
                <H1>An Error Has Occurred</H1>
                {process.env.NODE_ENV !== 'production' && (
                    <ErrorBox>
                        <ErrorTitle>
                            Error: {this.state.error.message}
                        </ErrorTitle>
                        <Stack>{this.state.error.stack}</Stack>
                        <Stack>{this.state.info.componentStack}</Stack>
                    </ErrorBox>
                )}
            </ErrorWrapper>
        );
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
