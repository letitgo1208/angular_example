import gql from 'graphql-tag';
import { flowProps } from './utils';

export const STEP_ADDED = 'STEP_ADDED';

export const STEP_FRAGMENTS = {
    fields: gql`
        fragment StepFields on FlowStep {
            id
            actionSetting {
                id
                action
            }
            time_basis
            time_offset_minutes
        }
    `,
    email: gql`
        fragment EmailFields on EmailStep {
            reply_to
            to
            subject
            body
        }
    `,
    sms: gql`
        fragment SmsFields on SMSStep {
            to
            sms
        }
    `,
    tweet: gql`
        fragment TweetFields on TweetStep {
            tweet
        }
    `,
};

export const FLOWS_QUERY = gql`
    ${STEP_FRAGMENTS.fields}
    query Viewer {
        viewer {
            flows {
                id
                name
                steps {
                    ...StepFields
                }
            }
        }
    }
`;

export const CREATE_FLOW = gql`
    ${STEP_FRAGMENTS.fields}
    ${STEP_FRAGMENTS.email}
    ${STEP_FRAGMENTS.sms}
    ${STEP_FRAGMENTS.tweet}
    mutation CreateFlow($name: String, $steps: [FlowStepInput]) {
        createFlow(name: $name, steps: $steps) {
            id
            name
            steps {
                ...StepFields
                ...EmailFields
                ...SmsFields
                ...TweetFields
            }
        }
    }
`;

export const FLOW_QUERY = gql`
    ${STEP_FRAGMENTS.fields}
    ${STEP_FRAGMENTS.email}
    ${STEP_FRAGMENTS.sms}
    ${STEP_FRAGMENTS.tweet}
    query Viewer($id: ID!) {
        viewer {
            flow(id: $id) {
                id
                name
                steps {
                    ...StepFields
                    ...EmailFields
                    ...SmsFields
                    ...TweetFields
                }
            }
        }
    }
`;

export const makeCreateAction = type => gql`
    ${STEP_FRAGMENTS.fields}
    mutation Create${type}Action(
        $id: ID!
        $actionSettingsId: ID!
        $timeBasis: String
        $timeOffsetMinutes: Int
        \$${type}: ${flowProps[type.toUpperCase()].gqlInputType}
    ) {
        createFlowStep(
            flow_id: $id
            action_settings_id: $actionSettingsId
            time_basis: $timeBasis
            time_offset_minutes: $timeOffsetMinutes
            ${type}: \$${type}
        ) {
            ...StepFields
        }
    }
`;

export const makeUpdateAction = type => gql`
    ${STEP_FRAGMENTS.fields}
    mutation Update${type}Action(
        $id: ID!
        $timeBasis: FlowStepTimeBasis
        $timeOffsetMinutes: Int
        \$${type}: ${flowProps[type.toUpperCase()].gqlInputType}
    ) {
        updateFlowStep(
            id: $id
            time_basis: $timeBasis
            time_offset_minutes: $timeOffsetMinutes
            ${type}: \$${type}
        ) {
            ...StepFields
        }
    }
`;

export const DELETE_FLOW = gql`
    mutation DeleteFlow($id: ID!) {
        deleteFlow(id: $id) {
            id
        }
    }
`;

export const UPDATE_FLOW = gql`
    mutation UpdateFlow($id: ID!, $name: String) {
        updateFlow(id: $id, name: $name) {
            id
            name
        }
    }
`;

export const DELETE_FLOW_STEP = gql`
    mutation DeleteFlowStep($id: ID!) {
        deleteFlowStep(id: $id) {
            id
        }
    }
`;

export const updateFlowsCache = type => {
    const mapper = {
        STEP_ADDED: (flowId, cache, createFlowStep) => {
            const { viewer } = cache.readQuery({
                query: FLOWS_QUERY,
            });

            cache.writeQuery({
                query: FLOWS_QUERY,
                data: {
                    viewer: {
                        ...viewer,
                        flows: viewer.flows.map(flow => {
                            if (flow.id === parseInt(flowId, 10)) {
                                return {
                                    ...flow,
                                    steps: [...flow.steps, createFlowStep],
                                };
                            }

                            return flow;
                        }),
                    },
                },
            });
        },
    };

    return mapper[type];
};

export const updateFlowCache = type => {
    const mapper = {
        STEP_ADDED: (flowId, cache, createFlowStep) => {
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
                            steps: [...viewer.flow.steps, createFlowStep],
                        },
                    },
                },
            });
        },
    };

    return mapper[type];
};
