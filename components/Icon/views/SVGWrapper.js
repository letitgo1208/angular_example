import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const setWidth = ({
    theme,
    actualWidth,
    actualHeight,
    width: defaultWidth,
    height: defaultHeight,
}) => {
    const ratio = defaultWidth / defaultHeight;
    if (!actualHeight && !actualWidth) {
        // The default width is in pixels - move them to rem
        return theme.szb * (defaultWidth / 10);
    }
    if (actualHeight && !actualWidth) {
        return theme.szb * actualHeight * ratio;
    }
    return theme.szb * actualWidth;
};

const setHeight = ({
    theme,
    actualWidth,
    actualHeight,
    width: defaultWidth,
    height: defaultHeight,
}) => {
    const ratio = defaultHeight / defaultWidth;
    if (!actualHeight && !actualWidth) {
        // The default width is in pixels - move them to rem
        return theme.szb * (defaultHeight / 10);
    }
    if (!actualHeight && actualWidth) {
        return theme.szb * actualWidth * ratio;
    }
    return theme.szb * actualHeight;
};

const SVG = styled.svg`
    width: ${setWidth}rem;
    height: ${setHeight}rem;
`;

// A div wrapper is required for the svg to scale
const Wrapper = styled.span`
    width: ${setWidth}rem;
    height: ${setHeight}rem;
    z-index: 1;
`;

const SVGWrapper = ({
    children,
    width = false,
    height = false,
    defaultWidth,
    defaultHeight,
    className,
    id,
    onClick,
    onMouseEnter,
    onMouseLeave,
}) => (
    <Wrapper
        actualWidth={width}
        actualHeight={height}
        width={defaultWidth}
        height={defaultHeight}
        className={className}
        id={id}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
        <SVG
            actualWidth={width}
            actualHeight={height}
            width={defaultWidth}
            height={defaultHeight}
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 ${defaultWidth} ${defaultHeight}`}
        >
            {children}
        </SVG>
    </Wrapper>
);

/**
 * Only allow width OR height to be defined props. Because this component
 * takes care of the aspect ratio itself
 *
 * @param props
 * @param propName
 * @returns {*}
 */
const dimensionType = (props, propName) => {
    let other = 'width';
    if (propName === 'width') {
        other = 'height';
    }

    // Only need height or width not both
    if (props.height && props.width && !props.hover) {
        throw new Error(
            `If ${propName} is defined, ${other} cannot be defined in ${
                props.type
            }. This component takes care of aspect ratio itself.`
        );
    }

    // If hover - need both height and width
    if ((!props.height || !props.width) && props.hover) {
        throw new Error(
            `In the icon "${
                props.type
            }", the hover prop is defined, so both height and width must be defined. Keep in mind that they must be the correct aspect ratio to make scaling accurate.`
        );
    }

    // If hover - make sure height and width are same aspect ratio
    if (props.hover && props.height && props.width) {
        const ratio = props.defaultWidth / props.defaultHeight;
        const correctWidth = (props.height * ratio).toFixed(3);
        // This is probablly not right? My head isn't working with when this
        // should multiply and when it should divide - Fix this next time this
        // comes up
        const correctHeight = (props.width / ratio).toFixed(3);
        const correctRatioDifference = ratio - props.width / props.height;
        if (correctRatioDifference > 0.01) {
            throw new Error(
                `The height and width you specified in the "${
                    props.type
                }" icon are not in the correct aspect ratio and will not scale correctly. Change your width to ${correctWidth} or your height to ${correctHeight}.`
            );
        }
    }
    return null;
};

SVGWrapper.defaultProps = {
    className: '',
    width: false,
    height: false,
    id: undefined,
    onClick: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
};

SVGWrapper.propTypes = {
    children: PropTypes.node.isRequired,
    defaultWidth: PropTypes.number.isRequired,
    defaultHeight: PropTypes.number.isRequired,
    width: PropTypes.oneOfType([dimensionType, PropTypes.bool]),
    height: PropTypes.oneOfType([dimensionType, PropTypes.bool]),
    className: PropTypes.string,
    id: PropTypes.string,
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
};

SVGWrapper.displayName = 'SVGWrapper';

export default SVGWrapper;
