import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import { format } from 'dateFns';
import { HorizontalGroup } from 'components/MarginGroup';
import { Select, DatePicker, TimePicker } from 'components/Form';

import EventCustomOccurrence from './EventCustomOccurrence';

import {
    EventSidebarRow,
    PickerAt,
    PickerTo,
    Icon,
    ButtonStyled,
    ColorStyled,
} from './EventSidebarStyles';

import EventName from './EventName';
import EventAssociations from './EventAssociations';
import EventFormWrapper, { EVENT_EFFECTS } from './EventFormWrapper';

// const TIME_FORMAT = 'HH:mm';
const DATE_FORMAT = 'MMM D, YYYY';
const CALENDAR_STATES = ['BUSY', 'AVAILABLE'];

/*
    This is for the dropdown
    Key => represents the value of the dropdown
    Format => is what is displayed on the dropdown (what is visually on the screen)
      - so that we can format it to display whatr exactly we need. This allows us to change formats without
      - touching the component, as well as adding more flexibility
*/
const CALENDAR_OCCURRENCE = [
    { key: 'NO_REPEAT', format: () => 'No Repeat' },
    { key: 'DAILY', format: () => 'Daily' },
    { key: 'WEEKLY', format: time => `Weekly on ${format(time, 'dddd')}` },
    {
        key: 'MONTHLY',
        format: time => `Monthly on the first ${format(time, 'dddd')}`,
    },
    { key: 'ANUALLY', format: time => `Anually on ${format(time, 'MMMM Do')}` },
    { key: 'WEEKDAY', format: () => 'Every Weekday (Monday to Friday)' },
    {
        key: 'CUSTOM',
        format: () => 'Custom',
    },
];

const dateTimePickerInputProps = {
    variant: 'eventSidebarPicker',
    autoSize: true,
};

