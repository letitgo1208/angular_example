import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import get from 'lodash/get';
import pickBy from 'lodash/pickBy';
import isEmpty from 'lodash/isEmpty';
import { getOptimisticId } from 'utils/functions';
import { getUtcIso, toISO } from 'dateFns';
import { CREATE_EVENT, UPDATE_EVENT, EVENTS_QUERY } from '../queries';

const formatOccurrenceForMutation = data => {
    let occurrence = {};
    if (!isEmpty(data)) {
        occurrence = {
            ...data,
            eventRepeatOn: Object.keys(
                pickBy(data.eventRepeatOn, truthy => truthy)
            ),
            eventOn: toISO(data.eventOn),
        };
    }
    return occurrence;
};

const formatDataForMutation = data => {
    const { id, people, effects, isSingle, ...formData } = data;

    return {
        ...formData,
        eventStartDateTime: toISO(data.eventStartDateTime),
        eventEndDateTime: toISO(data.eventEndDateTime),
        occurrence: formatOccurrenceForMutation(data.occurrence),
    };
};

const EventDetailMutation = ({ id, children }) => {
    const getOptimisticResponse = values => {
        const mutation = values.id ? 'updateEvent' : 'createEvent';
        return {
            [mutation]: {
                id: parseInt(values.id, 10) || getOptimisticId(),
                calendar_id: parseInt(values.eventCalendar, 10),
                name: values.eventName,
                state: values.eventState,
                end: getUtcIso(values.eventEndDateTime),
                start: getUtcIso(values.eventStartDateTime),
                __typename: 'Event',
            },
        };
    };

    const getVariables = values =>
        id
            ? {
                  id,
                  effects: values.effects,
                  input: formatDataForMutation(values),
              }
            : {
                  input: formatDataForMutation(values),
              };

    const update = (cache, { data }) => {
        if (typeof data.createEvent === 'undefined') return;
        const { variables: eventQueryVariables } = cache.watches.find(
            ({ variables: v }) => v.viewerCalendarEnd && v.viewerCalendarStart
        );

        const { viewer } = cache.readQuery({
            query: EVENTS_QUERY,
            variables: eventQueryVariables,
        });
        const { color } = viewer.calendars.find(
            calendar => calendar.id === data.createEvent.calendar_id
        );
        const newEvent = { ...data.createEvent };
        newEvent.color = color;
        const newEvents = {
            viewer: {
                calendars: [...viewer.calendars],
                events: get(viewer, 'events', []).concat(newEvent),
                __typename: 'User',
            },
        };
        const writeQuery = {
            query: EVENTS_QUERY,
            variables: eventQueryVariables,
            data: newEvents,
        };
        cache.writeQuery(writeQuery);
    };

    const saveEvent = ({ saveEventData, values }) =>
        saveEventData({
            variables: getVariables(values),
            optimisticResponse: getOptimisticResponse(values),
            update,
        });

    return (
        <Mutation mutation={id ? UPDATE_EVENT : CREATE_EVENT}>
            {saveEventData =>
                children(values => saveEvent({ saveEventData, values }))
            }
        </Mutation>
    );
};

EventDetailMutation.propTypes = {
    id: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
    children: PropTypes.func.isRequired,
};

EventDetailMutation.displayName = 'EventDetailMutation';

export default EventDetailMutation;
