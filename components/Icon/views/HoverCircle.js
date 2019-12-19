import styled from 'styled-components';
import { prop } from 'styled-tools';
import { colorType } from 'types';

const defaultSize = 3;

const containerBackground = props => props.hoverColor || props.theme.cbcs[2];
const containerSize = props => {
    // This will make the circle the correct height and width to cover the size of the icon
    if (props.height && props.width) {
        const difference = props.width - props.height;
        if (difference < 0) {
            return `${props.height * 2 * props.theme.szb}rem`;
        }
        return `${props.width * 2 * props.theme.szb}rem`;
    }
    return `${defaultSize * props.theme.szb}rem`;
};

const HoverCircle = styled.div`
    border-radius: 50%;
    cursor: pointer;
    transition: ${prop('theme.ts.easeIn')};
    &:hover {
        background: ${containerBackground};
    }
    width: ${containerSize};
    height: ${containerSize};
    display: flex;
    align-items: center;
`;

HoverCircle.propTypes = {
    hoverColor: colorType,
};

export default HoverCircle;
