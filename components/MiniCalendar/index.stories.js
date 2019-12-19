import React from 'react';
import styled from 'styled-components';
import log from 'utils/logger';

import { storiesOf } from '@storybook/react';
import { number, date } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';

import MiniCalendar from './index';

const stories = storiesOf('Mini Calendar', module);

const datePickerKnob = (name, defaultValue) => {
    const stringTimestamp = date(name, defaultValue);
    return new Date(stringTimestamp);
};

const CalendarWrapper = styled.div`
    width: 40rem;
`;

stories.add(
    'mini calendar',
    withInfo({ text: 'Default mini calendar' })(() => (
        <CalendarWrapper>
            <MiniCalendar
                onSelectedDateChange={selectedDate =>
                    log.info(`${selectedDate} was selected in the mini cal`)
                }
                selectedDate={datePickerKnob('time', new Date('Jan 20 2017'))}
                firstDayOfWeek={number('firstDayOfWeek', 1, {
                    min: 0,
                    max: 1,
                })}
            />
        </CalendarWrapper>
    ))
);
