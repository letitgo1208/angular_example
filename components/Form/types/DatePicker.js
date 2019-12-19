import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { format, setTime } from 'dateFns';
import Popover from 'components/Popover';
import MiniCalendar from 'components/MiniCalendar';
import Input from './Input';

const MiniCalendarWrapper = styled.div`
    .react-calendar {
        width: ${({ theme }) => theme.szb * 30}rem;
        margin: ${({ theme }) => theme.spb * -1}rem;
    }
`;

const InputStyled = styled(Input)`
    cursor: pointer;
    > input {
        cursor: pointer;
    }
`;

const DatePicker = ({
    date,
    handleDateChange,
    dateFormat,
    inputProps,
    popoverProps,
}) => (
    <Popover
        placement="bottom"
        {...popoverProps}
        scroll={false}
        overlay={({ setIsOpen }) => (
            <MiniCalendarWrapper>
                <MiniCalendar
                    onSelectedDateChange={selectedDate => {
                        // If we passed in a time with the date let's keep that with
                        // the returned date
                        const selectedDateTime = setTime(selectedDate, date);
                        handleDateChange(selectedDateTime);
                        setIsOpen(false);
                    }}
                    selectedDate={date}
                    firstDayOfWeek={0}
                />
            </MiniCalendarWrapper>
        )}
    >
        <InputStyled
            readOnly
            {...inputProps}
            value={format(date, dateFormat)}
            onChange={e => handleDateChange(new Date(e.target.value))}
        />
    </Popover>
);

DatePicker.defaultProps = {
    dateFormat: 'MM-DD-YYYY',
    inputProps: {},
    popoverProps: {},
};

DatePicker.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    handleDateChange: PropTypes.func.isRequired,
    dateFormat: PropTypes.string,
    inputProps: PropTypes.object,
    popoverProps: PropTypes.object,
};

DatePicker.displayName = 'DatePicker';

export default DatePicker;
