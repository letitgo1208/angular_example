import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, withTheme } from 'styled-components';
import { prop } from 'styled-tools';
import AutosizeInput from 'react-input-autosize';
import omit from 'lodash/omit';
import { rgba } from 'polished';

import { SIZES_TYPE, WIDTH_TYPE } from 'types';
import { OPTIONS_TYPE } from 'components/Form/types';
import { elasticWidth } from 'utils/styles';

const height = ({ theme, size }) => {
    const sizes = {
        sm: `${theme.szb * 3.5}rem`,
        md: `${theme.szb * 4.5}rem`,
        lg: `${theme.szb * 6}rem`,
    };
    return sizes[size];
};

const padding = ({ theme, size }) => {
    const sizes = {
        sm: `${theme.spb * 0.1}rem 0 0 ${theme.sp.md}`,
        md: `0 0 0 ${theme.sp.md}`,
        lg: `${theme.sp.lg} ${theme.sp.lg}`,
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

const InputDefault = css`
    && {
        width: ${elasticWidth};
        color: ${prop('theme.cbc')};
        height: ${height};
        padding: ${padding};
        font-weight: 500;
        font-size: ${fontSize};
        border-radius: ${prop('theme.br.lg')};
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
    }
`;

const InputEventSidebarAssociation = css`
    ${InputDefault};
    && {
        font-size: ${prop('theme.fs.lg')};
    }
`;

const InputInline = css`
    && {
        height: ${({ theme }) => theme.fsb * 2.5}rem;
        border: 0;
        font-weight: ${({ fontWeight }) => fontWeight || 500};
        padding-left: 0;
        outline: none;

        :focus {
            box-shadow: none;
            border: 0;
        }
        ::placeholder {
            color: ${prop('theme.cbcs[4]')};
            opacity: 1;
        }
    }
`;

const eventSidebarPickerUnderlineColor = ({ theme }) => rgba(theme.cp, 0.2);

const InputEventSidebarPicker = css`
    ${InputInline};
    font-weight: 700;
    height: ${({ theme }) => theme.szb * 1.8}rem;
    border-bottom: ${prop('theme.b')} solid ${eventSidebarPickerUnderlineColor};
`;

const InputTitle = css`
    ${InputInline};
    && {
        height: ${({ theme }) => theme.fsb * 3.7}rem;
        font-size: ${({ theme }) => theme.fsb * 3.2}rem;
        width: 100%;
    }
`;

const variants = {
    default: InputDefault,
    title: InputTitle,
    inline: InputInline,
    eventSidebarPicker: InputEventSidebarPicker,
    eventSidebarAssociation: InputEventSidebarAssociation,
};

const VARIANTS_TYPE = PropTypes.oneOf(Object.keys(variants));

const InputType = ({ variant }) => variants[variant];

const InputNormal = styled.input`
    ${InputType};
`;

const InputAuto = styled(AutosizeInput)`
    && {
        > input {
            ${InputType};
        }
    }
`;

const InputBase = props => {
    const passedProps = omit(props, [
        'autoSize',
        'errorMessage',
        'styleProps',
        'renderInlineIcon',
    ]);

    if (props.autoSize) {
        return <InputAuto {...passedProps} />;
    }

    return <InputNormal {...passedProps} />;
};

InputBase.defaultProps = {
    variant: 'default',
    size: 'lg',
    width: 'auto',
    autoSize: false,
    innerRef: React.createRef(),
    renderInlineIcon: false,
    tags: [],
};

InputBase.propTypes = {
    variant: VARIANTS_TYPE,
    size: SIZES_TYPE,
    width: WIDTH_TYPE,
    autoSize: PropTypes.bool,
    innerRef: PropTypes.object,
    renderInlineIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
    theme: PropTypes.object.isRequired,
    tags: OPTIONS_TYPE,
};

export default withTheme(InputBase);
