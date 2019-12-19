import React from 'react';
import styled from 'styled-components';
import { prop } from 'styled-tools';
import moment from 'moment';
import { EVENT_PROP_TYPES } from '../types';

import EventCircle from './EventCircle';

const EventMonthContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const EventStyledText = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 70%;
    font-size: ${prop('theme.fs.sm')};
`;

const EventStyledCircle = styled(EventCircle)`
    position: relative;
    top: ${({ theme }) => theme.spb * 0.52}rem;
    margin-right: ${({ theme }) => theme.spb * 0.3}rem;
    font-weight: 500;
`;

const EventStyledTime = styled.div`
    margin-left: auto;
    color: ${prop('theme.cbcs[4]')};
    font-size: ${prop('theme.fs.sm')};
`;

// Styling for Month Events
const EventMonth = ({ event }) => {
    const renderTime = () => {
        if (moment(event.start).format('mm') === '00') {
            return moment(event.start).format('h A');
        }
        return moment(event.start).format('h:mm A');
    };
    return (
        <EventMonthContainer className="MonthEvent">
            <EventStyledCircle color={event.color} />
            <EventStyledText>{event.name}</EventStyledText>
            <EventStyledTime>{renderTime()}</EventStyledTime>
        </EventMonthContainer>
    );
};

EventMonth.propTypes = {
    event: EVENT_PROP_TYPES.isRequired,
};

EventMonth.displayName = 'EventMonth';

export default EventMonth;
