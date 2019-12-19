import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { prop } from 'styled-tools';
import { compose, withState, withHandlers } from 'recompose';
import omit from 'lodash/omit';

import { SIZES_TYPE, WIDTH_TYPE } from 'types';
import { elasticWidth } from 'utils/styles';

const padding = ({ theme, size }) => {
    const sizes = {
        sm: `${theme.szb * 0.5}rem ${theme.sp.md}`,
        md: `${theme.szb * 1}rem ${theme.sp.md}`,
        lg: `${theme.szb * 2}rem ${theme.sp.lg}`,
    };
    return sizes[size];
};

const fontSize = ({ theme, size }) => {
    const sizes = {
        sm: theme.fs.md,
        md: theme.fs.md,
        lg: theme.fs.lg,
    };
    return sizes[size];
};

const borderRadius = ({ theme, rounder }) => {
    if (!rounder) return theme.br.md;
    return theme.br.lg;
};

const ElementWrapper = styled.div`
    width: ${elasticWidth};
`;
const TextAreaWrapper = styled.textarea`
    width: 100%;
    color: ${prop('theme.cbc')};
    padding: ${padding} !important;
    font-weight: 500;
    font-size: ${fontSize} !important;
    border-radius: ${borderRadius} !important;
    background: ${prop('theme.cb')};
    border: ${prop('theme.b')} solid ${prop('theme.cbcs[2]')};
    transition: ${prop('theme.ts.easeIn')};
    outline: none;
    &&::placeholder {
        color: ${prop('theme.cbcs[5]')};
    }
    :focus {
        border: ${prop('theme.b')} solid ${prop('theme.cbcs[4]')};
    }
`;
const StatusWrapper = styled.div`
    width: 100%;
    text-align: right;
    margin-top: ${prop('theme.sp.xd')};
    font-size: ${prop('theme.fs.sm')};
    color: ${prop('theme.cbcs[5]')};
`;

const enhance = compose(
    withState(
        'remainingLength',
        'setRemainingLength',
        ({ maxLength, value }) => (maxLength || 0) - value.length
    ),
    withHandlers({
        handleKeyUp: ({ maxLength, setRemainingLength }) => e => {
            const length = e.target.value.length;

            setRemainingLength(maxLength - length);
        },
    })
);

const TextArea = props => (
    <ElementWrapper width={props.width}>
        <TextAreaWrapper
            {...omit(props, ['maxLength'])}
            {...props.maxLength && {
                maxLength: props.maxLength,
                onKeyUp: props.handleKeyUp,
            }}
        />
        {props.maxLength && (
            <StatusWrapper>
                {props.remainingLength} characters remaining
            </StatusWrapper>
        )}
    </ElementWrapper>
);

TextArea.defaultProps = {
    maxLength: false,
    rounder: false,
    size: 'md',
    width: 'auto',
};

/* eslint-disable react/no-unused-prop-types */
TextArea.propTypes = {
    maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    rounder: PropTypes.bool,
    size: SIZES_TYPE,
    width: WIDTH_TYPE,
    remainingLength: PropTypes.number.isRequired,
    setRemainingLength: PropTypes.func.isRequired,
    handleKeyUp: PropTypes.func.isRequired,
};

export default enhance(TextArea);
