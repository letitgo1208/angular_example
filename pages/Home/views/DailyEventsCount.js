/**
 * Render prop that gets us the count of all events by day based on the selected calendars
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
    compose,
    lifecycle,
    withState,
    withHandlers,
    setPropTypes,
} from 'recompose';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { CALENDARS_PROP_TYPES } from '../types';

export const eventsCountTypes = {
    calendars: CALENDARS_PROP_TYPES,
    calendarsSelected: PropTypes.object.isRequired,
};

const enhance = compose(
    setPropTypes(eventsCountTypes),
    withHandlers({
        isCalendarSelected: ({ calendarsSelected }) => calendarId =>
            isEmpty(calendarsSelected) || calendarsSelected[calendarId],
    }),
    withHandlers({
        /**
         * Get the aggregate count of events of all the selected calendars for each date
         * @returns {Array}
         */
        getAggregateCounts: ({ calendars, isCalendarSelected }) => () => {
            const aggregateCount = {};
            calendars.forEach(calendar => {
                if (!isCalendarSelected(calendar.id)) return;

                const eventCounts = JSON.parse(calendar.eventCount);
                Object.keys(eventCounts).forEach(date => {
                    const existingDate = aggregateCount[date];
                    if (typeof existingDate === 'undefined') {
                        aggregateCount[date] = eventCounts[date];
                    } else {
                        aggregateCount[date] =
                            eventCounts[date] + aggregateCount[date];
                    }
                });
            });
            return aggregateCount;
        },
    }),
    withState(
        'dailyEventsCount',
        'setDailyEventsCount',
        ({ getAggregateCounts }) => getAggregateCounts()
    ),
    lifecycle({
        componentDidUpdate(prevProps) {
            if (
                !isEqual(prevProps.calendars, this.props.calendars) ||
                !isEqual(
                    prevProps.calendarsSelected,
                    this.props.calendarsSelected
                )
            ) {
                this.props.setDailyEventsCount(this.props.getAggregateCounts());
            }
        },
    })
);

const DailyEventsCount = ({ children, dailyEventsCount }) => (
    <Fragment>{children({ dailyEventsCount })}</Fragment>
);

DailyEventsCount.propTypes = {
    children: PropTypes.func.isRequired,
    dailyEventsCount: PropTypes.object.isRequired,
};

export default enhance(DailyEventsCount);
