import React, { Fragment } from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { withState } from 'recompose';
import Button from 'components/Button';
import Modal from './views/Modal';
import Alert from './views/Alert';

const stories = storiesOf('Modal', module);

const enhance = withState('isOpen', 'setIsOpen', false);
const ReactModal = enhance(({ isOpen, setIsOpen }) => (
    <Fragment>
        <Button onClick={() => setIsOpen(true)}>Open</Button>
        <Modal
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            width="65%"
            contentLabel="Demo Modal"
            // ariaHideApp should ONLY be used in storybook
            ariaHideApp={false}
        >
            <div>Tons of awesome content can go here</div>
        </Modal>
    </Fragment>
));

stories.add(
    'default',
    withInfo({
        text: 'Default modal',
    })(() => <ReactModal />)
);

const ReactAlert = enhance(({ isOpen, setIsOpen }) => (
    <Fragment>
        <Button onClick={() => setIsOpen(true)}>Alert!</Button>
        <Alert
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            title="You have unsaved changes!"
            content="Some of your changes have not been saved. How would you like to handle your changes when continuing?"
            contentLabel="Unsaved Changes"
            positiveNegativeProps={{
                positiveText: 'Save & Continue',
                negativeText: 'Discard',
            }}
            // ariaHideApp should ONLY be used in storybook
            ariaHideApp={false}
        />
    </Fragment>
));

stories.add(
    'alert',
    withInfo({
        text: 'An alert modal',
    })(() => <ReactAlert />)
);
