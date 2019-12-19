import React from 'react';
import styled from 'styled-components';
import { prop } from 'styled-tools';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

import { shouldUpdate } from 'recompose';

import CalendarPickerItem from './CalendarPickerItem';

const CalendarPickerWrapper = styled.div`
    margin-right: ${prop('theme.sp.lg')};
`;

const enhance = shouldUpdate(
    (props, nextProps) =>
        !isEqual(props.calendars, nextProps.calendars) ||
        !isEqual(props.calendarsSelected, nextProps.calendarsSelected)
);

const CalendarPicker = ({ calendars, onCalendarSelect, calendarsSelected }) => (
    <CalendarPickerWrapper>
        {calendars.map(calendar => (
            <CalendarPickerItem
                calendars={calendars}
                calendar={calendar}
                key={calendar.id}
                onCalendarSelect={onCalendarSelect}
                calendarsSelected={calendarsSelected}
            />
        ))}
    </CalendarPickerWrapper>
);

CalendarPicker.propTypes = {
    calendars: PropTypes.array.isRequired,
    onCalendarSelect: PropTypes.func.isRequired,
    calendarsSelected: PropTypes.object.isRequired,
};

CalendarPicker.defaultProps = {
    calendars: [],
};

export default enhance(CalendarPicker);
