import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MultipleSelectFilter } from 'components/Form';
import Button from 'components/Button';
import EventAddPeopleList from './EventAddPeopleList';
import { PEOPLE_PROP_TYPES } from '../types';

const ButtonStyled = styled(Button)`
    && {
        margin: 0 auto;
        display: block;
    }
`;

const EventAddPeople = ({ selectedValues, setSelectedValues, people }) => {
    const unfilteredOptions = people.map(person => ({
        full_name: person.full_name,
        email: person.email,
        value: person.id,
    }));

    return (
        <MultipleSelectFilter
            filterKeys={['full_name', 'email']}
            inputProps={{
                variant: 'eventSidebarAssociation',
                placeholder: 'Add people',
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
            unfilteredOptions={unfilteredOptions}
            selectedValues={selectedValues}
            setSelectedValues={value =>
                setSelectedValues([...selectedValues, value])
            }
            // filtered options are the filtered options from the input AND with the selectedValues removed
            overlay={({ filteredOptions, handleItemClick }) => (
                <EventAddPeopleList
                    // We remove any people that are in the visibileRows prop
                    visibleRows={filteredOptions}
                    people={people}
                    handleAdd={value => {
                        handleItemClick(value);
                    }}
                    selectedValues={selectedValues}
                />
            )}
        />
    );
};

EventAddPeople.propTypes = {
    selectedValues: PropTypes.array.isRequired,
    setSelectedValues: PropTypes.func.isRequired,
    people: PEOPLE_PROP_TYPES.isRequired,
};

export default EventAddPeople;
