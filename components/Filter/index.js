/**
 * This is a wrapper around the fuse.js library - for more docs about props go to:
 * http://fusejs.io/
 */

import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import { compose, withState, lifecycle } from 'recompose';
import Fuse from 'fuse.js';

const enhance = compose(
    withState('filteredData', 'setFilteredData', ({ data }) => data),
    lifecycle({
        componentDidUpdate(prevProps) {
            if (
                !isEqual(prevProps.data, this.props.data) &&
                isEqual(prevProps.filteredData, this.props.filteredData)
            ) {
                const filteredDataWithoutSelected = this.props.filteredData.filter(
                    filteredItem =>
                        this.props.data.some(
                            unselectedItem =>
                                unselectedItem[this.props.selectedKey] ===
                                filteredItem[this.props.selectedKey]
                        )
                );
                this.props.setFilteredData(filteredDataWithoutSelected);
            }
        },
    })
);

const Filter = props => {
    const fuseOptions = omit(props, [
        'data',
        'children',
        'setFilteredData',
        'filteredData',
        'excludedKeys',
    ]);

    fuseOptions.keys = props.filterKeys;
    fuseOptions.id = props.resultKey;
    // We can't sort if we're excluding keys, because if we do the excluded keys
    // from the filter won't be added back to the object where they are supposed
    // to go
    if (!isEmpty(props.excludedKeys)) {
        fuseOptions.shouldSort = false;
    }

    /**
     * If a key was excluded, then we aren't searching by it and will be excluded
     * from the filter - this function will add it back to the filter results
     * in the correct place - One use case of this is like an opt group or heading
     * TODO: This really needs a test
     *
     * @param filteredData
     * @returns {*}
     */
    const addBackExcludedKey = filteredData => {
        const { excludedKeys, data } = props;
        if (isEmpty(excludedKeys)) return filteredData;

        const unfilteredData = [...data];
        const dataWithExcludedKey = [...filteredData];

        const addedKeys = [];
        filteredData.forEach((filteredValue, filteredIndex) => {
            // Loop through unfiltered data
            data.forEach((unfilteredValue, unfilteredIndex) => {
                // Find the filtered value in the unfiltered data array
                if (isEqual(unfilteredValue, filteredValue)) {
                    let checkIndex = unfilteredIndex;
                    // Go backwards through the unfiltered data until we find
                    // the excluded key
                    excludedKeys.forEach(excludedKey => {
                        let foundKey = false;
                        // If we've checked backwards everything or found the
                        // key then we'll stop
                        while (checkIndex > -1 && !foundKey) {
                            if (
                                get(
                                    unfilteredData[checkIndex],
                                    excludedKey,
                                    false
                                )
                            ) {
                                foundKey = true;
                                // Only add the key once
                                if (
                                    !addedKeys.includes(
                                        get(
                                            unfilteredData[checkIndex],
                                            excludedKey,
                                            false
                                        )
                                    )
                                ) {
                                    let spliceAtIndex = filteredIndex + 1;
                                    if (filteredIndex < 1) {
                                        spliceAtIndex = 0;
                                    }
                                    // Add the excluded key back here
                                    dataWithExcludedKey.splice(
                                        spliceAtIndex,
                                        0,
                                        unfilteredData[checkIndex]
                                    );
                                    // We've used this key already no need
                                    // to use it next time we find it
                                    addedKeys.push(
                                        unfilteredData[checkIndex][excludedKey]
                                    );
                                }
                            }
                            checkIndex -= 1;
                        }
                        return true;
                    });
                }
            });
        });
        return dataWithExcludedKey;
    };

    const handleFilter = query => {
        const fuse = new Fuse(props.data, fuseOptions);
        if (query === '') {
            if (props.resultKey) {
                props.setFilteredData(
                    props.data.map(item => item[props.resultKey].toString())
                );
            } else {
                props.setFilteredData(props.data);
            }
        } else {
            const filteredData = fuse.search(query);
            props.setFilteredData(addBackExcludedKey(filteredData));
        }
    };

    return props.children({
        handleFilter,
        filteredData: props.filteredData,
    });
};

Filter.defaultProps = {
    shouldSort: true,
    threshold: 0.5,
    location: 0,
    distance: 20,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    caseSensitive: false,
    includeScore: false,
    includeMatches: false,
    tokenize: false,
    matchAllTokens: false,
    findAllMatches: false,
    excludedKeys: [],
    selectedKey: 'value',
};

Filter.propTypes = {
    shouldSort: PropTypes.bool,
    threshold: PropTypes.number,
    location: PropTypes.number,
    distance: PropTypes.number,
    maxPatternLength: PropTypes.number,
    minMatchCharLength: PropTypes.number,
    caseSensitive: PropTypes.bool,
    includeScore: PropTypes.bool,
    includeMatches: PropTypes.bool,
    tokenize: PropTypes.bool,
    matchAllTokens: PropTypes.bool,
    findAllMatches: PropTypes.bool,
    filterKeys: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ).isRequired,
    data: PropTypes.array.isRequired,
    children: PropTypes.func.isRequired,
    resultKey: PropTypes.string,
    excludedKeys: PropTypes.array,
    selectedKey: PropTypes.string,
};
Filter.displayName = 'Filter';

export default enhance(Filter);
