import styled from 'styled-components';
import { prop } from 'styled-tools';

import { SIZES_TYPE, WIDTH_TYPE } from 'types';
import { elasticWidth } from 'utils/styles';

const fontSize = ({ theme, size }) => {
    const sizes = {
        sm: theme.fs.md,
        md: theme.fs.md,
        lg: theme.fs.lg,
    };
    return sizes[size];
};

const padding = ({ theme, size }) => {
    const sizes = {
        sm: `${theme.sp.sm} ${theme.spb * 0.3}rem ${theme.spb * 0.3}rem 0`,
        md: `${theme.spb * 4}rem ${theme.spb * 0.5}rem ${theme.spb * 0.5}rem 0`,
        lg: `${theme.sp.lg} ${theme.spb}rem ${theme.spb}rem 0`,
    };
    return sizes[size];
};

const Label = styled.label`
    display: inline-block;
    width: ${elasticWidth};
    color: ${prop('theme.cbcs[6]')};
    padding: ${padding} !important;
    font-weight: 500;
    font-size: ${fontSize} !important;
`;

Label.defaultProps = {
    size: 'md',
    width: 'auto',
};

Label.propTypes = {
    size: SIZES_TYPE,
    width: WIDTH_TYPE,
};

export default Label;
