import React, { Fragment } from 'react';
import styled from 'styled-components';
import { prop } from 'styled-tools';
import moment from 'moment';

import { EVENT_PROP_TYPES } from '../types';

const EventName = styled.div`
    margin-bottom: ${prop('theme.sp.xs')};
`;

const renderTime = time => {
    if (moment(time).format('mm') === '00') {
        return moment(time).format('ha');
    }
    return moment(time).format('h:mma');
};

const EventDayWeek = ({ event }) => (
    <Fragment>
        <EventName>{event.name}</EventName>
        <div>
            {renderTime(event.start)} - {renderTime(event.end)}
        </div>
    </Fragment>
);

EventDayWeek.propTypes = {
    event: EVENT_PROP_TYPES.isRequired,
};

EventDayWeek.displayName = 'EventDayWeek';

export default EventDayWeek;
