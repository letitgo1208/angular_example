import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';

import Img from 'components/Img';
import Button from 'components/Button';
import { List, ListItem, RichListItemContent } from 'components/List';

import { PEOPLE_PROP_TYPES } from '../types';

const Image = styled(Img)`
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
`;

const StyledList = styled(List)`
    width: ${({ theme }) => theme.szb * 40}rem;
`;

const StyledListItem = styled(ListItem)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:first-child {
        margin-top: ${({ theme }) => theme.spb * 1.1}rem;
    }
`;

const NoResults = styled.div`
    margin-top: ${({ theme }) => theme.spb * 3}rem;
`;

const EventAddPeopleList = ({ people, visibleRows, handleAdd, theme }) => {
    const visibleRowsValues = visibleRows.map(option => option.value);

    const visiblePeople = people.filter(person =>
        visibleRowsValues.includes(person.id)
    );

    return (
        <Fragment>
            {visiblePeople.length > 0 ? (
                <StyledList>
                    {visiblePeople.map(person => (
                        <StyledListItem
                            horizontalPadding={theme.spb * 2}
                            variant="no-divider"
                            key={person.id}
                        >
                            <RichListItemContent
                                horizontalGroupProps={{
                                    size: 'sm',
                                }}
                                image={
                                    <Image
                                        src={person.image}
                                        alt={person.full_name}
                                    />
                                }
                                title={person.full_name}
                                description={person.email}
                                actions={
                                    <Button
                                        onClick={() => handleAdd(person.id)}
                                        size="small"
                                    >
                                        Add
                                    </Button>
                                }
                            />
                        </StyledListItem>
                    ))}
                </StyledList>
            ) : (
                <NoResults>No people matched your search.</NoResults>
            )}
        </Fragment>
    );
};

EventAddPeopleList.defaultProps = {
    visibleRows: [],
};

EventAddPeopleList.propTypes = {
    visibleRows: PropTypes.arrayOf(PropTypes.object),
    people: PEOPLE_PROP_TYPES.isRequired,
    handleAdd: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
};
EventAddPeopleList.displayName = 'EventAddPeopleList';

export default withTheme(EventAddPeopleList);
