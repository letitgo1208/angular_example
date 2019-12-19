import React from 'react';

import { storiesOf } from '@storybook/react';
import { color, select, number, boolean, date } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';

import theme from 'config/theme';

import Icon, { icons } from './index';

const stories = storiesOf('Icon', module);

const selectIcons = icons.reduce((object, value) => {
    const newObject = object;
    newObject[value] = value;
    return newObject;
}, {});

stories.add(
    'default',
    withInfo({ text: 'Icons' })(() => (
        <Icon
            type={select('type', selectIcons, 'calendar')}
            fill={color('fill', 'none')}
            stroke={color('stroke', theme.cbc)}
            width={number('width', 2)}
            hover={boolean('hover', false)}
        />
    ))
);

const datePickerKnob = (name, defaultValue) => {
    const stringTimestamp = date(name, defaultValue);
    return new Date(stringTimestamp);
};

stories.add(
    'animated clock with time',
    withInfo({ text: 'Animated Clock' })(() => (
        <Icon
            type="clock"
            stroke={color('color', theme.cbc)}
            width={number('width', 2.5)}
            date={datePickerKnob('time', new Date('Jan 20 2017'))}
        />
    ))
);

stories.add(
    'calendar with date',
    withInfo({ text: 'Calendar with changing date' })(() => (
        <Icon
            type="calendar"
            stroke={color('color', theme.cp)}
            width={number('width', 2.2)}
            date={datePickerKnob('time', new Date('Jan 20 2017'))}
        />
    ))
);
