import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input, Checkbox } from 'components/Form';
import Button from 'components/Button';

import { getRequiredValue } from '../form-util';

const FormFieldEdit = props => (
    <Fragment>
        <p>Question</p>
        <Input
            autoFocus
            variant="title"
            placeholder="I love unicorns"
            value={props.field.pendingText}
            onKeyPress={event => {
                event.stopPropagation();
                if (event.charCode === 13) {
                    event.preventDefault();
                    props.saveForm(props.field);
                }
            }}
            onChange={event => {
                event.stopPropagation();
                const value = event.target.value;
                props.onChange({
                    id: props.field.itemId,
                    field: 'pendingText',
                    value,
                });
            }}
        />
        {props.field.renderOptions && props.field.renderOptions(props)}
        <Checkbox
            checked={getRequiredValue(props.field)}
            className={getRequiredValue(props.field) && 'active'}
            setChecked={event => {
                event.stopPropagation();
                props.onChange({
                    id: props.field.itemId,
                    field: 'pendingRequired',
                    value: !getRequiredValue(props.field),
                });
            }}
        />
        <span>required ?</span>
        <Button
            disabled={!props.field.pendingText}
            onClick={async event => {
                event.stopPropagation();
                await props.saveForm(props.field);
            }}
        >
            Save
        </Button>
        <Button
            variant="tertiary"
            onClick={event => {
                event.stopPropagation();
                props.toggleEditing(props.field, false);
            }}
        >
            Cancel
        </Button>
    </Fragment>
);

FormFieldEdit.displayName = 'FormFieldEdit';
FormFieldEdit.propTypes = {
    field: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    toggleEditing: PropTypes.func.isRequired,
    saveForm: PropTypes.func.isRequired,
};

export default FormFieldEdit;
