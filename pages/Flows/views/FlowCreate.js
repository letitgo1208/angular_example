import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { CREATE_FLOW, FLOWS_QUERY } from '../queries';

const FlowCreate = ({ children, flowName, onComplete }) => (
    <Mutation
        mutation={CREATE_FLOW}
        update={(cache, { data: { createFlow } }) => {
            const { viewer } = cache.readQuery({ query: FLOWS_QUERY });

            const writing = {
                query: FLOWS_QUERY,
                data: {
                    viewer: {
                        ...viewer,
                        flows: [...viewer.flows, createFlow],
                    },
                },
            };
            cache.writeQuery(writing);

            onComplete(createFlow.id);
        }}
    >
        {createFlow => {
            const createFlowWithStep = async ({ variables }) =>
                createFlow({
                    variables: {
                        name: flowName || 'Singleton Flow',
                        steps: [
                            {
                                ...variables,
                                time_offset_minutes:
                                    variables.timeOffsetMinutes,
                                time_basis: variables.timeBasis,
                                action_settings_id: variables.actionSettingsId,
                                id: undefined,
                                timeUnit: undefined,
                                timeOffsetMinutes: undefined,
                                timeBasis: undefined,
                                actionSettingsId: undefined,
                            },
                        ],
                    },
                });

            return children(createFlowWithStep);
        }}
    </Mutation>
);

FlowCreate.defaultProps = {
    onComplete: false,
};
FlowCreate.propTypes = {
    children: PropTypes.func.isRequired,
    flowName: PropTypes.string.isRequired,
    onComplete: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
};

export default FlowCreate;
