import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import styled, { withTheme } from 'styled-components';
import Button from 'components/Button';
import FormTags from '../helpers/FormTags';

const Title = styled.h1``;

const FormTagSidebar = ({ handleAddItem, itemModificationDisabled }) => (
    <Fragment>
        <Title>Sidebar</Title>
        {Object.keys(FormTags).map(key => (
            <Button
                key={key}
                disabled={itemModificationDisabled(key)}
                onClick={event => {
                    event.stopPropagation();
                    handleAddItem(key);
                }}
            >
                {FormTags[key].itemText}
            </Button>
        ))}
    </Fragment>
);

FormTagSidebar.displayName = 'Create Form';
FormTagSidebar.propTypes = {
    handleAddItem: PropTypes.func.isRequired,
    itemModificationDisabled: PropTypes.func.isRequired,
};

const enhance = compose(withTheme);

export default enhance(FormTagSidebar);
