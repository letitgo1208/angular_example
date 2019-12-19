/**
 * A component to handle the loading and error responses returned from Apollo
 */

import React from 'react';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import LoadingIndicator from 'components/LoadingIndicator';

const ApolloResponse = ({
    loading,
    error,
    data,
    shouldHaveData,
    shouldRenderChildrenImmediately,
    renderLoading,
    renderError,
    children,
}) => {
    // We have to check if data is empty if we're going to render only a loading
    // indicator. Because we load in cache first but immediately do network
    // requests AFTER just to invalidate cache if need be. So we need to make sure
    // in those cases that there is no data if we want to load the indicator
    if (
        loading &&
        (isEmpty(data) && shouldHaveData) &&
        !shouldRenderChildrenImmediately
    ) {
        return renderLoading;
    }

    if (error) {
        return renderError(error.message);
    }

    return children;
};

ApolloResponse.defaultProps = {
    renderError: errorMessage => `Error! ${errorMessage}`,
    renderLoading: <LoadingIndicator />,
    error: false,
    shouldHaveData: true,
    shouldRenderChildrenImmediately: false,
};

ApolloResponse.propTypes = {
    loading: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    data: PropTypes.object.isRequired,
    renderLoading: PropTypes.node,
    renderError: PropTypes.func,
    shouldHaveData: PropTypes.bool,
    // Sometimes we don't want to wait on the response to render the children
    // In this case it will send down empty data immediately
    shouldRenderChildrenImmediately: PropTypes.bool,
};

ApolloResponse.displayName = 'ApolloResponse';

export default ApolloResponse;
