import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MultipleSelectFilter } from 'components/Form';
import Button from 'components/Button';
import EventAssociationPopover from './EventAssociationPopover';

const ButtonStyled = styled(Button)`
    && {
        margin: 0 auto;
        display: block;
    }
`;

const EventAssociationInput = ({
    selectedValues,
    setSelectedValues,
    placeholder,
    data,
    filterKeys,
    titleKey,
    descriptionKey,
    Image,
    emptyResultsMessage,
}) => (
    <MultipleSelectFilter
        filterKeys={filterKeys}
        selectedKey="id"
        inputProps={{
            variant: 'eventSidebarAssociation',
            placeholder,
            width: '100%',
            size: 'sm',
        }}
        popoverProps={{
            placement: 'top',
            modifiers: {
                flip: {
                    behavior: ['top'],
                },
            },
            maxHeight: 24,
            footer: () => (
                <ButtonStyled variant="secondary" size="small">
                    Create New
                </ButtonStyled>
            ),
        }}
        unfilteredOptions={data}
        selectedValues={selectedValues}
        setSelectedValues={value =>
            setSelectedValues([...selectedValues, value])
        }
        // filtered options are the filtered options from the input AND with the selectedValues removed
        overlay={({ filteredOptions, handleItemClick }) => (
            <EventAssociationPopover
                // We remove any people that are in the visibileRows prop
                visibleRows={filteredOptions}
                data={data}
                handleAdd={value => {
                    handleItemClick(value);
                }}
                selectedValues={selectedValues}
                titleKey={titleKey}
                descriptionKey={descriptionKey}
                Image={Image}
                emptyResultsMessage={emptyResultsMessage}
            />
        )}
    />
);

EventAssociationInput.defaultProps = {
    filterKeys: ['label'],
    descriptionKey: undefined,
};

EventAssociationInput.propTypes = {
    selectedValues: PropTypes.array.isRequired,
    setSelectedValues: PropTypes.func.isRequired,
    filterKeys: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.array.isRequired,
    placeholder: PropTypes.string.isRequired,
    // The key in data where we can find the title
    titleKey: PropTypes.string.isRequired,
    // The key in data where we can find the description - can be undefined
    descriptionKey: PropTypes.string,
    Image: PropTypes.func.isRequired,
    emptyResultsMessage: PropTypes.string.isRequired,
};

export default EventAssociationInput;
