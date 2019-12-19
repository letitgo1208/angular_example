import React from 'react';
import styled, { withTheme, css } from 'styled-components';
import { prop } from 'styled-tools';
import Button from 'components/Button';
import IconBase from 'components/Icon';
import Color from 'components/Color';

export const ColorStyled = styled(Color)`
    margin-right: ${prop('theme.sp.sm')};
`;

const DatePickerRow = css`
    font-weight: 500;
    font-size: ${prop('theme.fs.lg')};
`;

export const PickerAt = styled.span`
    margin: 0 0.7rem 0 0.4rem;
`;

export const PickerTo = styled.span`
    margin: 0 1.5rem 0 1.1rem;
`;

// create a row
export const EventSidebarRow = styled.div`
    display: flex;
    margin-bottom: ${({ theme }) => theme.spb * 3}rem;
    .ant-form-item {
        margin-bottom: 0;
    }
    .ant-select-selection,
    .ant-time-picker-input,
    .ant-calendar-picker-input {
        border: 0;
        position: relative;
        top: -0.2rem;
        font-weight: 500;
    }
    .ant-select-focused .ant-select-selection,
    .ant-select-selection:focus,
    .ant-select-selection:active {
        box-shadow: none;
        border: 0;
    }
    ${({ variant }) => variant === 'date-picker' && DatePickerRow};
`;

// capitalize the first letter
export const Capitalized = styled.div`
    text-transform: capitalize;
`;

export const Close = styled(IconBase)`
    position: absolute;
    right: ${prop('theme.sp.lg')};
    top: ${prop('theme.sp.lg')};
`;

export const ButtonStyled = styled(Button)`
    margin: 0 auto;
    margin-bottom: ${({ theme }) => theme.spb * 3}rem;
`;

const IconStyled = styled(IconBase)`
    margin-right: ${prop('theme.sp.lg')};
    align-self: flex-start;
`;

export const Icon = withTheme(props => (
    <IconStyled
        stroke={props.theme.cp}
        width={props.theme.szb * 2.4}
        {...props}
    />
));
