// ES6 Class and Module Syntax
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Select, Radio, InputNumber, Form } from 'antd';
import { DatePicker } from 'components/Form';

import { EventSidebarRow, Capitalized } from './EventSidebarStyles';
const Option = Select.Option;

const DAYS_OF_THE_WEEK = [
    'SUNDAY',
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
];

const EventCustomOccurrence = ({ occurrence, setFieldValue }) => (
    <Fragment>
        {/* EVENT NAME */}
        <EventSidebarRow>
            Repeat Every
            <Form.Item>
                <InputNumber
                    min={1}
                    max={100}
                    value={occurrence.eventInterval}
                    onChange={interval =>
                        setFieldValue('occurrence.eventInterval', interval)
                    }
                />
            </Form.Item>
            <Select
                value={occurrence.eventIntervalTimeFrame}
                style={{ width: 240 }}
                onChange={intervalTimeFrame =>
                    setFieldValue(
                        'occurrence.eventIntervalTimeFrame',
                        intervalTimeFrame
                    )
                }
            >
                <Option value="DAYS">Days</Option>
                <Option value="WEEKS">Weeks</Option>
                <Option value="MONTHS">Months</Option>
                <Option value="YEARS">Years</Option>
            </Select>
        </EventSidebarRow>
        {occurrence.eventIntervalTimeFrame === 'WEEKS' && (
            <EventSidebarRow>
                Repeat On
                {DAYS_OF_THE_WEEK.map(day => (
                    <Checkbox
                        checked={occurrence.eventRepeatOn[day]}
                        onChange={() =>
                            setFieldValue(
                                `occurrence.eventRepeatOn.${day}`,
                                !occurrence.eventRepeatOn[day]
                            )
                        }
                        key={`event-day-of-week-${day}`}
                    >
                        <Capitalized>{day}</Capitalized>
                    </Checkbox>
                ))}
            </EventSidebarRow>
        )}

        <Radio.Group
            value={occurrence.eventEnds}
            onChange={e =>
                setFieldValue('occurrence.eventEnds', e.target.value)
            }
        >
            <EventSidebarRow>
                <Radio value="NEVER">Never</Radio>
            </EventSidebarRow>
            <EventSidebarRow>
                <Radio value="ON">
                    On
                    <DatePicker
                        inputProps={{
                            variant: 'inline',
                        }}
                        popoverProps={{
                            placement: 'bottom-start',
                        }}
                        date={occurrence.eventOn || new Date()}
                        handleDateChange={onDate =>
                            setFieldValue('occurence.eventOn', onDate)
                        }
                        disabled={occurrence.eventEnds !== 'ON'}
                    />
                </Radio>
            </EventSidebarRow>
            <EventSidebarRow>
                <Radio value="AFTER">
                    After
                    <InputNumber
                        min={1}
                        max={100}
                        value={occurrence.eventAfter}
                        onChange={eventAfter =>
                            setFieldValue('occurrence.eventAfter', eventAfter)
                        }
                        disabled={occurrence.eventEnds !== 'AFTER'}
                    />
                    occurrences
                </Radio>
            </EventSidebarRow>
        </Radio.Group>
    </Fragment>
);

EventCustomOccurrence.propTypes = {
    setFieldValue: PropTypes.func.isRequired,
    occurrence: PropTypes.object.isRequired,
};

export default EventCustomOccurrence;
