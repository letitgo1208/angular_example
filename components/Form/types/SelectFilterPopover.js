import React from 'react';
import PropTypes from 'prop-types';
import Popover, { SelectableMenu } from 'components/Popover';
import Filter from 'components/Filter';
import FilterInput from '../views/FilterInput';
import { OPTIONS_TYPE } from '../types';

const optionsToMenu = ({ filteredData, handleClick }) =>
    filteredData.map(item => {
        if (typeof item.label === 'undefined')
            return {
                category: item.category,
            };

        return {
            text: item.label,
            onClick: () => handleClick(item.value),
        };
    });

const SelectFilterPopover = props => (
    <Filter
        filterKeys={['label']}
        excludedKeys={['category']}
        data={props.unfilteredOptions}
    >
        {({ handleFilter, filteredData }) => (
            <Popover
                {...props.popoverProps}
                maxHeight={36.3}
                bodyProps={{
                    marginTop: -1.5,
                }}
                header={() => (
                    <FilterInput
                        handleFilter={handleFilter}
                        inputProps={{
                            autoFocus: true,
                            size: 'sm',
                            width: '100%',
                        }}
                    />
                )}
                overlay={({ setIsOpen }) => (
                    <SelectableMenu
                        width={32.2}
                        setIsOpen={setIsOpen}
                        items={optionsToMenu({
                            filteredData,
                            handleClick: props.handleClick,
                        })}
                    />
                )}
            >
                {({ isOpen }) => props.children({ isOpen })}
            </Popover>
        )}
    </Filter>
);

SelectFilterPopover.defaultProps = {
    popoverProps: {},
};

SelectFilterPopover.propTypes = {
    popoverProps: PropTypes.object,
    handleClick: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types, react/require-default-props
    unfilteredOptions: OPTIONS_TYPE,
    children: PropTypes.func.isRequired,
};

SelectFilterPopover.displayName = 'SelectFilter';

export default SelectFilterPopover;
