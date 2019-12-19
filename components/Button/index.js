import React from 'react';
import styled, { css } from 'styled-components';
import { prop } from 'styled-tools';

import PropTypes from 'prop-types';

import { Button as AntdButton } from 'antd';

const CircleText = styled(AntdButton)`
    &&.ant-btn {
        transition: ${prop('theme.ts.easeIn')};
        &:hover .anticon {
            background: ${prop('theme.cps[4]')};
            transition: ${prop('theme.ts.easeIn')};
        }
        border: 0;
        padding-left: 0;
    }
    && .anticon {
        background: ${prop('theme.cp')};
        color: ${prop('theme.cpc')};
        font-weight: 700;
        padding: ${prop('theme.sp.xs')};
        border-radius: 50%;
    }
`;

const Tertiary = styled(AntdButton)`
    &&.ant-btn {
        transition: ${prop('theme.ts.easeIn')};
        &:focus,
        &:hover {
            background: ${prop('theme.cbcs[3]')};
            color: ${prop('theme.cbcs[8]')};
        }
        border: 0;
        background: ${prop('theme.cbcs[2]')};
        color: ${prop('theme.cbcs[5]')};
        border-radius: 0;
    }
`;

const padding = ({ theme, size }) => {
    const paddings = {
        small: `0 ${theme.sp.md} 0.1rem`,
        default: `0 ${theme.spb * 3}rem`,
        large: `0 ${theme.spb * 3}rem`,
    };
    return paddings[size];
};

const minWidth = ({ theme, size }) => {
    const widths = {
        small: 'initial',
        default: `${theme.szb * 10}rem`,
        large: `${theme.szb * 13.2}rem`,
    };
    return widths[size];
};

const height = ({ theme, size }) => {
    const heights = {
        small: `${theme.szb * 2.5}rem`,
        default: `${theme.szb * 3.5}rem`,
        large: `${theme.szb * 4.5}rem`,
    };
    return heights[size];
};

const fontSize = ({ theme, size }) => {
    const heights = {
        small: `${theme.szb * 1.2}rem`,
        default: `${theme.szb * 1.4}rem`,
        large: `${theme.szb * 1.6}rem`,
    };
    return heights[size];
};

const fontWeight = ({ size }) => {
    const sizes = {
        small: 700,
        default: 500,
        large: 700,
    };
    return sizes[size];
};

const Default = css`
    &&.ant-btn {
        transition: ${prop('theme.ts.easeIn')};
        font-weight: ${fontWeight};
        text-transform: uppercase;
        font-size: ${fontSize};
        min-width: ${minWidth};
        height: ${height};
        padding: ${padding};
        line-height: 1.5;
        span {
            display: block;
            margin-top: 0.2rem;
        }
    }
`;

const Secondary = styled(AntdButton)`
    ${Default} &&.ant-btn {
        &:focus,
        &:hover {
            background: ${prop('theme.css[5]')};
        }
        border: 0;
        border-radius: ${prop('theme.br.md')};
        background: ${prop('theme.cs')};
        color: ${prop('theme.csc')};
    }
`;

const Inverse = styled(AntdButton)`
    ${Default} &&.ant-btn {
        &:focus,
        &:hover {
            background: ${prop('theme.cbcs[4]')};
            border-color: ${prop('theme.cbcs[4]')};
            color: ${prop('theme.cb')};
        }
        font-weight: 500;
        border: ${prop('theme.b')} solid ${prop('theme.cbcs[4]')};
        border-radius: ${prop('theme.br.md')};
        background: transparent;
        color: ${prop('theme.cbcs[4]')};
    }
`;

const Invisible = styled(AntdButton)`
    &&.ant-btn {
        background: none;
        min-width: auto;
        border: none;
        height: auto;
        &:hover {
            background: none;
        }
        &:active {
            background: none;
        }
        &:focus {
            background: none;
        }
    }
`;

const Delete = styled(AntdButton)`
    ${Default};
    && {
        background: ${prop('theme.ce')};
        color: ${prop('theme.cec')};
        border: ${prop('theme.b')} solid ${prop('theme.ce')};
        &:hover,
        &:active {
            background: ${prop('theme.ces[5]')};
            border: ${prop('theme.b')} solid ${prop('theme.ces[5]')};
        }
    }
`;

const Primary = styled(AntdButton)`
    ${Default};
`;

const Styles = {
    'circle-text': CircleText,
    tertiary: Tertiary,
    secondary: Secondary,
    inverse: Inverse,
    invisible: Invisible,
    primary: Primary,
    delete: Delete,
};

const Button = props => {
    const ButtonStyles = Styles[props.variant];
    if (props.variant === 'circle-text' || props.variant === 'tertiary') {
        return <ButtonStyles {...props} />;
    }

    return <ButtonStyles type="primary" {...props} />;
};

Button.defaultProps = {
    size: 'default',
    variant: 'primary',
};

Button.propTypes = {
    variant: PropTypes.oneOf(Object.keys(Styles)),
};

export default styled(Button)``;
