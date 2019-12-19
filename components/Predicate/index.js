import React from 'react';
import PropTypes from 'prop-types';
import { compose, withState, lifecycle } from 'recompose';
import pick from 'lodash/pick';
import isEqual from 'lodash/isEqual';
import get from 'lodash/get';

import { Input, Select } from 'components/Form';
import { HorizontalGroup } from 'components/MarginGroup';

const enhance = compose(
    withState('variable', 'setVariable', ({ variables }) =>
        get(variables[0], 'value')
    ),
    withState('comparator', 'setComparator', ({ comparators }) =>
        get(comparators[0], 'value')
    ),
    withState('benchmark', 'setBenchmark', ''),
    lifecycle({
        componentDidUpdate(prevProps) {
            const compareProps = ['benchmark', 'variable', 'comparator'];
            const currentProps = pick(this.props, compareProps);

            if (!isEqual(pick(prevProps, compareProps), currentProps)) {
                this.props.onChange(currentProps);
            }
        },
    })
);

const Predicate = ({
    variable,
    setVariable,
    comparator,
    setComparator,
    benchmark,
    setBenchmark,
    variables,
    comparators,
}) => (
    <HorizontalGroup>
        <Select
            fluid
            value={variable}
            options={variables}
            setSelectedValue={setVariable}
        />
        <Select
            fluid
            value={comparator}
            options={comparators}
            setSelectedValue={setComparator}
        />
        <Input
            width="10"
            size="md"
            value={benchmark}
            onChange={e => setBenchmark(e.target.value)}
            required
        />
    </HorizontalGroup>
);

const stateProps = {
    benchmark: PropTypes.string.isRequired,
    variable: PropTypes.string.isRequired,
    comparator: PropTypes.string.isRequired,
    setBenchmark: PropTypes.func.isRequired,
    setVariable: PropTypes.func.isRequired,
    setComparator: PropTypes.func.isRequired,
};

Predicate.defaultProps = {
    variables: [],
    comparators: [],
};
Predicate.propTypes = {
    variables: PropTypes.arrayOf(PropTypes.object),
    comparators: PropTypes.arrayOf(PropTypes.object),
    onChange: PropTypes.func.isRequired,
    ...stateProps,
};

export default enhance(Predicate);