const EventSidebar = ({
    calendars,
    selectedEvent,
    toggleEventSidebar,
    isSidebarTransitionFinished,
    selectedDate,
    flows,
    forms,
}) => (
    <EventFormWrapper
        selectedDate={selectedDate}
        eventId={selectedEvent.id || false}
        toggleEventSidebar={toggleEventSidebar}
        calendars={calendars}
        isSidebarTransitionFinished={isSidebarTransitionFinished}
    >
        {({
            values,
            setFieldValue,
            handleChange,
            isSubmitting,
            setStartEnd,
        }) => (
            <Form>
                <EventName
                    name="eventName"
                    value={values.eventName}
                    handleChange={handleChange}
                    isSidebarTransitionFinished={isSidebarTransitionFinished}
                />

                {/* CALENDAR DROPDOWN */}
                <EventSidebarRow>
                    <Icon type="calendar" date={values.eventStartDateTime} />
                    <Select
                        fluid
                        variant="inverse"
                        value={values.eventCalendar}
                        setSelectedValue={value =>
                            setFieldValue('eventCalendar', value)
                        }
                        options={calendars.map(calendar => ({
                            label: (
                                <HorizontalGroup size="xs">
                                    <span>{calendar.name}</span>
                                    <ColorStyled
                                        color={calendar.color}
                                        size={1}
                                    />
                                </HorizontalGroup>
                            ),
                            value: calendar.id,
                        }))}
                    />
                </EventSidebarRow>

                {/* DATE AND TIME PICKERS */}
                <EventSidebarRow variant="date-picker">
                    <Icon type="clock" date={values.eventStartDateTime} />
                    <DatePicker
                        inputProps={dateTimePickerInputProps}
                        popoverProps={{
                            placement: 'bottom-start',
                        }}
                        dateFormat={DATE_FORMAT}
                        date={values.eventStartDateTime}
                        handleDateChange={startDateTime => {
                            setStartEnd({
                                field: 'eventStartDateTime',
                                value: startDateTime,
                                subField: 'date',
                            });
                        }}
                    />
                    <PickerAt>at</PickerAt>
                    <TimePicker
                        inputProps={dateTimePickerInputProps}
                        popoverProps={{
                            placement: 'bottom-start',
                        }}
                        dateTime={values.eventStartDateTime}
                        handleTimeChange={startDateTime => {
                            setStartEnd({
                                field: 'eventStartDateTime',
                                value: startDateTime,
                                subField: 'time',
                            });
                        }}
                    />
                    <PickerTo>to</PickerTo>
                    <DatePicker
                        inputProps={dateTimePickerInputProps}
                        popoverProps={{
                            placement: 'bottom-end',
                        }}
                        dateFormat={DATE_FORMAT}
                        date={values.eventEndDateTime}
                        handleDateChange={endDateTime =>
                            setStartEnd({
                                field: 'eventEndDateTime',
                                value: endDateTime,
                                subField: 'date',
                            })
                        }
                    />
                    <PickerAt>at</PickerAt>
                    <TimePicker
                        inputProps={dateTimePickerInputProps}
                        popoverProps={{
                            placement: 'bottom-end',
                        }}
                        dateTime={values.eventEndDateTime}
                        handleTimeChange={endDateTime => {
                            setStartEnd({
                                field: 'eventEndDateTime',
                                value: endDateTime,
                                subField: 'time',
                                test: 'time',
                            });
                        }}
                    />
                </EventSidebarRow>

                {/* RECURRENCE */}
                <EventSidebarRow>
                    <Icon type="repeat" />
                    <Select
                        fluid
                        variant="inverse"
                        value={values.eventOccurrence}
                        setSelectedValue={value =>
                            setFieldValue('eventOccurrence', value)
                        }
                        options={CALENDAR_OCCURRENCE.map(occurrence => ({
                            label: occurrence.format(
                                values.eventStartDateTime || new Date()
                            ),
                            value: occurrence.key,
                        }))}
                    />
                </EventSidebarRow>

                {values.eventOccurrence === 'CUSTOM' && (
                    <EventCustomOccurrence
                        occurrence={values.occurrence}
                        setFieldValue={setFieldValue}
                    />
                )}

                {/* STATE DROPDOWN */}
                <EventSidebarRow>
                    <Icon type="busy" />
                    <Select
                        fluid
                        variant="inverse"
                        value={values.eventState}
                        setSelectedValue={eventState =>
                            setFieldValue('eventState', eventState)
                        }
                        options={CALENDAR_STATES.map(eventState => ({
                            label: eventState,
                            value: eventState,
                        }))}
                    />
                </EventSidebarRow>

                {/* People, Flows, and Forms */}
                <EventAssociations
                    values={values}
                    setFieldValue={setFieldValue}
                    flows={flows}
                    forms={forms}
                />

                {/* Effects */}
                {values.isSingle && (
                    <EventSidebarRow>
                        <Select
                            fluid
                            variant="inverse"
                            value={values.effects}
                            setSelectedValue={value =>
                                setFieldValue('effects', value)
                            }
                            options={EVENT_EFFECTS.map(effects => ({
                                label: effects,
                                value: effects,
                            }))}
                        />
                    </EventSidebarRow>
                )}

                {/* SAVE BUTTON */}
                <EventSidebarRow>
                    <ButtonStyled
                        htmlType="submit"
                        loading={isSubmitting}
                        size="large"
                    >
                        Save
                    </ButtonStyled>
                </EventSidebarRow>
            </Form>
        )}
    </EventFormWrapper>
);

EventSidebar.defaultProps = {
    selectedEvent: {},
    isSidebarTransitionFinished: false,
};

EventSidebar.propTypes = {
    calendars: PropTypes.array.isRequired,
    selectedEvent: PropTypes.object,
    toggleEventSidebar: PropTypes.func.isRequired,
    isSidebarTransitionFinished: PropTypes.bool,
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    flows: PropTypes.array.isRequired,
    forms: PropTypes.array.isRequired,
};

export default EventSidebar;
