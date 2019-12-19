import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { PositiveNegativeButtons } from 'components/Form';
import omit from 'lodash/omit';
import Modal from './Modal';
import ModalTitle from './ModalTitle';
import ModalParagraph from './ModalParagraph';

const Alert = props => {
    const { title, content, positiveNegativeProps, onRequestClose } = props;

    const positiveNegativePassedProps = omit(positiveNegativeProps, [
        'onPositive',
        'onNegative',
    ]);

    const modalProps = omit(props, [
        'title',
        'content',
        'positiveNegativeProps',
    ]);

    return (
        <Modal maxWidth={50} {...modalProps}>
            <Fragment>
                <ModalTitle>{title}</ModalTitle>
                <ModalParagraph>{content}</ModalParagraph>
                <PositiveNegativeButtons
                    onPositive={() => {
                        if (
                            typeof positiveNegativeProps.onPositive !==
                            'undefined'
                        ) {
                            positiveNegativeProps.onPositive();
                        }
                        onRequestClose();
                    }}
                    onNegative={() => {
                        if (
                            typeof positiveNegativeProps.onNegative !==
                            'undefined'
                        ) {
                            positiveNegativeProps.onNegative();
                        }
                        onRequestClose();
                    }}
                    {...positiveNegativePassedProps}
                />
            </Fragment>
        </Modal>
    );
};

Alert.defaultProps = {
    positiveNegativeProps: {},
};

Alert.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    positiveNegativeProps: PropTypes.object,
    onRequestClose: PropTypes.func.isRequired,
};

export default Alert;
