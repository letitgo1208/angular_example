import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { withState } from 'recompose';
import get from 'lodash/get';
import {
    startOfMonth,
    endOfMonth,
    subMonths,
    addMonths,
    isAfter,
    isBefore,
    toISO,
} from 'dateFns';

import { EVENTS_QUERY, eventsToDates } from '../queries';

const monthPadding = 3;

export const eventQueryPaginationStartEnd = date => ({
    viewerCalendarStart: toISO(subMonths(startOfMonth(date), monthPadding)),
    viewerCalendarEnd: toISO(addMonths(startOfMonth(date), monthPadding)),
});

const enhance = withState(
    'initialStartEnd',
    'setInitialStartEnd',
    ({ selectedDate }) => eventQueryPaginationStartEnd(selectedDate)
);

const EventsQuery = ({
    initialStartEnd,
    paginationStartEnd,
    changePaginationStartEnd,
    children,
}) => {
    if (!initialStartEnd) return false;
    const startDate = new Date(paginationStartEnd.viewerCalendarStart);
    const endDate = new Date(paginationStartEnd.viewerCalendarEnd);

    /**
     * If the selected date is less than the padding away from the current end date - paginate
     */
    const changeStartVariable = date => {
        let variables = false;
        if (
            isBefore(date, addMonths(startDate, monthPadding)) &&
            isAfter(date, startDate)
        ) {
            variables = {
                viewerCalendarStart: toISO(subMonths(startDate, monthPadding)),
                viewerCalendarEnd: toISO(startDate),
            };
        }
        if (variables) {
            changePaginationStartEnd({
                viewerCalendarStart: variables.viewerCalendarStart,
                viewerCalendarEnd: toISO(endDate),
            });
        }
        return variables;
    };

    /**
     * If the selected date is less than the padding away from the current end date - paginate
     */
    const changeEndVariable = date => {
        let variables = false;
        if (
            isAfter(date, subMonths(endDate, monthPadding)) &&
            isBefore(date, endDate)
        ) {
            variables = {
                viewerCalendarStart: toISO(endDate),
                viewerCalendarEnd: toISO(addMonths(endDate, monthPadding)),
            };
        }
        if (variables) {
            changePaginationStartEnd({
                viewerCalendarStart: toISO(startDate),
                viewerCalendarEnd: variables.viewerCalendarEnd,
            });
        }
        return variables;
    };

    // If the selected date IS NOT within the start and end date then pull just
    // that month first in one fetchMore (so we can get that month showing quickly) then do
    // ANOTHER fetchMore with ahead and behind 4 months (only if +-4 months doesn't overlap the current events fetched.
    // If they do overlap, redo what we're going to fetch so we don't fetch too much
    const outsidePagination = date => {
        let variablesInitial = false;
        let variablesComplete = false;
        if (isBefore(date, startDate) || isAfter(date, endDate)) {
            variablesInitial = {
                viewerCalendarStart: toISO(startOfMonth(date)),
                viewerCalendarEnd: toISO(endOfMonth(date)),
            };

            // Fetch more from months in the padding
            const newEnd = addMonths(startOfMonth(date), monthPadding);
            const newStart = subMonths(startOfMonth(date), monthPadding);
            variablesComplete = {
                viewerCalendarStart: toISO(newStart),
                viewerCalendarEnd: toISO(newEnd),
            };
            // In this case we're going to reset the padding to be like this is the intial date
            // then when we move back and forth the original moving a month or two functions
            // will fire like normal. If we move to another random date this will fire again
            // so it should make us all set - Does fetchmore fetch stuff that we already have in apollo cache?
            // I hope not, but regardless this is the easiest way to handle this
            changePaginationStartEnd(variablesComplete);
        }

        return { initial: variablesInitial, complete: variablesComplete };
    };

    const runFetchMore = (fetchMore, variables) => {
        if (!variables) return false;
        fetchMore({
            variables,
            // eslint-disable-next-line arrow-body-style
            updateQuery: (previousResult, { fetchMoreResult }) => {
                const newCalendars = previousResult.viewer.calendars.map(
                    (calendar, calendarKey) => {
                        const oldEventCount = JSON.parse(calendar.eventCount);
                        const moreEventCount = JSON.parse(
                            fetchMoreResult.viewer.calendars[calendarKey]
                                .eventCount
                        );
                        const newEventCount = JSON.stringify(
                            Object.assign(oldEventCount, moreEventCount)
                        );
                        return {
                            ...calendar,
                            eventCount: newEventCount,
                        };
                    }
                );

                return {
                    viewer: {
                        calendars: newCalendars,
                        events: [
                            ...previousResult.viewer.events,
                            ...fetchMoreResult.viewer.events,
                        ],
                        __typename: 'User',
                    },
                };
            },
        });
        return true;
    };

    return (
        <Query query={EVENTS_QUERY} variables={initialStartEnd}>
            {({ loading, error, data, fetchMore }) => {
                const calendars = get(data, 'viewer.calendars', []);
                const rawEvents = get(data, 'viewer.events', []);
                const events = eventsToDates(rawEvents);

                const customFetchMore = cursorDate => {
                    const date = new Date(cursorDate);

                    // adjust start
                    let variables = changeStartVariable(date);
                    if (!variables) {
                        // adjust end
                        variables = changeEndVariable(date);
                    }
                    let variablesComplete = false;
                    if (!variables) {
                        // adjust outside start and end
                        const variablesBothRequests = outsidePagination(date);
                        variables = variablesBothRequests.initial;
                        variablesComplete = variablesBothRequests.complete;
                    }

                    runFetchMore(fetchMore, variables);

                    // If the selected date was outside the start and end date the above function
                    // will fetchMore from just the month of the selected date (to keep it speedy)
                    // this second request will get the events with our padding - this won't run if
                    // we don't have a truthy variablesComplete variable
                    runFetchMore(fetchMore, variablesComplete);

                    return true;
                };

                return children({
                    loading,
                    error,
                    calendars,
                    events,
                    fetchMore: customFetchMore,
                });
            }}
        </Query>
    );
};

EventsQuery.propTypes = {
    initialStartEnd: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
        .isRequired,
    children: PropTypes.func.isRequired,
    paginationStartEnd: PropTypes.shape({
        viewerCalendarStart: PropTypes.string,
        viewerCalendarEnd: PropTypes.string,
    }).isRequired,
    changePaginationStartEnd: PropTypes.func.isRequired,
};
EventsQuery.displayName = 'EventQuery';

export default enhance(EventsQuery);
