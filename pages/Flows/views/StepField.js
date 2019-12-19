import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import get from 'lodash/get';

import { Input, Label, TextArea } from 'components/Form';

const StyledLabel = styled(Label)`
    text-transform: uppercase;
`;
const TopLabel = styled(Label)`
    padding-top: 0 !important;
    text-transform: uppercase;
`;

const components = {
    input: Input,
    textarea: TextArea,
};
const defaultProps = {
    input: {
        type: 'text',
        size: 'lg',
        width: '100%',
        required: true,
    },
    textarea: {
        size: 'lg',
        width: '100%',
        required: true,
    },
};

const StepField = ({ field, values, setFieldValue, fieldString, isFirst }) => {
    const FormElement = components[field.componentType];
    const LabelElement = isFirst ? TopLabel : StyledLabel;

    if (field.component) {
        return field.component;
    }

    return (
        <Fragment>
            {!field.hideLabel && (
                <LabelElement width="100%" htmlFor={field.name}>
                    {field.label || field.name}
                </LabelElement>
            )}
            <FormElement
                {...defaultProps[field.componentType]}
                value={get(values, fieldString)}
                onChange={e => setFieldValue(fieldString, e.target.value)}
                {...field.componentProps}
            />
        </Fragment>
    );
};

StepField.propTypes = {
    field: PropTypes.object.isRequired,
    values: PropTypes.object.isRequired,
    setFieldValue: PropTypes.func.isRequired,
    fieldString: PropTypes.string.isRequired,
    isFirst: PropTypes.bool.isRequired,
};

export default StepField;
