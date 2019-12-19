import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, withTheme } from 'styled-components';
import { prop } from 'styled-tools';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import { DropdownMenu } from 'components/Popover';
import Icon from 'components/Icon';
import { getRandomId } from 'utils/functions';
import { WIDTH_TYPE } from 'types';
import { elasticWidth } from '../utils';
import Input from './Input';
import { OPTIONS_TYPE } from '../types';

const PrimarySelect = css`
    cursor: pointer;
    display: flex;
    align-items: center;
`;

const PrimaryWrapper = styled.div`
    ${PrimarySelect};
    background: ${prop('theme.cbcs[1]')};
    border: ${({ theme }) => `${theme.b} solid ${theme.cbcs[2]}`};
    border-radius: ${prop('theme.br.md')};
    height: ${({ theme }) => theme.szb * 4.5}rem;
    padding: 0 ${prop('theme.sp.md')};
`;

const InverseWrapper = styled.div`
    ${PrimarySelect};
    width: ${elasticWidth};
`;

const SelectedItemDefault = css`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 89%;
`;

const SelectedItem = styled.div`
    font-size: ${prop('theme.fs.lg')};
    color: ${prop('theme.cbc')};
    font-weight: 500;
    ${({ fluid }) => (fluid ? 'margin-right: 1rem' : SelectedItemDefault)};
`;

const IconStyled = styled(Icon)`
    transition: ${prop('theme.ts.easeOut')};
    transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'initial')};
    margin-left: auto;
    width: auto;
    height: auto;
`;

const Select = props => {
    const {
        setSelectedValue,
        setSelectedValueInput,
        options,
        onChange,
        className,
        fluid,
        value,
        width,
        theme,
        isActiveSelected,
        isInput,
        inputProps,
        popoverProps,
        variant,
    } = props;

    const selected = () =>
        get(
            options.filter(option => option.value === value),
            '0.label',
            get(options, '0.label', '')
        );

    const items = (() =>
        // These will all be props passed to a button component (except text)
        options.map(option => ({
            id: getRandomId(),
            text: get(option, 'label', ''),
            selected:
                (option.value === value || option.selected) && isActiveSelected,
            onClick: () => {
                setSelectedValue(option.value);
                if (isFunction(onChange)) {
                    onChange();
                }
            },
        })))();

    // We have it here instead of in default props because we need the size variable from the theme
    // which we don't have access to in default props
    const defaultWidth = theme.szb * 25;

    const Styles = {
        primary: PrimaryWrapper,
        inverse: InverseWrapper,
    };

    const Wrapper = Styles[variant];

    const renderSelect = isOpen => (
        <Wrapper
            width={width}
            fluid={fluid}
            variant={variant}
            className={className}
        >
            <SelectedItem fluid={fluid}>{selected()}</SelectedItem>
            <IconStyled
                type="arrow-down"
                size={4}
                thickness={2}
                fill="#666666"
                isOpen={isOpen}
            />
        </Wrapper>
    );

    const renderInput = () => (
        <Input
            {...inputProps}
            value={value}
            onChange={e => setSelectedValueInput(e.target.value)}
        />
    );

    return (
        <DropdownMenu
            placement="bottom-start"
            {...popoverProps}
            items={items}
            fluid={fluid}
            width={width || defaultWidth}
        >
            {({ isOpen }) => {
                if (isInput) return renderInput();
                return renderSelect(isOpen);
            }}
        </DropdownMenu>
    );
};

Select.defaultProps = {
    fluid: false,
    className: '',
    width: 'auto',
    onChange: () => {},
    isActiveSelected: true,
    isInput: false,
    inputProps: {},
    popoverProps: {},
    variant: 'primary',
    setSelectedValue: () => {},
    setSelectedValueInput: () => {},
};

Select.propTypes = {
    inputProps: PropTypes.object,
    popoverProps: PropTypes.object,
    setSelectedValue: PropTypes.func,
    setSelectedValueInput: PropTypes.func,
    onChange: PropTypes.func,
    // Gotta disable this because optionsType IS required, but eslint isn't recognizing it
    // eslint-disable-next-line react/require-default-props
    options: OPTIONS_TYPE,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    fluid: PropTypes.bool,
    className: PropTypes.string,
    width: WIDTH_TYPE,
    theme: PropTypes.object.isRequired,
    isActiveSelected: PropTypes.bool,
    isInput: PropTypes.bool,
    variant: PropTypes.oneOf(['primary', 'inverse']),
};
Select.displayName = 'Select';

export default withTheme(Select);
