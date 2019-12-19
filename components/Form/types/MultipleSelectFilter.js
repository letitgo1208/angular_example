import React from 'react';
import PropTypes from 'prop-types';
import Popover from 'components/Popover';
import FilterSelectable from '../views/FilterSelectable';
import FilterInput from '../views/FilterInput';
import { OPTIONS_TYPE } from '../types';

const MultipleSelectFilter = props => (
    <FilterSelectable
        filterKeys={props.filterKeys}
        unfilteredOptions={props.unfilteredOptions}
        selectedValues={props.selectedValues}
        selectedKey={props.selectedKey}
    >
        {({ handleFilter, filteredData }) => (
            <Popover
                {...props.popoverProps}
                closeButton
                closeOnClick={false}
                overlay={({ id }) =>
                    props.overlay({
                        filteredOptions: filteredData,
                        handleItemClick: option => {
                            props.setSelectedValues(option);
                            // After we add an item the input should still be focused
                            document.getElementById(id).children[0].focus();
                        },
                    })
                }
            >
                {({ setIsOpen }) => (
                    <FilterInput
                        handleFilter={handleFilter}
                        inputProps={{
                            ...props.inputProps,
                            onClick: () => {
                                if (
                                    typeof props.inputProps.onClick !==
                                    'undefined'
                                ) {
                                    props.inputProps.onClick();
                                }
                                setIsOpen(true);
                            },
                        }}
                        iconProps={props.iconProps}
                    />
                )}
            </Popover>
        )}
    </FilterSelectable>
);

MultipleSelectFilter.defaultProps = {
    popoverProps: {},
    iconProps: {},
    inputProps: {},
    filterKeys: ['label'],
    selectedKey: undefined,
};

MultipleSelectFilter.propTypes = {
    overlay: PropTypes.func.isRequired,
    popoverProps: PropTypes.object,
    iconProps: PropTypes.object,
    inputProps: PropTypes.object,
    // eslint-disable-next-line react/no-unused-prop-types, react/require-default-props
    unfilteredOptions: OPTIONS_TYPE,
    setSelectedValues: PropTypes.func.isRequired,
    selectedValues: PropTypes.array.isRequired,
    filterKeys: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),
    // The key that will be used to identify the selection - by default it will
    // be "value", but you can use "id" for data coming from the database
    // for instance
    selectedKey: PropTypes.string,
};

MultipleSelectFilter.displayName = 'MultipleSelectFilter';

export default MultipleSelectFilter;
