import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';

import { WIDTH_TYPE } from 'types';
import InputWrapper from './InputWrapper';
import InputBase from './InputBase';

const InlineIcon = props => {
    const passedProps = omit(props, ['id']);

    return (
        <InputWrapper width={props.width} id={props.id}>
            <InputBase {...passedProps} width="100%" />
            {React.cloneElement(props.renderInlineIcon, {
                variant: 'inputInline',
            })}
        </InputWrapper>
    );
};

InlineIcon.defaultProps = {
    width: 'auto',
    id: '',
};

InlineIcon.propTypes = {
    width: WIDTH_TYPE,
    renderInlineIcon: PropTypes.object.isRequired,
    id: PropTypes.string,
};

export default InlineIcon;
