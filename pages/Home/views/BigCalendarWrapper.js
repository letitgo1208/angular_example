import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { prop } from 'styled-tools';
import { isBefore, differenceInMonths, format } from 'dateFns';
import { lighten } from 'polished';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import { Mutation } from 'react-apollo';

import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.less';
import logger from 'utils/logger';

import ClockImage from 'images/icons/clock.svg';
import DragAndDropEvent from './DragAndDropEvent';
import { UPDATE_EVENT } from '../queries';
import DailyEventsCount, { eventsCountTypes } from './DailyEventsCount';
import { EVENTS_PROP_TYPES } from '../types';

const borderColor = ({ theme }) => theme.cbcs[3];

const BigCalendarStyles = styled.div`
    margin-top: -${prop('theme.sp.lg')};
    width: calc(100% + ${prop('theme.sp.lg')});
    height: calc(100% + ${prop('theme.sp.lg')});
    border-left: ${prop('theme.b')} solid ${borderColor};
    .rbc-calendar {
        padding-top: ${prop('theme.sp.lg')};
        .rbc-row-segment {
            flex-basis: 14.2857%;
            max-width: 14.2857%;
        }
        .rbc-allday-cell {
            display: none;
        }
        .rbc-date-cell {
            padding: ${prop('theme.xs')} ${prop('theme.sp.sm')} ${' '}
                ${prop('theme.sp.sm')} 0;
            &.rbc-now {
                // Adjust for the padding of the circle so the date stays in the same place
                display: flex;
                align-items: flex-end;
                flex-direction: column;
                text-align: center;
                a {
                    line-height: 1.2;
                    font-weight: 300;
                    color: ${prop('theme.cpc')};
                    background: ${prop('theme.cp')};
                    padding: ${prop('theme.sp.xs')};
                    border-radius: 50%;
                    display: block;
                    width: 2.5rem;
                    height: 2.5rem;
                    position: relative;
                    right: -${prop('theme.sp.xs')};
                    &:hover {
                        text-decoration: none;
                    }
                }
            }
        }
        .rbc-time-header-gutter {
            display: flex;
            align-items: center;
            border-bottom: ${prop('theme.b')} solid ${borderColor};
        }
        .rbc-time-header-gutter:after {
            content: url(${ClockImage});
            width: ${({ theme }) => theme.szb * 2}rem;
            height: ${({ theme }) => theme.szb * 2}rem;
            position: relative;
            left: 50%;
            // This needs to go up by one because of the border - so we use the border size to move it up
            top: -${prop('theme.b')};
            transform: translateX(-56%);
        }
        .rbc-time-header.rbc-overflowing {
            border-right: 0;
        }
        .rbc-header {
            font-size: ${({ theme }) => theme.fsb * 1.8}rem;
            font-weight: 500;
            padding: ${prop('theme.sp.xs')};
            text-transform: uppercase;
            border-bottom-color: ${borderColor};
            & + .rbc-header {
                border-left-color: ${borderColor};
            }
        }
        .rbc-off-range {
            color: ${borderColor};
        }
        .rbc-off-range-bg {
            background: none;
        }
        .rbc-month-view {
            line-height: 1.2;
            .rbc-event {
                border: 0;
                background: none;
                color: ${prop('theme.cbc')};
                &.rbc-selected {
                    background: none;
                }
            }
        }
        .rbc-month-view,
        .rbc-time-view {
            border-left: 0;
            border-bottom: 0;
            border-top-color: ${borderColor};
            border-right-color: ${borderColor};
            .rbc-today {
                background: ${prop('theme.cps[2]')} !important;
            }
            .rbc-day-bg + .rbc-day-bg {
                &.rbc-today {
                    background: ${prop('theme.cps[2]')} !important;
                }
                border-left-color: ${borderColor};
            }
            .rbc-month-row + .rbc-month-row {
                border-top-color: ${borderColor};
            }
            .rbc-day-slot .rbc-time-slot {
                border-top: 0;
            }
        }
        .rbc-time-view {
            .rbc-header {
                text-align: left;
                color: ${prop('theme.cbcs[5]')};
            }
            .rbc-time-gutter .rbc-timeslot-group {
                border-bottom: 0;
                .rbc-label {
                    font-size: ${({ theme }) => theme.fsb * 1.1}rem;
                    color: ${prop('theme.cbcs[7]')};
                    font-weight: 500;
                }

                .rbc-time-slot {
                    position: relative;
                    top: ${({ theme }) => theme.fsb * -1.1}rem;
                    text-align: right;
                }
            }
            .rbc-time-gutter .rbc-timeslot-group:first-child .rbc-time-slot {
                top: ${({ theme }) => theme.fsb * -0.3}rem;
            }
            .rbc-timeslot-group {
                min-height: ${({ theme }) => theme.szb * 5.5}rem;
            }
            .rbc-event {
                box-shadow: 0 -1px 0 0 rgba(255, 255, 255, 0.25),
                    inset 3px 0 0 0 rgba(0, 0, 0, 0.15);
                border-radius: ${prop('theme.br.md')};
                font-size: ${prop('theme.fs.sm')};
                border: 0 !important;
                font-weight: 500;
                padding: ${prop('theme.sp.sm')} 0 0 ${prop('theme.sp.sm')};
                .rbc-event-label {
                    display: none;
                }
            }
        }
        .rbc-current-time-indicator {
            width: 100vw !important;
            left: 3.94rem !important;
        }
        .rbc-time-content {
            border-top: 0;
            overflow-x: hidden;
        }
        .rbc-event {
            cursor: pointer;
        }
        .rbc-show-more {
            background: none;
            color: ${prop('theme.cbc')};
            text-align: center;
            font-weight: 700;
        }
    }
`;

