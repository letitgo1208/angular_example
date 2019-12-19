import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import get from 'lodash/get';
import Tooltip from 'components/Tooltip';
import { MiniCalendarHover } from 'components/MiniCalendar';
import EventCircle from './EventCircle';

export const MiniCalendarEventCount = styled(EventCircle)`
    position: absolute;
    left: 50%;
    z-index: 2;
    transform: translateX(-50%);
`;

const heatmapColors = {
    // Right now low is the same as the primary color - if we ever start changing
    // themes dynamically do we need to change this? It might not make contextual sense if we do
    // Which is why I'm including it direclty instead of the primary color from the theme
    low: '#51BB7B',
    mid: '#EFB749',
    high: '#BB5151',
};

const getRangeModifier = (dailyEventsCount, currentMonth) => {
    const maxEventsOnSingleDay = Object.keys(dailyEventsCount).reduce(
        (maxAccumulator, date) => {
            if (
                new Date(date).getMonth() !== currentMonth &&
                dailyEventsCount[date] <= maxAccumulator
            ) {
                return maxAccumulator;
            }
            return dailyEventsCount[date];
        },
        0
    );

    let rangeModifier = 0;
    if (maxEventsOnSingleDay > 0) {
        rangeModifier = maxEventsOnSingleDay / 3;
    }
    return rangeModifier;
};

const getHeatmapColor = (dailyEventsCount, date) => {
    const rangeModifier = getRangeModifier(dailyEventsCount, date.getMonth());
    const currentDate = moment(date).format('YYYY-MM-DD');
    const totalCount = get(dailyEventsCount, currentDate, 0);
    if (totalCount > 0 && totalCount <= rangeModifier) {
        return heatmapColors.low;
    }
    if (totalCount > rangeModifier && totalCount <= rangeModifier * 2) {
        return heatmapColors.mid;
    }
    if (totalCount > rangeModifier * 2) {
        return heatmapColors.high;
    }
    return 0;
};

const SmallCalendarTileContent = ({ date, dailyEventsCount }) => {
    const currentDate = moment(date).format('YYYY-MM-DD');
    const totalEvents = get(dailyEventsCount, currentDate, 0);
    if (totalEvents === 0) return <MiniCalendarHover date={date} />;
    return (
        <Tooltip
            overlay={`${dailyEventsCount[currentDate]} Appointments`}
            distance={10}
        >
            <MiniCalendarHover date={date} />
            <MiniCalendarEventCount
                color={getHeatmapColor(dailyEventsCount, date)}
            />
        </Tooltip>
    );
};

SmallCalendarTileContent.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    dailyEventsCount: PropTypes.object.isRequired,
};

export default SmallCalendarTileContent;
