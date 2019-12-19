import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { prop } from 'styled-tools';
import ReactModal from 'react-modal';
import Icon from 'components/Icon';
import { WIDTH_TYPE } from 'types';
import { elasticWidth } from 'utils/styles';
import { ROOT_ID } from 'utils/constants';

const root = `#${ROOT_ID}`;
const rootElement = document.getElementById(root);
if (rootElement !== null) {
    ReactModal.setAppElement(root);
}

const IconStyled = styled(Icon)`
    position: absolute;
    top: ${prop('theme.sp.sm')};
    right: ${prop('theme.sp.sm')};
`;

const enhance = withTheme;

const Modal = props => {
    const { children, onRequestClose, theme, width, maxWidth } = props;

    const styles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
        },
        content: {
            border: 0,
            padding: `${theme.szb * 4}rem`,
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: elasticWidth({ theme, width }),
            maxWidth: elasticWidth({ theme, width: maxWidth }),
        },
    };

    return (
        <ReactModal style={styles} {...props} closeTimeoutMS={theme.td}>
            <Fragment>
                {children}
                <IconStyled
                    type="close"
                    hover
                    onClick={() => onRequestClose()}
                    height={1.5}
                    width={1.5}
                />
            </Fragment>
        </ReactModal>
    );
};

Modal.defaultProps = {
    width: 'auto',
    maxWidth: 'auto',
};

Modal.propTypes = {
    onRequestClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    theme: PropTypes.object.isRequired,
    // How the modal is announced to screen readers - some title is good here
    contentLabel: PropTypes.string.isRequired,
    width: WIDTH_TYPE,
    maxWidth: WIDTH_TYPE,
};

export default enhance(Modal);
