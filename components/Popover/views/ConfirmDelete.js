import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { prop } from 'styled-tools';
import omit from 'lodash/omit';
// Not importing from named components/Form here to avoid circular dependencies
import PositiveNegativeButtons from 'components/Form/types/PositiveNegativeButtons';
import Popover from './Popover';

const Message = styled.p`
    margin-bottom: ${({ theme }) => theme.spb * 3}rem;
    font-size: ${prop('theme.fs.lg')};
    font-weight: 500;
`;

const ConfirmDelete = props => {
    const popoverProps = omit(props, ['message', 'type']);
    const { message, type, children, onDelete } = props;

    const renderMessage = () => {
        if (message) return message;
        let spacedType = '';
        if (type) {
            spacedType = ` ${type}`;
        }
        return `Are you sure you want to delete this${spacedType}? This action cannot be undone. Choose wisely.`;
    };

    return (
        <Popover
            {...popoverProps}
            lightShadow
            maxWidth={44.4}
            overlay={({ setIsOpen }) => (
                <Fragment>
                    <Message>{renderMessage()}</Message>
                    <PositiveNegativeButtons
                        onPositive={() => {
                            onDelete();
                            setIsOpen(false);
                        }}
                        positiveText="Delete"
                        positiveProps={{
                            variant: 'delete',
                            size: 'large',
                        }}
                        onNegative={() => setIsOpen(false)}
                    />
                </Fragment>
            )}
        >
            {children}
        </Popover>
    );
};

ConfirmDelete.defaultProps = {
    message: false,
    type: '',
};

ConfirmDelete.propTypes = {
    children: PropTypes.node.isRequired,
    onDelete: PropTypes.func.isRequired,
    // If the message is not included then we'll use a default message
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    // The type of thing we're deleting - this will appear in confirm delete message
    type: PropTypes.string,
};

ConfirmDelete.displayName = 'ConfirmDelete';

export default ConfirmDelete;
