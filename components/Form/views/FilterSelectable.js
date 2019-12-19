/**
 * This will create a filter component that takes in selected values as well
 * and removes those from the final filter result as well
 */
import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers, setPropTypes } from 'recompose';
import Filter from 'components/Filter';
import { OPTIONS_TYPE } from '../types';

const enhance = compose(
    setPropTypes({
        unfilteredOptions: OPTIONS_TYPE,
        selectedValues: PropTypes.array.isRequired,
    }),
    withHandlers({
        unfilteredOptionsWithoutSelectedValues: ({
            unfilteredOptions,
            selectedValues,
            selectedKey,
        }) => () =>
            unfilteredOptions.filter(
                option => !selectedValues.includes(option[selectedKey])
            ),
    })
);

const FilterSelectable = ({
    filterKeys,
    unfilteredOptionsWithoutSelectedValues,
    children,
    selectedKey,
}) => (
    <Filter
        filterKeys={filterKeys}
        data={unfilteredOptionsWithoutSelectedValues()}
        selectedKey={selectedKey}
    >
        {({ handleFilter, filteredData }) =>
            children({ handleFilter, filteredData })
        }
    </Filter>
);

FilterSelectable.defaultProps = {
    selectedKey: 'value',
    filterKeys: ['label'],
};

FilterSelectable.propTypes = {
    unfilteredOptionsWithoutSelectedValues: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,
    filterKeys: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),
    selectedKey: PropTypes.string,
};

FilterSelectable.displayName = 'FilterSelectable';

export default enhance(FilterSelectable);
