import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import Popover from './Popover';
import SelectableMenu from './SelectableMenu';

const DropdownMenu = props => {
    const adjustedProps = omit(props, ['mode', 'items', 'children']);

    return (
        <Popover
            {...adjustedProps}
            overlay={({ setIsOpen }) => (
                <SelectableMenu {...props} setIsOpen={setIsOpen} />
            )}
        >
            {props.children}
        </Popover>
    );
};

DropdownMenu.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};
DropdownMenu.displayName = 'DropdownMenu';

export default DropdownMenu;
