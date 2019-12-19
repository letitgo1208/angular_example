import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form } from 'formik';

import HR from 'components/HR';
import { Label, PositiveNegativeButtons } from 'components/Form';
import StepTimeSelect from './views/StepTimeSelect';
import { flowProps, extractRouteParam } from './utils';
import StepPageWrapper from './views/StepPageWrapper';
import StepField from './views/StepField';

const StyledLabel = styled(Label)`
    padding-top: 0 !important;
    text-transform: uppercase;
`;

const FlowStep = ({ match, stepType }) => {
    const flowId = extractRouteParam(match);
    const stepId = extractRouteParam(match, 'stepId');
    const configs = flowProps[stepType.toUpperCase()];

    return (
        <StepPageWrapper flowId={flowId} stepId={stepId} stepType={stepType}>
            {({ values, setFieldValue, isSubmitting, onCancel }) => (
                <Form>
                    {configs.fields.map((field, index) => {
                        const fieldString = configs.rawFields
                            ? field.name
                            : `${stepType}.${field.name}`;

                        return (
                            <StepField
                                key={field.name}
                                field={field}
                                values={values}
                                setFieldValue={setFieldValue}
                                fieldString={fieldString}
                                isFirst={index === 0}
                            />
                        );
                    })}
                    <HR />
                    <StyledLabel width="100%" htmlFor="time_settings">
                        {configs.title}
                    </StyledLabel>
                    <StepTimeSelect
                        name="time_settings"
                        values={values}
                        setFieldValue={setFieldValue}
                    />
                    <HR />
                    <PositiveNegativeButtons
                        positiveText="Save Action"
                        onNegative={onCancel}
                        isSaving={isSubmitting}
                    />
                </Form>
            )}
        </StepPageWrapper>
    );
};

FlowStep.propTypes = {
    match: PropTypes.object.isRequired,
    stepType: PropTypes.string.isRequired,
};
FlowStep.displayName = 'FlowStep';

export default FlowStep;
