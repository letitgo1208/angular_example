import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import get from 'lodash/get';
import map from 'lodash/map';
import ApolloResponse from 'components/ApolloResponse';
import { FLOWS_QUERY } from '../queries';
import { flowInfo } from '../utils';

const FlowsQuery = ({ children, includeFlowList, apolloResponseProps }) => {
    const mapFlows = data => {
        if (includeFlowList) {
            return map(get(data.viewer, 'flows', []), flow => ({
                id: flow.id,
                title: flow.name,
                ...flowInfo(flow),
            }));
        }
        return false;
    };

    return (
        <Query query={FLOWS_QUERY}>
            {({ loading, error, data }) => {
                const flowList = mapFlows(data);
                return (
                    <ApolloResponse
                        loading={loading}
                        error={error}
                        data={data}
                        {...apolloResponseProps}
                    >
                        {children({
                            flows: get(data, 'viewer.flows', []),
                            flowList,
                        })}
                    </ApolloResponse>
                );
            }}
        </Query>
    );
};

FlowsQuery.defaultProps = {
    includeFlowList: false,
    shouldRenderChildrenImmediately: false,
    apolloResponseProps: {},
};

FlowsQuery.propTypes = {
    children: PropTypes.func.isRequired,
    shouldRenderChildrenImmediately: PropTypes.bool,
    includeFlowList: PropTypes.bool,
    apolloResponseProps: PropTypes.object,
};

export default FlowsQuery;
