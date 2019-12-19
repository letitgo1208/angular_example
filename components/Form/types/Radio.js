import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { prop } from 'styled-tools';

const Checkmark = styled.div`
    background: ${prop('theme.cb')};
    border: 2px solid ${prop('theme.cbcs[3]')};
    width: ${prop('size')}rem;
    height: ${prop('size')}rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    flex-direction: column;
    transition: ${prop('theme.ts.easeIn')};
    &:after {
        content: '';
        opacity: 0;
        transition: ${prop('theme.ts.easeIn')};
    }
`;

const Wrapper = styled.div`
    display: block;
    position: relative;
    cursor: pointer;
    user-select: none;
    &:hover ${Checkmark} {
        background: ${prop('theme.cbcs[1]')};
    }
    & input:checked ~ ${Checkmark} {
        border: 2px solid ${prop('theme.cp')};
    }
    & input:checked ~ ${Checkmark}:after {
        background: ${prop('theme.cp')};
        border-radius: 50%;
        width: ${({ size }) => size / 2}rem;
        height: ${({ size }) => size / 2}rem;
        display: block;
        opacity: 1;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
`;

const Checkbox = styled.input.attrs({
    type: 'radio',
})`
    position: absolute;
    opacity: 0;
    width: ${prop('size')}rem;
    height: ${prop('size')}rem;
    cursor: pointer;
`;

const Radio = props => (
    <Wrapper size={props.size}>
        <Checkbox {...props} />
        <Checkmark size={props.size} />
    </Wrapper>
);

Radio.defaultProps = {
    size: 2,
};

Radio.propTypes = {
    size: PropTypes.number,
};

export default Radio;
