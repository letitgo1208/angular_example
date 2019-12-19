import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Mutation } from 'react-apollo';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withTheme } from 'styled-components';
import get from 'lodash/get';
import find from 'lodash/find';
import reject from 'lodash/reject';
import pick from 'lodash/pick';
import mapKeys from 'lodash/mapKeys';

import logger from 'utils/logger';
import { HeroLayout } from 'components/Layout';
import Icon from 'components/Icon';
import ContentBox from 'components/ContentBox';
import RichHeader from 'components/ContentBox/views/RichHeader';
import FlowQuery from './FlowQuery';
import StepCreate from './StepCreate';
import FlowCreate from './FlowCreate';
import FlowTitle from './FlowTitle';
import { makeCreateAction, makeUpdateAction } from '../queries';
import { flowProps } from '../utils';

const editStepMutationHandler = ({
    stepMutation,
    history,
    step,
    backRoute,
}) => async (values, { setSubmitting }) => {
    const processedValues = {
        id: step.id,
        ...values,
        timeOffsetMinutes: values.timeOffsetMinutes * values.timeUnit,
        timeUnit: null,
    };

    try {
        const fieldMaps = {
            timeOffsetMinutes: 'time_offset_minutes',
            timeBasis: 'time_basis',
        };
        const gqlFields = mapKeys(
            processedValues,
            (value, key) => fieldMaps[key] || key
        );

        await stepMutation({
            variables: processedValues,
            optimisticResponse: {
                updateFlowStep: {
                    id: step.id,
                    ...gqlFields,
                    __typename: 'FlowStep',
                },
            },
        });
    } catch (e) {
        logger.error('The flow action could not be updated', e);
        setSubmitting(false);
    }
    history.push(backRoute);
};

const createStepMutationHandler = ({ stepMutation }) => async (
    values,
    { setSubmitting }
) => {
    const processedValues = {
        ...values,
        timeOffsetMinutes: values.timeOffsetMinutes * values.timeUnit,
        timeUnit: null,
    };

    try {
        await stepMutation({
            variables: processedValues,
        });
    } catch (e) {
        logger.error('The flow action could not be created', e);
        setSubmitting(false);
    }
};

const StepPageWrapper = ({
    theme,
    history,
    children,
    stepType,
    stepId,
    flowId,
}) => {
    const editStep = !!stepId;
    const createFlow = !flowId;
    const mutation = editStep
        ? makeUpdateAction(stepType)
        : makeCreateAction(stepType);
    const configs = flowProps[stepType.toUpperCase()];
    const backRoute = createFlow ? '/flows' : `/flows/${flowId}`;

    let TargetMutation;
    let mutationProps;

    if (editStep) {
        // Editing an existing step
        TargetMutation = Mutation;
        mutationProps = {
            mutation,
        };
    } else if (createFlow) {
        // Creating a step on a newly-being-created flow
        TargetMutation = FlowCreate;
        mutationProps = {
            flowName: configs.title,
        };
    } else {
        // Create a step on an existing flow
        TargetMutation = StepCreate;
        mutationProps = {
            mutation,
            flowId,
        };
    }

    mutationProps = {
        ...mutationProps,
        ...(!editStep && {
            onComplete: _flowId => history.push(`/flows/${_flowId}`),
        }),
    };

    return (
        <FlowQuery flowId={flowId}>
            {flow => {
                const step =
                    editStep && find(flow.steps, _step => _step.id === stepId);
                const mutationHandler = editStep
                    ? editStepMutationHandler
                    : createStepMutationHandler;
                let initialValues = editStep
                    ? {
                          [stepType]: pick(
                              step,
                              reject(
                                  configs.fields,
                                  field => field.placeholder
                              ).map(field => field.name)
                          ),
                          timeOffsetMinutes: step.time_offset_minutes,
                          timeBasis: step.time_basis,
                          timeUnit: 1,
                      }
                    : {
                          /* eslint no-param-reassign:0 */
                          [stepType]: configs.fields.reduce((obj, field) => {
                              if (!field.placeholder) {
                                  obj[field.name] = field.initialValue || '';
                              }

                              return obj;
                          }, {}),
                          timeOffsetMinutes: 10,
                          timeBasis: 'BEFORE',
                          timeUnit: 1,
                          id: get(flow, 'id'),
                          actionSettingsId: configs.actionSettingsId,
                      };

                if (configs.rawFields) {
                    initialValues = {
                        ...initialValues,
                        [stepType]: undefined,
                        ...initialValues[stepType],
                    };
                }

                return (
                    <HeroLayout
                        renderIcon={
                            <Icon
                                type="flow"
                                width={3.5}
                                color={theme.cbcs[4]}
                            />
                        }
                        title={
                            createFlow ? (
                                'Add an Action'
                            ) : (
                                <FlowTitle flow={flow} history={history} />
                            )
                        }
                    >
                        <ContentBox
                            header={
                                <RichHeader
                                    title={configs.title}
                                    icon={
                                        <Icon
                                            type={configs.iconProps.type}
                                            width={8}
                                            fill={
                                                stepType === 'tweet'
                                                    ? undefined
                                                    : configs.iconProps.fill
                                            }
                                            shadow
                                        />
                                    }
                                    actions={[
                                        <Icon
                                            key="delete"
                                            type="trash"
                                            hover
                                            width={1.8}
                                            height={2}
                                        />,
                                    ]}
                                />
                            }
                        >
                            <TargetMutation {...mutationProps}>
                                {stepMutation => (
                                    <Formik
                                        initialValues={initialValues}
                                        onSubmit={mutationHandler({
                                            ...this.props,
                                            backRoute,
                                            step,
                                            history,
                                            stepMutation,
                                        })}
                                        render={props =>
                                            children({
                                                ...props,
                                                onCancel: () =>
                                                    history.push(backRoute),
                                            })
                                        }
                                    />
                                )}
                            </TargetMutation>
                        </ContentBox>
                    </HeroLayout>
                );
            }}
        </FlowQuery>
    );
};

StepPageWrapper.defaultProps = {
    stepId: false,
    flowId: false,
};
StepPageWrapper.propTypes = {
    theme: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    children: PropTypes.func.isRequired,
    stepType: PropTypes.string.isRequired,
    stepId: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    flowId: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
};

export default compose(withTheme, withRouter)(StepPageWrapper);
