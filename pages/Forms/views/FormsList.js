import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import Button from 'components/Button';

import {
    deleteFormOptimisticResponse,
    deleteFormOptimisticCache,
    DELETE_FORM_MUTATION,
} from 'components/FormSubmission/queries';
import ConfirmDelete from '../../../components/Popover/views/ConfirmDelete';

const FormItem = styled.li`
    cursor: pointer;
`;

const FormsList = ({ forms }) => (
    <ul>
        {forms.map(formItem => (
            <FormItem key={formItem.id}>
                <Link to={`/forms/${formItem.id}`} state={formItem}>
                    {formItem.name}
                </Link>
                <Mutation
                    mutation={DELETE_FORM_MUTATION}
                    optimisticResponse={deleteFormOptimisticResponse(
                        formItem.id
                    )}
                    update={deleteFormOptimisticCache(formItem.id)}
                    variables={{ id: formItem.id }}
                >
                    {deleteItem => (
                        <ConfirmDelete onDelete={deleteItem}>
                            <Button
                                onClick={event => {
                                    event.stopPropagation();
                                }}
                            >
                                Delete
                            </Button>
                        </ConfirmDelete>
                    )}
                </Mutation>
            </FormItem>
        ))}
    </ul>
);

FormsList.propTypes = {
    forms: PropTypes.array.isRequired,
};

export default FormsList;
