import React, { Component } from 'react';
import PropTypes from 'prop-types';

import timeJS from 'time-js';
import {
    differenceInMinutes,
    getHours,
    getMinutes,
    setHours,
    setMinutes,
} from 'dateFns';
import findIndex from 'lodash/findIndex';

import Select from './Select';

const formatMinutes = minutes => {
    let formattedMinutes = minutes;
    if (minutes < 10) {
        formattedMinutes = `0${minutes}`;
    }
    return formattedMinutes;
};

const getAMPM = hours => {
    let AMPM = 'am';
    if (hours > 11) AMPM = 'pm';
    return AMPM;
};

const formatHours12HourFormat = hours => {
    if (hours > 12) return hours - 12;
    if (hours === 0) return 12;
    return hours;
};

const formatHours24HourFormat = hours => (hours < 10 ? `0${hours}` : hours);

/**
 * Get 24 hour time
 */
const get24HourTime = (hours, minutes) => {
    const formattedMinutes = formatMinutes(minutes);
    const formattedHours = formatHours24HourFormat(hours);
    return `${formattedHours}:${formattedMinutes}`;
};

const get12HourTime = (hours, minutes) => {
    const formattedMinutes = formatMinutes(minutes);
    const AMPM = getAMPM(hours);
    const formattedHours = formatHours12HourFormat(hours);
    return `${formattedHours}:${formattedMinutes}${AMPM}`;
};

/**
 * Get the label for the time picker - depending on format 12 or 24 hour time
 */
const getLabel = (hours, minutes, timeFormat) => {
    if (timeFormat === '24') return get24HourTime(hours, minutes);
    return get12HourTime(hours, minutes);
};

const inputValueDefault = (dateTime, timeFormat) => {
    const hours = getHours(dateTime);
    const minutes = getMinutes(dateTime);
    return getLabel(hours, minutes, timeFormat);
};

class TimePicker extends Component {
    static defaultProps = {
        timeFormat: '12',
        minuteStep: 30,
        inputProps: {},
        popoverProps: {},
    };

    static propTypes = {
        inputProps: PropTypes.object,
        popoverProps: PropTypes.object,
        timeFormat: PropTypes.oneOf(['12', '24']),
        minuteStep: PropTypes.number,
        dateTime: PropTypes.instanceOf(Date).isRequired,
        handleTimeChange: PropTypes.func.isRequired,
    };

    static displayName = 'TimePicker';

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.dateTime.getTime() !== prevState.lastDateTime.getTime()) {
            return {
                inputValue: inputValueDefault(
                    nextProps.dateTime,
                    nextProps.timeFormat
                ),
                lastDateTime: nextProps.dateTime,
            };
        }

        return null;
    }

    state = {
        inputValue: inputValueDefault(
            this.props.dateTime,
            this.props.timeFormat
        ),
        lastDateTime: this.props.dateTime,
    };

    setInputValue = inputValue => {
        this.setState({ inputValue });
    };

    /**
     * Get the difference in minutes between the inputed time and a labeled option time
     * @param label
     * @returns {number}
     */
    getDifference = label => {
        const currentValue = timeJS(this.state.inputValue).nextDate();
        const comparingValue = timeJS(label).nextDate();
        return Math.abs(differenceInMinutes(comparingValue, currentValue));
    };

    /**
     * This will choose the closest labeled time in the timepicker to what was actually put into the input field
     * and make it the selected time. This is important while allowing users to input their own custom time
     * @param options
     * @returns {*}
     */
    setSelectedTime = options => {
        // This just needs to be higher than the minute step - because eventually one slot will be lower
        // than it
        let minDifference = this.props.minuteStep * 2;
        minDifference = options.reduce((accumulator, option) => {
            const difference = this.getDifference(option.label);
            if (accumulator > difference) return difference;
            return accumulator;
        }, minDifference);

        const minOptionIndex = findIndex(
            options,
            option => this.getDifference(option.label) === minDifference
        );

        const newOptions = options;
        newOptions[minOptionIndex] = {
            ...options[minOptionIndex],
            selected: true,
        };
        return newOptions;
    };

    getTimeOptions = () => {
        const { minuteStep, timeFormat } = this.props;
        const options = [];
        if (!minuteStep) return options;
        let hours = 0;
        let minutes = 0;
        while (hours < 23 || minutes < 60) {
            if (minutes > 59) {
                const hoursInMinutes = Math.floor(minutes / 60, 1);
                hours += hoursInMinutes;
                minutes -= 60 * hoursInMinutes;
            }
            const label = getLabel(hours, minutes, timeFormat);
            // The date doesn't matter here, we're just using for duration
            options.push({
                label,
                value: label,
            });
            minutes += minuteStep;
        }

        return this.setSelectedTime(options);
    };

    handleChangeDate = alteredTime => {
        const { dateTime, handleTimeChange } = this.props;
        const hours = getHours(timeJS(alteredTime).nextDate());
        const minutes = getMinutes(timeJS(alteredTime).nextDate());
        // This has to give us back a date
        const newDateTime = setHours(setMinutes(dateTime, minutes), hours);
        handleTimeChange(newDateTime);
    };

    render() {
        const { inputProps, popoverProps } = this.props;

        return (
            <Select
                value={this.state.inputValue}
                setSelectedValue={alteredTime => {
                    this.handleChangeDate(alteredTime);
                }}
                options={this.getTimeOptions()}
                setSelectedValueInput={alteredTime => {
                    this.setInputValue(alteredTime);
                }}
                isInput
                inputProps={{
                    ...inputProps,
                    onBlur: e => {
                        const alteredTime = e.target.value;
                        this.handleChangeDate(alteredTime);
                    },
                }}
                popoverProps={popoverProps}
            />
        );
    }
}

export default TimePicker;
