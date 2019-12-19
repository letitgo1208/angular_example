import React from 'react';
import { withTheme } from 'styled-components';
import { defaultProps, propTypes } from '../props';
import SVGWrapper from '../views/SVGWrapper';

const Insert = props => {
    const fillColor = () => {
        const fill = props.fill || props.theme.cbcs[4];
        if (props.isHovering) return props.hoverFill || fill;
        return fill;
    };

    return (
        <SVGWrapper defaultWidth={22} defaultHeight={17} {...props}>
            <g fill="none" fillRule="evenodd">
                <g transform="translate(10 5)">
                    <circle fill={fillColor()} cx="6" cy="6" r="6" />
                    <g transform="translate(2.5 2.5)" fill="#FFF">
                        <rect x="3" width="1" height="7" rx=".5" />
                        <rect y="3" width="7" height="1" rx=".5" />
                    </g>
                </g>
                <rect fill={fillColor()} y="15" width="10" height="2" rx="1" />
                <rect fill={fillColor()} y="10" width="8" height="2" rx="1" />
                <rect fill={fillColor()} y="5" width="10" height="2" rx="1" />
                <rect fill={fillColor()} width="20" height="2" rx="1" />
            </g>
        </SVGWrapper>
    );
};

Insert.defaultProps = defaultProps;
Insert.propTypes = propTypes;

export default withTheme(Insert);
