import gql from 'graphql-tag';

const CALENDAR = {};
CALENDAR.fragments = {
    fields: gql`
        fragment CalendarFields on Calendar {
            id
            name
            color
        }
    `,
};

const EVENT = {};
EVENT.fragments = {
    fields: gql`
        fragment EventFields on Event {
            id
            name
            calendar_id
            start
            end
            state
        }
    `,
};

export const EVENTS_QUERY = gql`
    ${CALENDAR.fragments.fields}
    ${EVENT.fragments.fields}
    query Viewer($viewerCalendarStart: String!, $viewerCalendarEnd: String!) {
        viewer {
            calendars {
                ...CalendarFields
                eventCount(start: $viewerCalendarStart, end: $viewerCalendarEnd)
            }
            events(start: $viewerCalendarStart, end: $viewerCalendarEnd) {
                ...EventFields
                color
            }
        }
    }
`;

export const CREATE_CALENDAR = gql`
    ${CALENDAR.fragments.fields}
    mutation CreateCalendar($name: String!, $color: String!) {
        createCalendar(name: $name, color: $color) {
            ...CalendarFields
        }
    }
`;

export const UPDATE_CALENDAR = gql`
    ${CALENDAR.fragments.fields}
    mutation UpdateCalendar($id: ID!, $name: String!, $color: String!) {
        updateCalendar(id: $id, name: $name, color: $color) {
            ...CalendarFields
        }
    }
`;

export const updateCalendarOptimisticResponse = ({ id, name, color }) => ({
    variables: {
        id,
        name,
        color,
    },
    optimisticResponse: {
        updateCalendar: {
            id,
            name,
            color,
            __typename: 'Calendar',
        },
    },
});

export const createDateKey = d => `${d.getMonth()}${d.getDate()}`;

export const CREATE_EVENT = gql`
    ${EVENT.fragments.fields}
    mutation CreateEvent($input: CreateEventInput!) {
        createEvent(input: $input) {
            ...EventFields
        }
    }
`;

export const UPDATE_EVENT = gql`
    ${EVENT.fragments.fields}
    mutation UpdateEvent(
        $id: ID
        $effects: String!
        $input: CreateEventInput!
    ) {
        updateEvent(id: $id, effects: $effects, input: $input) {
            ...EventFields
        }
    }
`;

/**
 * This will turn our date strings to date objects in javascript
 * TODO: Remove this if apollo ever supports custom scalars: https://github.com/apollographql/apollo-client/issues/585
 * @param {events} events data that comes back from the query above
 */
export const eventsToDates = events => {
    if (!events) return [];
    return events.reduce((prev, curr) => {
        const newEvent = {
            ...curr,
            start: new Date(curr.start),
            end: new Date(curr.end),
        };
        return [...prev, newEvent];
    }, []);
};
