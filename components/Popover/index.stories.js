import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { text } from '@storybook/addon-knobs';

import Popover, { DropdownMenu, ConfirmDelete } from 'components/Popover';
import Button from 'components/Button';
import log from 'utils/logger';
import Icon from 'components/Icon';
import ErrorPopover from './views/ErrorPopover';

const stories = storiesOf('Popovers', module);

stories.add(
    'popover',
    withInfo({ text: 'Popover with no menu' })(() => (
        <Popover
            closeButton
            overlay={
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Magni nostrum, repellendus? Amet asperiores, atque est ipsam
                    iusto nam officia omnis quae quam quos recusandae ut vel? Ad
                    aliquam quam totam.
                </div>
            }
        >
            <Button>Click for popover</Button>
        </Popover>
    ))
);

stories.add(
    'dropdown menu',
    withInfo({ text: 'Popover with a selectable menu' })(() => (
        <DropdownMenu
            items={[
                {
                    text: 'First item',
                },
                {
                    text: 'Second item',
                },
                {
                    text: 'Third item',
                },
            ]}
        >
            <Button>Click for dropdown</Button>
        </DropdownMenu>
    ))
);

stories.add(
    'Close popover from within popover',
    withInfo({ text: 'Popover with a selectable menu' })(() => (
        <Popover
            overlay={({ setIsOpen }) => (
                <Button onClick={() => setIsOpen(false)}>Close me</Button>
            )}
        >
            <Button>Click for dropdown</Button>
        </Popover>
    ))
);

stories.add(
    'error popover',
    withInfo({ text: 'Popover for error inlined - like validation errors' })(
        () => (
            <ErrorPopover message="This is an awesome error message">
                {({ isOpen, setIsOpen, id }) => (
                    <Button id={id} onClick={() => setIsOpen(!isOpen)}>
                        Click Me!
                    </Button>
                )}
            </ErrorPopover>
        )
    )
);

stories.add(
    'confirm delete',
    withInfo({ text: 'Popover for error inlined - like validation errors' })(
        () => (
            <ConfirmDelete
                type={text('type', 'form')}
                message={text('message', '')}
                onDelete={() => log.info('Deleted!')}
            >
                <Icon type="trash" hover height={2} width={1.8} />
            </ConfirmDelete>
        )
    )
);
