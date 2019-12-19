import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import get from 'lodash/get';
import ApolloResponse from 'components/ApolloResponse';
import { FORMS_QUERY } from 'components/FormSubmission/queries';

const FormsQuery = ({ children, apolloResponseProps }) => (
    <Query query={FORMS_QUERY}>
        {({ loading, error, data }) => (
            <ApolloResponse
                loading={loading}
                data={data}
                error={error}
                {...apolloResponseProps}
            >
                {children({ forms: get(data, 'viewer.forms', []) })}
            </ApolloResponse>
        )}
    </Query>
);

FormsQuery.defaultProps = {
    includeFlowList: false,
    shouldRenderChildrenImmediately: false,
    apolloResponseProps: {},
};

FormsQuery.propTypes = {
    children: PropTypes.func.isRequired,
    shouldRenderChildrenImmediately: PropTypes.bool,
    includeFlowList: PropTypes.bool,
    apolloResponseProps: PropTypes.object,
};

export default FormsQuery;
