import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { prop } from 'styled-tools';
import Icon from 'components/Icon';
import { colorType } from 'types';

const Box = styled.div`
    width: 1.6rem;
    height: 1.6rem;
    background: ${({ color, theme, checked }) =>
        checked ? color || theme.cp : theme.cb};
    border: solid ${({ color, theme }) => color || theme.cp} 0.15rem;
    border-radius: ${prop('theme.br.md')};
    position: relative;
    cursor: pointer;
    transition: ${prop('theme.ts.easeIn')};
`;

const IconStyled = styled(Icon)`
    display: flex;
    position: absolute;
    top: 50%;
    transform: translateY(-50%) translateX(1%);
    opacity: ${({ styleProps }) => (styleProps.checked ? 1 : 0)};
    transition: ${prop('theme.ts.easeIn')};
`;

const Checkbox = props => (
    <Box
        {...props}
        onClick={e => {
            props.setChecked(e);
            if (props.onClick) {
                props.onClick(e);
            }
        }}
    >
        <IconStyled
            styleProps={{ checked: props.checked }}
            type="check"
            fill={props.theme.cc(props.color || props.theme.cp)}
        />
    </Box>
);

Checkbox.defaultProps = {
    onClick: false,
    setChecked: () => {},
};

Checkbox.propTypes = {
    checked: PropTypes.bool.isRequired,
    theme: PropTypes.object.isRequired,
    setChecked: PropTypes.func,
    // The default is in the theme which we don't have access to here
    // eslint-disable-next-line react/require-default-props
    color: colorType,
    onClick: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
};

export default withTheme(Checkbox);
