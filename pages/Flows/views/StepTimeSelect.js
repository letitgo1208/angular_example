import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Input, Select } from 'components/Form';
import { HorizontalGroup } from 'components/MarginGroup';

import { timeUnits, timeBasis } from '../utils';

const StepTimeSelect = ({
    values,
    setFieldValue,
    offsetField,
    unitField,
    basisField,
    name,
}) => (
    <HorizontalGroup>
        <Input
            width="10"
            size="md"
            type="number"
            name={name}
            value={get(values, offsetField)}
            onChange={e => setFieldValue(offsetField, e.target.value)}
            required
        />
        <Select
            fluid
            value={get(values, unitField)}
            setSelectedValue={value => setFieldValue(unitField, value)}
            options={timeUnits}
        />
        <Select
            fluid
            value={get(values, basisField)}
            setSelectedValue={value => setFieldValue(basisField, value)}
            options={timeBasis}
        />
    </HorizontalGroup>
);

StepTimeSelect.defaultProps = {
    offsetField: 'timeOffsetMinutes',
    unitField: 'timeUnit',
    basisField: 'timeBasis',
    name: '',
};
StepTimeSelect.propTypes = {
    name: PropTypes.string,
    offsetField: PropTypes.string,
    unitField: PropTypes.string,
    basisField: PropTypes.string,
    values: PropTypes.object.isRequired,
    setFieldValue: PropTypes.func.isRequired,
};

export default StepTimeSelect;
