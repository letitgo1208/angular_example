import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { prop } from 'styled-tools';
import ReactClock from 'react-clock/dist/entry.nostyle';

const Wrapper = styled.div`
    display: inline-block;
    position: relative;
    .react-clock {
        display: block;
        position: relative;
        &__face {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            border: 0.1rem solid ${prop('color')};
            border-radius: 50%;
        }
        &__hand {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 50%;
            right: 50%;
            transition: transform 0.5s;
            &__body {
                position: absolute;
                transform: translateX(-50%);
                background-color: ${prop('color')};
                border-radius: 1rem;
            }
        }
    }
`;

const CenterOfClock = styled.div`
    width: ${({ theme, size }) => Math.ceil(theme.szb * (size * 10 / 6))}px;
    height: ${({ theme, size }) => Math.ceil(theme.szb * (size * 10 / 6))}px;
    border-radius: 50%;
    border: 0.1rem solid ${prop('color')};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const defaultTimestamp = new Date().setHours(8, 0, 0);
const defaultTime = new Date(defaultTimestamp);

const Clock = props => (
    <Wrapper className={props.className} color={props.stroke || props.theme.cp}>
        <CenterOfClock
            color={props.stroke || props.theme.cp}
            size={props.width}
        />
        <ReactClock
            size={props.width * 10}
            value={props.date}
            renderSecondHand={false}
            hourHandWidth={1}
            minuteHandWidth={1}
            renderMinuteMarks={false}
            renderHourMarks={false}
            minuteHandLength={75}
            hourHandLength={55}
            minuteHandOppositeLength={-15}
            hourHandOppositeLength={-15}
        />
    </Wrapper>
);

Clock.defaultProps = {
    className: '',
    date: defaultTime,
};

Clock.propTypes = {
    width: PropTypes.number.isRequired,
    // We can't access the theme in the default props
    // eslint-disable-next-line react/require-default-props
    stroke: PropTypes.string,
    theme: PropTypes.object.isRequired,
    className: PropTypes.string,
    date: PropTypes.instanceOf(Date),
};

export default withTheme(Clock);
