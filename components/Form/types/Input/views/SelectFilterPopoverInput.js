import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { prop } from 'styled-tools';
import { compose } from 'recompose';
import withOnClickOutside from 'react-onclickoutside';
import Icon from 'components/Icon';
import { getRandomId } from 'utils/functions';

import { OPTIONS_TYPE } from 'components/Form/types';
import { WIDTH_TYPE } from 'types';
import SelectFilterPopover from '../../SelectFilterPopover';
import InputWrapper from './InputWrapper';
import InputBase from './InputBase';

const paddingRight = ({ theme }) => theme.spb * 5.5;

const InputStyled = styled(InputBase)`
    && {
        padding-right: ${({ theme, styleProps }) =>
            styleProps.isOpen ? `${paddingRight({ theme })}rem` : 2};
    }

    ${InputWrapper}:hover && {
        padding-right: ${paddingRight}rem;
    }
`;

const IconStyled = styled(Icon)`
    && {
        opacity: ${({ styleProps }) => (styleProps.isOpen ? 1 : 0)};
        transition: ${prop('theme.ts.easeIn')};
    }
    ${InputWrapper}:hover && {
        opacity: 1;
    }
`;

const enhance = compose(withTheme, withOnClickOutside);

class SelectFilterPopoverInput extends Component {
    static defaultProps = {
        width: 'auto',
        tags: [],
        id: '',
    };

    static propTypes = {
        width: WIDTH_TYPE,
        tags: OPTIONS_TYPE,
        theme: PropTypes.object.isRequired,
        setValue: PropTypes.func.isRequired,
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        id: PropTypes.string,
    };

    state = {
        id: getRandomId(),
        isOpen: false,
    };

    handleToggleIsOpen = () => {
        this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    };

    handleClickOutside = () => {
        this.setState({ isOpen: false });
    };

    render() {
        return (
            <InputWrapper width={this.props.width} id={this.props.id}>
                <InputStyled
                    {...this.props}
                    styleProps={{ isOpen: this.state.isOpen }}
                    width="100%"
                    id={this.state.id}
                />
                <SelectFilterPopover
                    unfilteredOptions={this.props.tags}
                    handleClick={value => {
                        this.props.setValue(this.props.value + value);
                    }}
                >
                    {({ isOpen }) => (
                        <IconStyled
                            isButton
                            variant="inputInline"
                            type="insert"
                            fill={isOpen ? this.props.theme.cs : undefined}
                            hoverFill={this.props.theme.cs}
                            styleProps={{ isOpen }}
                            onClick={this.handleToggleIsOpen}
                        />
                    )}
                </SelectFilterPopover>
            </InputWrapper>
        );
    }
}

export default enhance(SelectFilterPopoverInput);
