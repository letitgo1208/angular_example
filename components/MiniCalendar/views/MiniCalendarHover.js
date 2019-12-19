import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { prop } from 'styled-tools';

export const MiniCalendarActiveTile = styled.div`
    width: ${({ theme }) => theme.szb * 2.9}rem;
    height: ${({ theme }) => theme.szb * 2.9}rem;
    background: ${prop('theme.cbcs[2]')};
    position: absolute;
    border-radius: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-49%, -50%);
    z-index: 2;
    opacity: 0;
    display: flex;
    align-items: center;
`;

export const Time = styled.time`
    margin: 0 auto;
    left: -0.02rem;
    top: -0.02rem;
`;

const MiniCalendarHover = ({ date }) => (
    <MiniCalendarActiveTile>
        <Time dateTime={date}>{date.getDate()}</Time>
    </MiniCalendarActiveTile>
);

MiniCalendarHover.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
};

export default MiniCalendarHover;
