import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import reject from 'lodash/reject';

import Icon from 'components/Icon';
import { DELETE_FLOW, FLOWS_QUERY } from '../queries';

const FlowDelete = ({ flow, onComplete }) => (
    <Mutation
        mutation={DELETE_FLOW}
        optimisticResponse={{
            deleteFlow: {
                id: flow.id,
                __typename: 'Flow',
            },
        }}
        update={(cache, { data: { deleteFlow } }) => {
            const { viewer } = cache.readQuery({ query: FLOWS_QUERY });

            const writing = {
                query: FLOWS_QUERY,
                data: {
                    viewer: {
                        ...viewer,
                        flows: reject(
                            viewer.flows,
                            f => f.id === deleteFlow.id
                        ),
                    },
                },
            };
            cache.writeQuery(writing);
        }}
        onCompleted={() => {
            if (onComplete) {
                onComplete();
            }
        }}
    >
        {deleteFlow => (
            <Icon
                key="delete"
                type="trash"
                hover
                width={1.8}
                height={2}
                onClick={e => {
                    e.preventDefault();
                    deleteFlow({ variables: { id: flow.id } });
                }}
            />
        )}
    </Mutation>
);

FlowDelete.defaultProps = {
    onComplete: false,
};
FlowDelete.propTypes = {
    flow: PropTypes.object.isRequired,
    onComplete: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
};

export default FlowDelete;
