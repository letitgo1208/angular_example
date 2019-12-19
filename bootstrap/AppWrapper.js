/**
 * app.js
 *
 * This wraps the entire application any boilerplate/config should go here
 */

import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { ThemeProvider } from 'styled-components';
import theme from 'config/theme';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { startDebugging } from 'utils/logger';

import 'sanitize.css/sanitize.css';
// Import CSS reset and Global Styles
import addGlobalStyles from 'config/global-styles';
// Don't outline objects when clicking - only when tabbing
import 'focus-outline-manager';
import 'utils/consoleOverrides';

// Load the favicon, the manifest.json file and the .htaccess file - these
// don't work with jest tests - and honestly I don't know why they have to be here
/* eslint-disable import/no-webpack-loader-syntax */
// import '!file-loader?name=[name].[ext]!../images/favicon/favicon.ico';
// import '!file-loader?name=[name].[ext]!../images/favicon/icon-72x72.png';
// import '!file-loader?name=[name].[ext]!../images/favicon/icon-96x96.png';
// import '!file-loader?name=[name].[ext]!../images/favicon/icon-120x120.png';
// import '!file-loader?name=[name].[ext]!../images/favicon/icon-128x128.png';
// import '!file-loader?name=[name].[ext]!../images/favicon/icon-144x144.png';
// import '!file-loader?name=[name].[ext]!../images/favicon/icon-152x152.png';
// import '!file-loader?name=[name].[ext]!../images/favicon/icon-167x167.png';
// import '!file-loader?name=[name].[ext]!../images/favicon/icon-180x180.png';
// import '!file-loader?name=[name].[ext]!../images/favicon/icon-192x192.png';
// import '!file-loader?name=[name].[ext]!../images/favicon/icon-384x384.png';
// import '!file-loader?name=[name].[ext]!../images/favicon/icon-512x512.png';
// import '!file-loader?name=[name].[ext]!../manifest.json';
// import 'file-loader?name=[name].[ext]!../.htaccess'; // eslint-disable-line import/extensions
/* eslint-enable import/no-webpack-loader-syntax */

import createApolloClient from './apolloClient';
import configureStore from './configureStore';

// Create redux store with history
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);
const apolloClient = createApolloClient({ history, store });

addGlobalStyles(theme);

// Dont want to debug in prod
if (process.env.NODE_ENV !== 'production') {
    startDebugging();
}

const AppWrapper = ({ children }) => (
    <Provider store={store}>
        <ApolloProvider client={apolloClient}>
            <ConnectedRouter history={history}>
                <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </ConnectedRouter>
        </ApolloProvider>
    </Provider>
);

AppWrapper.propTypes = {
    children: PropTypes.node.isRequired,
};

export default hot(module)(AppWrapper);
