import React from 'react';

import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';

import Button from './index';

const stories = storiesOf('Button', module);

stories.add(
    'primary button',
    withInfo({ text: 'Button with background contrast' })(() => (
        <Button
            size={select(
                'size',
                { small: 'small', default: 'default', large: 'large' },
                'default'
            )}
        >
            {text('children', 'Today')}
        </Button>
    ))
);

stories.add(
    'circle icon with text',
    withInfo({ text: 'Circle Icon Button with Text' })(() => (
        <Button variant="circle-text" icon={text('icon', 'plus')}>
            {text('children', 'Add Calendar')}
        </Button>
    ))
);

stories.add(
    'tertiary button',
    withInfo({ text: 'Button with background contrast' })(() => (
        <Button variant="tertiary">{text('children', 'Today')}</Button>
    ))
);

stories.add(
    'secondary button',
    withInfo({ text: 'Button with background contrast' })(() => (
        <Button variant="secondary">{text('children', 'Today')}</Button>
    ))
);
