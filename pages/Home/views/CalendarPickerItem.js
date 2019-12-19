import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { prop } from 'styled-tools';
import isEmpty from 'lodash/isEmpty';
import { Mutation } from 'react-apollo';
import { Checkbox } from 'components/Form';
import Icon from 'components/Icon';
import Popover from 'components/Popover';
import Color from 'components/Color';
import ColorPicker from './ColorPicker';
import { UPDATE_CALENDAR, updateCalendarOptimisticResponse } from '../queries';

const CalendarPickerItemSettings = styled.div`
    display: flex;
    margin-left: auto;
    opacity: 0;
    transition: ${prop('theme.ts.easeIn')};
`;

const CalendarWrapper = styled.div`
    display: flex;
    cursor: pointer;
    margin-left: 0 !important;
    width: 100%;
    font-weight: 500;
    padding: ${({ theme }) => theme.spb * 0.7}rem 0;
    transition: ${prop('theme.ts.easeOut')};
    &:hover,
    &.active {
        width: calc(100% + ${prop('theme.sp.lg')});
        background: ${prop('theme.cbcs[2]')};
        border-radius: ${prop('theme.br.md')};
        padding: ${({ theme }) => theme.spb * 0.7}rem ${prop('theme.sp.sm')};
        margin-left: -${prop('theme.sp.sm')} !important;
        ${CalendarPickerItemSettings} {
            opacity: 1;
        }
    }
`;

const CurrentColor = Color.extend`
    margin-right: ${prop('theme.sp.lg')};
`;

const CalendarName = styled.div`
    padding-right: ${prop('theme.sp.sm')};
    font-weight: 500;
    position: relative;
`;

const CheckboxStyled = styled(Checkbox)`
    flex: 0 0 1.6rem;
    margin: 0.2rem ${prop('theme.sp.md')} 0 0;
`;

const CalendarPickerItem = ({
    calendar,
    calendars,
    onCalendarSelect,
    calendarsSelected,
}) => (
    <Popover
        manualState
        placement="right"
        overlay={({ setIsOpen }) => (
            <Mutation mutation={UPDATE_CALENDAR}>
                {updateCalendar => (
                    <ColorPicker
                        calendar={calendar}
                        handleClick={color => {
                            updateCalendar(
                                updateCalendarOptimisticResponse({
                                    id: calendar.id,
                                    name: calendar.name,
                                    color,
                                })
                            );
                            setIsOpen(false);
                        }}
                    />
                )}
            </Mutation>
        )}
    >
        {({ isOpen, setIsOpen, id }) => (
            <CalendarWrapper
                onClick={() => onCalendarSelect({ calendar, calendars })}
                className={isOpen && 'active'}
            >
                <CheckboxStyled
                    checked={
                        isEmpty(calendarsSelected) ||
                        calendarsSelected[calendar.id]
                    }
                    color={calendar.color}
                />
                <CalendarName>{calendar.name}</CalendarName>
                <CalendarPickerItemSettings>
                    <CurrentColor
                        color={calendar.color}
                        onClick={e => {
                            e.stopPropagation();
                            setIsOpen(!isOpen);
                        }}
                        id={id}
                    />
                    <Icon type="vertical-dots" />
                </CalendarPickerItemSettings>
            </CalendarWrapper>
        )}
    </Popover>
);

CalendarPickerItem.propTypes = {
    calendars: PropTypes.array.isRequired,
    calendar: PropTypes.object.isRequired,
    onCalendarSelect: PropTypes.func.isRequired,
    calendarsSelected: PropTypes.object.isRequired,
};

export default CalendarPickerItem;
