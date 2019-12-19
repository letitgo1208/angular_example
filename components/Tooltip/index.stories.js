import React from 'react';

import { storiesOf } from '@storybook/react';
import { text, select, boolean, number } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';

import Tooltip from './index';

const stories = storiesOf('Tooltip', module);

stories.add(
    'tooltip',
    withInfo({
        text:
            'Default tooltip -- all the props supplied are not needed - our defaults of are good enough most of the time. Overlay and children are only required',
    })(() => (
        <Tooltip
            overlay={text('overlay', 'this is my tip content')}
            position={select(
                'position',
                {
                    top: 'top',
                    'top-start': 'top-start',
                    'top-end': 'top-end',
                    right: 'right',
                    'right-start': 'right-start',
                    'right-end': 'right-end',
                    bottom: 'bottom',
                    'bottom-start': 'bottom-start',
                    'bottom-end': 'bottom-end',
                    left: 'left',
                    'left-start': 'left-start',
                    'left-end': 'left-end',
                },
                'bottom'
            )}
            trigger={select(
                'trigger',
                {
                    mouseenter: 'mouseenter',
                    focus: 'focus',
                    click: 'click',
                    manual: 'manual',
                },
                'click'
            )}
            interactive={boolean('interactive', false)}
            interactiveBorder={number('interactiveBorder', 2)}
            delay={number('delay', 0)}
            hideDelay={number('hideDelay', 0)}
            animation={select(
                'animation',
                {
                    shift: 'shift',
                    perspective: 'perspective',
                    fade: 'fade',
                    scale: 'scale',
                    none: 'none',
                },
                'shift'
            )}
            arrow={boolean('arrow', false)}
            arrowSize={select('arrowSize', {
                small: 'small',
                regular: 'regular',
                big: 'big',
            })}
            animateFill={boolean('animateFill', true)}
            duration={number('duration', 150, { step: 25 })}
            distance={number('distance', 5)}
            offset={number('offset', 0)}
            hideOnClick={number('offset', 0)}
            followCursor={boolean('followCursor', false)}
            inertia={boolean('inertia', false)}
            transitionFlip={boolean('transitionFlip', false)}
        >
            <span>{text('trigger content', 'this is my trigger')}</span>
        </Tooltip>
    ))
);
