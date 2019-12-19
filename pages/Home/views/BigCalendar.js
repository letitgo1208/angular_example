import React from 'react';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { compose } from 'recompose';
import {
    format,
    subMinutes,
    isSameDay,
    setHours,
    setMinutes,
    isAfter,
} from 'dateFns';
import moment from 'moment';
import ReactBigCalendar from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import BigCalendarWrapper from './BigCalendarWrapper';
import CalendarToolbar from './BigCalendarToolbar';
import {
    BigCalendarWeekHeader,
    BigCalendarDayHeader,
} from './BigCalendarDayWeekHeader';
import EventMonth from './EventMonth';
import EventDayWeek from './EventDayWeek';
import { eventsCountTypes } from './DailyEventsCount';
import { EVENTS_PROP_TYPES, CALENDAR_VIEWS } from '../types';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
ReactBigCalendar.momentLocalizer(moment); // or globalizeLocalizer

export const calendarViewTypes = ['month', 'week', 'day'];

const enhance = compose(
    withTheme
    // shouldUpdate(
    //     (props, nextProps) =>
    //         !isEqual(props.events, nextProps.events) ||
    //         props.selectedDate.getTime() !== nextProps.selectedDate.getTime() ||
    //         props.theme !== nextProps.theme ||
    //         props.calendarsSelected !== nextProps.calendarsSelected ||
    //         props.calendarView !== nextProps.calendarView
    // )
);

const DragAndDropCalendar = withDragAndDrop(ReactBigCalendar);

// The time that we're scrolling to when going to month/week view. Will
// scroll to make the first event in view on selected date only if it's
// before 9am or scroll to 9am
export const scrollToTime = ({ firstEventTimesByDate, selectedDate }) => {
    // This is the total minutes that we're going to pad our scroll by.
    // I think it's better to give a little padding before the event so
    // It's not so crowded by our scroll. So if our earliest event was 7 am
    // and our firstEventPadding was 60 then it would scroll to 6 am.
    const firstEventPaddingMinutes = 60;

    // firstEventTimesByDate has the date in this format as the key
    const formattedSelectedDate = format(selectedDate, 'YYYY-MM-DD');
    const firstEventSelectedDate = get(
        firstEventTimesByDate,
        formattedSelectedDate,
        false
    );

    // Default to 9:00am if there are no events before that time on
    // the selected date
    const defaultScrollTime = setMinutes(setHours(selectedDate, 9), 0);
    if (
        !firstEventSelectedDate ||
        isAfter(firstEventSelectedDate, defaultScrollTime)
    ) {
        return defaultScrollTime;
    }

    const paddedTime = subMinutes(
        firstEventSelectedDate,
        firstEventPaddingMinutes
    );

    // If the padded time made the scroll go to the day before - we can't
    // do that so just go to midnight
    if (!isSameDay(paddedTime, firstEventSelectedDate)) {
        return setMinutes(setHours(firstEventSelectedDate, 0), 0);
    }

    return paddedTime;
};

const BigCalendar = ({
    events,
    selectedDate,
    onEventSelect,
    onSelectedDateChange,
    theme,
    toggleEventSidebar,
    calendars,
    calendarsSelected,
    calendarView,
    handleChangeCalendarView,
}) => {
    const toSimpleDate = date => format(date, 'YYYY-MM-DD');

    return (
        <BigCalendarWrapper
            calendars={calendars}
            calendarView={calendarView}
            calendarsSelected={calendarsSelected}
            events={events}
            selectedDate={selectedDate}
        >
            {({
                monthEvents,
                firstEventTimesByDate,
                updateEvent,
                moveEvent,
                resizeEvent,
                dailyEventsCount,
                styleToday,
                styleEvents,
            }) => (
                <DragAndDropCalendar
                    selectable
                    resizable
                    onEventResize={resizeEvent}
                    onEventDrop={moveEvent}
                    view={calendarView}
                    onView={handleChangeCalendarView}
                    date={selectedDate}
                    events={monthEvents}
                    dayPropGetter={date => {
                        styleToday({
                            date,
                            selectedDate,
                            theme,
                        });
                    }}
                    scrollToTime={scrollToTime({
                        firstEventTimesByDate,
                        selectedDate,
                    })}
                    onNavigate={onSelectedDateChange}
                    onSelectEvent={onEventSelect}
                    updateEvent={updateEvent}
                    eventPropGetter={event =>
                        styleEvents({ event, calendarView, theme })
                    }
                    components={{
                        toolbar: CalendarToolbar,
                        month: {
                            event: EventMonth,
                        },
                        week: {
                            event: EventDayWeek,
                            // eslint-disable-next-line react/prop-types
                            header: ({ date }) => (
                                <BigCalendarWeekHeader
                                    date={date}
                                    totalEvents={get(
                                        dailyEventsCount,
                                        toSimpleDate(date),
                                        0
                                    )}
                                />
                            ),
                        },
                        day: {
                            event: EventDayWeek,
                            // eslint-disable-next-line react/prop-types
                            header: ({ date }) => (
                                <BigCalendarDayHeader
                                    date={date}
                                    totalEvents={get(
                                        dailyEventsCount,
                                        toSimpleDate(date),
                                        0
                                    )}
                                />
                            ),
                        },
                    }}
                    views={['month', 'day', 'week']}
                    formats={{
                        weekdayFormat: (date, culture, localizer) =>
                            localizer.format(date, 'dddd', culture),
                        dateFormat: (date, culture, localizer) =>
                            localizer.format(date, 'D', culture),
                        timeGutterFormat: (date, culture, localizer) =>
                            localizer.format(date, 'ha', culture),
                    }}
                    messages={{
                        showMore: total => `${total} more`,
                    }}
                    popup
                    onSelectSlot={slotInfo =>
                        toggleEventSidebar({
                            selectedDate: slotInfo.start,
                        })
                    }
                />
            )}
        </BigCalendarWrapper>
    );
};

BigCalendar.defaultProps = {
    calendarView: 'month',
};

BigCalendar.propTypes = {
    events: EVENTS_PROP_TYPES.isRequired,
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    onEventSelect: PropTypes.func.isRequired,
    onSelectedDateChange: PropTypes.func.isRequired,
    toggleEventSidebar: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    calendarView: CALENDAR_VIEWS,
    handleChangeCalendarView: PropTypes.func.isRequired,
    ...eventsCountTypes,
};

export default enhance(BigCalendar);
