import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import get from 'lodash/get';
import reject from 'lodash/reject';
import LoadingIndicator from 'components/LoadingIndicator';
import Icon from 'components/Icon';

import { overrideFieldParams, fieldParams } from '../form-util';
import { DELETE_FORM_FIELD_MUTATION, FORM_QUERY } from '../queries';

const FormFieldDisplay = props => (
    <Fragment>
        <p>
            {props.field.required && '*'} {props.field.labelText}
        </p>
        {props.field.render(
            get(overrideFieldParams, `${props.field.tag}`, fieldParams)(props)
        )}
        <Icon
            type="pencil"
            hover
            width={1.8}
            height={2}
            disabled
            onClick={e => {
                e.preventDefault();
                if (!props.itemModificationDisabled(props.field.itemId)) {
                    props.toggleEditing(props.field, true);
                }
            }}
        />
        <Mutation
            mutation={DELETE_FORM_FIELD_MUTATION}
            variables={{ id: props.field.itemId }}
            update={(cache, { data: { deleteFormField } }) => {
                const variables = {
                    id: `${props.formId}`,
                };
                const data = cache.readQuery({
                    query: FORM_QUERY,
                    variables,
                });
                cache.writeQuery({
                    query: FORM_QUERY,
                    variables,
                    data: {
                        viewer: {
                            ...data.viewer,
                            form: {
                                ...data.viewer.form,
                                fields: reject(
                                    data.viewer.form.fields,
                                    f => f.id === deleteFormField.id
                                ),
                            },
                        },
                    },
                });
            }}
        >
            {(deleteFormField, { loading }) => {
                if (loading) {
                    return <LoadingIndicator />;
                }
                return (
                    <Icon
                        type="trash"
                        hover
                        width={1.8}
                        height={2}
                        onClick={async e => {
                            e.preventDefault();
                            if (
                                !props.itemModificationDisabled(
                                    props.field.itemId
                                )
                            ) {
                                deleteFormField();
                                await props.removeField(props.field.itemId);
                            }
                        }}
                    />
                );
            }}
        </Mutation>
    </Fragment>
);
FormFieldDisplay.displayName = 'FormFieldDisplay';
FormFieldDisplay.propTypes = {
    formId: PropTypes.number.isRequired,
    field: PropTypes.object.isRequired,
    toggleEditing: PropTypes.func.isRequired,
    removeField: PropTypes.func.isRequired,
    itemModificationDisabled: PropTypes.func.isRequired,
};

export default FormFieldDisplay;
