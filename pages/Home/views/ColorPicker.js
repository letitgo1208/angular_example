import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, withTheme } from 'styled-components';
import { prop } from 'styled-tools';
import { colorType } from 'utils/types';
import Color from 'components/Color';

export const selectableColors = Object.freeze([
    '#EF9A9A',
    '#F16191',
    '#BA67C8',
    '#9574CE',
    '#7985CB',
    '#63B5F7',
    '#4EC3F7',
    '#4BD1E1',
    '#4DB6AC',
    '#81C884',
    '#AFD581',
    '#DDE775',
    '#FFF276',
    '#FFD54F',
    '#FFB74C',
    '#FF8965',
    '#A0887F',
    '#E0E0E0',
    '#90A3AE',
    '#536E79',
]);

const Column = css`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: ${({ theme }) => theme.szb * 12}rem;
    width: ${({ theme }) => theme.szb * 15}rem;
    margin: -${prop('theme.sp.xs')};
`;

const Row = css`
    display: flex;
    flex-wrap: wrap;
    width: ${({ theme }) => theme.szb * 30}rem;
    margin-left: -${prop('theme.sp.xs')};
    margin-bottom: ${prop('theme.sp.lg')};
`;

const ColorPickerWrapper = styled.div`
    ${({ alignment }) => (alignment === 'column' ? Column : Row)};
`;

const ColorStyled = Color.extend`
    margin: ${prop('theme.sp.xs')};
`;

const ColorPicker = ({
    alignment,
    selectedColor,
    setSelectedColor,
    handleClick,
    theme,
}) => (
    <ColorPickerWrapper alignment={alignment}>
        {selectableColors.map(color => (
            <ColorStyled
                key={`color-picker-${color}`}
                onClick={() => {
                    if (selectedColor) setSelectedColor(color);
                    handleClick(color);
                }}
                color={color}
                iconProps={
                    color === selectedColor
                        ? {
                              type: 'check',
                              fill: theme.cc(color),
                          }
                        : {}
                }
                iconScale={0.6}
            />
        ))}
    </ColorPickerWrapper>
);

ColorPicker.defaultProps = {
    alignment: 'column',
    selectedColor: false,
    handleClick: () => {},
    setSelectedColor: () => {},
};

ColorPicker.propTypes = {
    alignment: PropTypes.oneOf(['column', 'row']),
    selectedColor: PropTypes.oneOfType([colorType, PropTypes.bool]),
    setSelectedColor: PropTypes.func,
    handleClick: PropTypes.func,
    theme: PropTypes.object.isRequired,
};
ColorPicker.displayName = 'ColorPicker';

export default withTheme(ColorPicker);
