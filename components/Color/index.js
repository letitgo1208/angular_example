import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { prop } from 'styled-tools';
import Icon from 'components/Icon';
import { colorType } from 'utils/types';
import posed, { PoseGroup } from 'react-pose';
import { tween } from 'popmotion';
import isEmpty from 'lodash/isEmpty';

const setSize = ({ theme, size }) => theme.szb * size;

const ColorWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${setSize}rem;
    height: ${setSize}rem;
    background: ${prop('color')};
    border-radius: 50%;
    cursor: pointer;
    transition: ${prop('theme.ts.easeIn')};
    &:hover {
        transform: scale(1.15);
        box-shadow: 0 0.2rem 0.2rem 0 rgba(0, 0, 0, 0.15);
    }
`;

const Transition = posed.div({
    enter: {
        transition: props => tween({ ...props, duration: 150 }),
        opacity: 1,
        scale: 1,
    },
    exit: {
        transition: props => tween({ ...props, duration: 150 }),
        opacity: 0,
        scale: 0,
    },
});

const IconStyled = styled(Icon)`
    margin: 0 auto;
`;

const Color = props => (
    <ColorWrapper {...props}>
        <PoseGroup>
            {!isEmpty(props.iconProps) && (
                <Transition key={props.color}>
                    <IconStyled
                        {...props.iconProps}
                        width={props.size * props.iconScale}
                    />
                </Transition>
            )}
        </PoseGroup>
    </ColorWrapper>
);

Color.defaultProps = {
    showIcon: true,
    tintColor: false,
    size: 2,
    iconProps: {},
    iconScale: 0.5,
};

Color.propTypes = {
    theme: PropTypes.object.isRequired,
    size: PropTypes.number,
    iconProps: PropTypes.object,
    iconScale: PropTypes.number,
    showIcon: PropTypes.bool,
    color: colorType.isRequired,
};

export default styled(withTheme(Color))``;
