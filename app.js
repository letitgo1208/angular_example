/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Import all the third party stuff
import React from 'react';
import { render } from 'react-dom';
import { APP_NAME_SAFE, ROOT_ID } from 'utils/constants';
import OurApplication from 'utils/lungo';
import moment from 'moment';
import log from 'utils/logger';

// Import root app
import AppWrapper from 'bootstrap/AppWrapper';
import Routes from 'bootstrap/Routes';
import Layout from 'components/Layout';
import ErrorBoundary from 'pages/ErrorBoundary';

// expose Application
window[APP_NAME_SAFE] = OurApplication;

const MOUNT_NODE = document.getElementById(ROOT_ID);

const init = () => {
    render(
        <AppWrapper>
            <Layout>
                <ErrorBoundary>
                    <Routes />
                </ErrorBoundary>
            </Layout>
        </AppWrapper>,
        MOUNT_NODE
    );
};

if (module.hot) {
    module.hot.accept();
    const currentTime = moment(new Date()).format('h:mm:mma');
    log.info(`[HMR] - Module Reloaded at ${currentTime}`);
}

init();

log.info('Application has been initialized');
