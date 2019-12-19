import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { prop } from 'styled-tools';
import moment from 'moment';

const WeekViewDate = styled.div`
    font-size: ${prop('theme.fs.sm')};
`;

const WeekViewDay = styled.div`
    font-size: ${({ theme }) => theme.fsb * 1.8}rem;
    display: inline-block;
`;

const DayViewDate = styled.div`
    text-transform: none;
    display: inline-block;
    margin: ${prop('theme.sp.xs')} 0;
`;

const notificationSize = ({ theme }) => theme.szb * 1.8;
const TotalEvents = styled.div`
    background: ${prop('theme.cn')};
    color: ${prop('theme.cnc')};
    font-size: ${({ theme }) => theme.fsb * 1.1}rem;
    width: ${notificationSize}rem;
    height: ${notificationSize}rem;
    text-align: center;
    border-radius: 50%;
    line-height: ${({ theme }) => theme.szb * 1.9}rem;
    display: inline-block;
    position: relative;
    top: ${({ theme }) => theme.fsb * -0.8}rem;
    margin-left: ${prop('theme.sp.xs')};
`;

export const BigCalendarWeekHeader = ({ date, totalEvents }) => (
    <Fragment>
        <WeekViewDate>{moment(date).format('M/D')}</WeekViewDate>
        <WeekViewDay>{moment(date).format('dddd')}</WeekViewDay>
        {totalEvents > 0 && <TotalEvents>{totalEvents}</TotalEvents>}
    </Fragment>
);

BigCalendarWeekHeader.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    totalEvents: PropTypes.number.isRequired,
};

export const BigCalendarDayHeader = ({ date, totalEvents }) => (
    <Fragment>
        <DayViewDate>{moment(date).format('dddd, MMMM Do, YYYY')}</DayViewDate>
        {totalEvents > 0 && <TotalEvents>{totalEvents}</TotalEvents>}
    </Fragment>
);

BigCalendarDayHeader.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    totalEvents: PropTypes.number.isRequired,
};

export default BigCalendarWeekHeader;
