import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import reject from 'lodash/reject';

import LoadingIndicator from 'components/LoadingIndicator';
import Icon from 'components/Icon';
import { DELETE_FLOW_STEP, FLOW_QUERY } from '../queries';

const FlowStepDelete = ({ step, flowId }) => (
    <Mutation
        mutation={DELETE_FLOW_STEP}
        optimisticResponse={{
            deleteFlowStep: {
                id: step.id,
                __typename: 'FlowStep',
            },
        }}
        update={(cache, { data: { deleteFlowStep } }) => {
            const variables = {
                id: flowId,
            };
            const { viewer } = cache.readQuery({
                query: FLOW_QUERY,
                variables,
            });
            cache.writeQuery({
                query: FLOW_QUERY,
                variables,
                data: {
                    viewer: {
                        ...viewer,
                        flow: {
                            ...viewer.flow,
                            steps: reject(
                                viewer.flow.steps,
                                s => s.id === deleteFlowStep.id
                            ),
                        },
                    },
                },
            });
        }}
    >
        {(deleteFlowStep, { loading }) => {
            if (loading) {
                return <LoadingIndicator />;
            }

            return (
                <Icon
                    key="delete"
                    type="trash"
                    hover
                    width={1.8}
                    height={2}
                    onClick={e => {
                        e.preventDefault();
                        deleteFlowStep({ variables: { id: step.id } });
                    }}
                />
            );
        }}
    </Mutation>
);

FlowStepDelete.propTypes = {
    step: PropTypes.object.isRequired,
    flowId: PropTypes.number.isRequired,
};

export default FlowStepDelete;
