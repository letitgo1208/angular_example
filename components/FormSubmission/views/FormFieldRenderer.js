import React from 'react';
import PropTypes from 'prop-types';
import FormFieldEdit from './FormFieldEdit';
import FormFieldDisplay from './FormFieldDisplay';

// TODO: move this out to a Wrapable component... keep these methods in there and pass the ref
// up to the parent component. That will clean this up nice

const FormFieldRenderer = props =>
    props.field.editing ? (
        <FormFieldEdit {...props} />
    ) : (
        <FormFieldDisplay {...props} />
    );

FormFieldRenderer.displayName = 'FormFieldRenderer';
FormFieldRenderer.propTypes = {
    field: PropTypes.object.isRequired,
};
FormFieldRenderer.defaultProps = {
    id: 0,
};

export default FormFieldRenderer;
