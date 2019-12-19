import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import get from 'lodash/get';

import Button from 'components/Button';
import { List, ListItem, RichListItemContent } from 'components/List';

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

const EventAssociationPopover = ({
    data,
    visibleRows,
    handleAdd,
    theme,
    titleKey,
    descriptionKey,
    emptyResultsMessage,
    Image,
}) => {
    const visibleRowsValues = visibleRows.map(option => option.id);

    const visibleData = data.filter(value =>
        visibleRowsValues.includes(value.id)
    );

    return visibleData.length > 0 ? (
        <StyledList>
            {visibleRows.map(row => (
                <StyledListItem
                    horizontalPadding={theme.spb * 2}
                    variant="no-divider"
                    key={row.id}
                >
                    <RichListItemContent
                        horizontalGroupProps={{
                            size: 'sm',
                        }}
                        image={<Image row={row} />}
                        title={get(row, titleKey, '')}
                        description={get(row, descriptionKey, '')}
                        actions={
                            <Button
                                onClick={() => handleAdd(row.id)}
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
        <NoResults>{emptyResultsMessage}</NoResults>
    );
};

EventAssociationPopover.defaultProps = {
    visibleRows: [],
    descriptionKey: undefined,
};

EventAssociationPopover.propTypes = {
    visibleRows: PropTypes.arrayOf(PropTypes.object),
    data: PropTypes.arrayOf([
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.number]).isRequired,
        }),
    ]).isRequired,
    handleAdd: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    // The key in data where we can find the title
    titleKey: PropTypes.string.isRequired,
    // The key in data where we can find the description - can be undefined
    descriptionKey: PropTypes.string,
    emptyResultsMessage: PropTypes.string.isRequired,
    Image: PropTypes.node.isRequired,
};

EventAssociationPopover.displayName = 'EventAddPeopleList';

export default withTheme(EventAssociationPopover);
