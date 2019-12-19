import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { prop } from 'styled-tools';
import { shouldUpdate } from 'recompose';
import isEqual from 'lodash/isEqual';

import MiniCalendar from 'components/MiniCalendar';

import DailyEventsCount, { eventsCountTypes } from './DailyEventsCount';
import SmallCalendarEventHeatMap from './SmallCalendarEventHeatMap';

const SmallCalendarWrapper = styled.div`
    margin-bottom: ${({ theme }) => theme.spb * 3.5}rem;
    margin-right: ${prop('theme.sp.lg')};
    padding-bottom: ${prop('theme.sp.sm')};
    border-bottom: ${prop('theme.b')} solid ${prop('theme.cbcs[2]')};
`;

const enhance = shouldUpdate(
    (props, nextProps) =>
        props.selectedDate !== nextProps.selectedDate ||
        !isEqual(props.calendars, nextProps.calendars) ||
        !isEqual(props.calendarsSelected, nextProps.calendarsSelected) ||
        props.activeUnselectedDate !== nextProps.activeUnselectedDate
);

const SmallCalendar = ({
    selectedDate,
    onSelectedDateChange,
    calendars,
    calendarsSelected,
    fetchMore,
    changeActiveUnselectedDate,
    activeUnselectedDate,
}) => (
    <DailyEventsCount
        calendars={calendars}
        calendarsSelected={calendarsSelected}
    >
        {({ dailyEventsCount }) => (
            <SmallCalendarWrapper>
                <MiniCalendar
                    activeStartDate={activeUnselectedDate}
                    tileContent={({ date, view }) => {
                        if (view !== 'month') return false;
                        return (
                            <SmallCalendarEventHeatMap
                                date={date}
                                dailyEventsCount={dailyEventsCount}
                            />
                        );
                    }}
                    onSelectedDateChange={onSelectedDateChange}
                    selectedDate={selectedDate}
                    firstDayOfWeek={0}
                    onActiveDateChange={({ activeStartDate, view }) => {
                        changeActiveUnselectedDate(activeStartDate);
                        if (view !== 'month') return;
                        fetchMore(activeStartDate);
                    }}
                />
            </SmallCalendarWrapper>
        )}
    </DailyEventsCount>
);

SmallCalendar.defaultProps = {
    countAggregates: {},
    selectedDate: undefined,
};

SmallCalendar.propTypes = {
    selectedDate: PropTypes.instanceOf(Date),
    onSelectedDateChange: PropTypes.func.isRequired,
    countAggregates: PropTypes.object,
    fetchMore: PropTypes.func.isRequired,
    ...eventsCountTypes,
};

export default enhance(SmallCalendar);
