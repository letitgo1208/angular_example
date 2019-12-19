import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { OPTIONS_TYPE } from 'components/Form/types';

import InputBase from './views/InputBase';
import InlineIcon from './views/InlineIcon';
import SelectFilterPopoverInput from './views/SelectFilterPopoverInput';

const Input = props => {
    if (!isEmpty(props.tags)) {
        return <SelectFilterPopoverInput {...props} />;
    }

    if (props.renderInlineIcon) {
        return <InlineIcon {...props} />;
    }

    return <InputBase {...props} />;
};

Input.defaultProps = {
    tags: [],
    renderInlineIcon: false,
    errorMessage: '',
};

Input.propTypes = {
    tags: OPTIONS_TYPE,
    renderInlineIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
    errorMessage: PropTypes.string,
};

export default Input;
