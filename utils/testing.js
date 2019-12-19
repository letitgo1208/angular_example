import React from 'react';
import { ThemeProvider } from 'styled-components';
import { MemoryRouter } from 'react-router-dom';
import theme from 'config/theme';

// eslint-disable-next-line react/prop-types
export const TestWrap = ({ children }) => (
    <MemoryRouter>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </MemoryRouter>
);
