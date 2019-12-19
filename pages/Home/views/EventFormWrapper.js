import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { Formik } from 'formik';
import log from 'utils/logger';
import { addHours, setTime } from 'dateFns';
import { shouldUpdate } from 'recompose';

import { eventSchema, syncStartEnd } from '../validators';
import { Close } from './EventSidebarStyles';
import EventDetailQuery from './EventDetailQuery';
import EventDetailMutation from './EventDetailMutation';

export const EVENT_EFFECTS = ['SINGLE', 'FUTURE'];

const makeInitialOccurrence = occurrence => {
    if (typeof occurrence === 'undefined' || occurrence === null) return {};
    const {
        eventInterval = 1,
        eventIntervalTimeFrame = 'DAYS',
        eventRepeatOn = [],
        eventEnds = 'NEVER',
        eventOn = new Date(),
        eventAfter = 1,
    } = occurrence;

    return {
        eventInterval,
        eventIntervalTimeFrame,
        eventRepeatOn: eventRepeatOn.reduce((prev, curr) => {
            const next = prev;
            next[curr] = true;
            return next;
        }, {}),
        eventEnds,
        eventOn,
        eventAfter,
    };
};

const makeInitialData = ({ selectedDate, event, calendars }) => {
    const selectedDateTime = setTime(selectedDate, new Date());

    const eventCalendarId = calendars.find(
        ({ id }) => id === get(event, 'eventCalendar')
    );

    const eventStartDateTime = get(event, 'eventStartDateTime')
        ? new Date(get(event, 'eventStartDateTime'))
        : selectedDateTime;

    const eventEndDateTime = get(event, 'eventEndDateTime')
        ? new Date(get(event, 'eventEndDateTime'))
        : addHours(selectedDateTime, 1);

    return {
        id: event.id || undefined,
        eventName: event.eventName || '',
        eventCalendar: eventCalendarId || get(calendars, '0.id', ''),
        eventStartDateTime,
        eventEndDateTime,
        eventOccurrence: event.eventOccurrence || 'NO_REPEAT',
        occurrence: makeInitialOccurrence(event.occurrence),
        eventState: event.eventState || 'BUSY',
        effects: EVENT_EFFECTS[0],
        isSingle: isEmpty(event.occurrence),
        people: [],
        forms: [],
        flows: [],
    };
};

const enhance = shouldUpdate(
    (props, nextProps) =>
        props.isSidebarTransitionFinished !==
        nextProps.isSidebarTransitionFinished
);

const EventFormWrapper = ({
    selectedDate,
    eventId,
    calendars,
    toggleEventSidebar,
    children,
}) => (
    <EventDetailQuery id={eventId}>
        {({ event }) => (
            <Fragment>
                <Close
                    type="close"
                    hover
                    width={1.6}
                    height={1.6}
                    onClick={() => toggleEventSidebar()}
                />
                <EventDetailMutation id={eventId}>
                    {saveEvent => (
                        <Formik
                            initialValues={makeInitialData({
                                event,
                                selectedDate,
                                calendars,
                            })}
                            onSubmit={values => {
                                saveEvent(values).then(result => {
                                    const errors = get(
                                        result,
                                        'errors.0.message',
                                        false
                                    );
                                    if (errors) {
                                        log.error(
                                            'The event could not be saved',
                                            errors
                                        );
                                    }
                                });
                                toggleEventSidebar();
                            }}
                            validate={async values => {
                                let errors = {};
                                try {
                                    await eventSchema.validate(values);
                                } catch (validationErrors) {
                                    errors = {}; // validationErrors;
                                }
                                return errors;
                            }}
                            component={({
                                values,
                                setFieldValue,
                                setValues,
                                handleChange,
                                isSubmitting,
                            }) => {
                                const setStartEnd = ({
                                    field,
                                    value,
                                    subField,
                                }) => {
                                    const newStartEnd = syncStartEnd({
                                        field,
                                        value,
                                        subField,
                                        values,
                                    });
                                    setValues({ ...values, ...newStartEnd });
                                };

                                return children({
                                    values,
                                    setFieldValue,
                                    setValues,
                                    handleChange,
                                    isSubmitting,
                                    setStartEnd,
                                });
                            }}
                        />
                    )}
                </EventDetailMutation>
            </Fragment>
        )}
    </EventDetailQuery>
);

EventFormWrapper.defaultProps = {
    eventId: false,
};

EventFormWrapper.propTypes = {
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    eventId: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    toggleEventSidebar: PropTypes.func.isRequired,
    calendars: PropTypes.array.isRequired,
    children: PropTypes.func.isRequired,
};

export default enhance(EventFormWrapper);