const BigCalendarWrapper = ({
    calendars,
    calendarsSelected,
    events,
    children,
    selectedDate,
}) => {
    const styleToday = ({ date, theme }) => {
        const today = date.toDateString() === selectedDate.toDateString();
        const todayStyle = {
            style: {
                background: theme.cps[1],
            },
        };
        return today ? todayStyle : {};
    };

    const styleEvents = ({ event, calendarView, theme }) => {
        if (calendarView === 'month') return {};
        let isPast = false;
        if (isBefore(event.end, new Date())) {
            isPast = true;
        }
        const backgroundColor = isPast
            ? lighten(0.15, event.color)
            : event.color;
        const textColor = theme.cc(backgroundColor);
        return {
            style: {
                backgroundColor,
                color: textColor,
            },
        };
    };

    const monthEvents = events.filter(
        event =>
            differenceInMonths(event.start, selectedDate) < 2 &&
            (isEmpty(calendarsSelected) || calendarsSelected[event.calendar_id])
    );

    const getFirstEventTimesByDate = () =>
        monthEvents.reduce((obj, event) => {
            const dateKey = format(event.start, 'YYYY-MM-DD');
            const currentFirstEvent = get(obj, dateKey, false);
            if (
                !currentFirstEvent ||
                isBefore(event.start, currentFirstEvent)
            ) {
                return { ...obj, [dateKey]: event.start };
            }
            return obj;
        }, {});

    return (
        <DailyEventsCount
            calendars={calendars}
            calendarsSelected={calendarsSelected}
        >
            {({ dailyEventsCount }) => (
                <DragDropContextProvider backend={HTML5Backend}>
                    <Mutation
                        mutation={UPDATE_EVENT}
                        onError={e => {
                            logger.error(e);
                        }}
                    >
                        {updateEvent => (
                            <DragAndDropEvent updateEvent={updateEvent}>
                                {({ moveEvent, resizeEvent }) => (
                                    <BigCalendarStyles>
                                        {children({
                                            monthEvents,
                                            firstEventTimesByDate: getFirstEventTimesByDate(),
                                            updateEvent,
                                            moveEvent,
                                            resizeEvent,
                                            dailyEventsCount,
                                            styleToday,
                                            styleEvents,
                                        })}
                                    </BigCalendarStyles>
                                )}
                            </DragAndDropEvent>
                        )}
                    </Mutation>
                </DragDropContextProvider>
            )}
        </DailyEventsCount>
    );
};

BigCalendarWrapper.propTypes = {
    events: EVENTS_PROP_TYPES.isRequired,
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    ...eventsCountTypes,
};

export default BigCalendarWrapper;
