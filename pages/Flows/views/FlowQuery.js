import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { Query } from 'react-apollo';

import LoadingIndicator from 'components/LoadingIndicator';
import { FLOW_QUERY } from '../queries';

const FlowQuery = ({ children, flowId }) => {
    if (!flowId) {
        return children(null);
    }

    return (
        <Query query={FLOW_QUERY} variables={{ id: flowId }}>
            {({ loading, data }) => {
                if (loading && isEmpty(data)) {
                    return <LoadingIndicator />;
                }

                const {
                    viewer: { flow },
                } = data;

                return children(flow);
            }}
        </Query>
    );
};

FlowQuery.defaultProps = {
    flowId: false,
};
FlowQuery.propTypes = {
    children: PropTypes.func.isRequired,
    flowId: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
};

export default FlowQuery;
