import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import Icon from 'components/Icon';
import {
    deleteFormOptimisticResponse,
    deleteFormOptimisticCache,
    DELETE_FORM_MUTATION,
} from '../queries';

const IconWrapper = styled.span``;

const DeleteForm = ({ theme, history, formId }) =>
    formId ? (
        <Mutation
            mutation={DELETE_FORM_MUTATION}
            optimisticResponse={deleteFormOptimisticResponse(formId)}
            update={deleteFormOptimisticCache(formId)}
            variables={{ id: formId }}
        >
            {deleteItem => (
                <IconWrapper
                    onClick={() => {
                        deleteItem();
                        history.push('/forms');
                    }}
                >
                    <Icon type="cog" width={3.5} color={theme.cbcs[4]} />
                </IconWrapper>
            )}
        </Mutation>
    ) : null;

DeleteForm.displayName = 'DeleteForm';
DeleteForm.propTypes = {
    history: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    formId: PropTypes.number,
};
DeleteForm.defaultProps = {
    formId: 0,
};

export default DeleteForm;
