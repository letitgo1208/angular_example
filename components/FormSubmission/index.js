import React from 'react';
import PropTypes from 'prop-types';
import * as FormTypes from './helpers';

const FormSubmission = ({ saveable, ...props }) => {
    const Component = saveable
        ? FormTypes.FormSaveable
        : FormTypes.FormEditable;
    return <Component {...props} />;
};

FormSubmission.defaultProps = {
    saveable: true,
};

FormSubmission.propTypes = {
    saveable: PropTypes.bool,
};

export default FormSubmission;
