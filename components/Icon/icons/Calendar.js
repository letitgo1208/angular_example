import React from 'react';
import styled, { withTheme } from 'styled-components';
import { prop } from 'styled-tools';
import omit from 'lodash/omit';
import { defaultProps, propTypes } from '../props';
import SVGWrapper from '../views/SVGWrapper';

const CalendarWrapper = styled.span`
    position: relative;
`;

const Date = styled.span`
    position: absolute;
    font-size: 1.2rem;
    font-weight: 500;
    color: ${prop('theme.cp')};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -33%);
`;

const Calendar = props => {
    const propsNoClassname = omit(props, ['className']);
    const propsNoDimensions = omit(props, ['width', 'height']);
    return (
        <CalendarWrapper {...propsNoDimensions}>
            {props.date && <Date>{props.date.getDate()}</Date>}
            <SVGWrapper
                defaultWidth={22}
                defaultHeight={22}
                {...propsNoClassname}
            >
                <g
                    stroke={props.stroke || props.theme.cpc}
                    fill={props.fill || 'none'}
                    fillRule="evenodd"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M4.75 3.083H1.417v17.5h19.166v-17.5H17.25" />
                    <path d="M4.75 4.75h2.5V1.417h-2.5zM14.75 4.75h2.5V1.417h-2.5zM7.25 3.083h7.5M1.417 7.25h19.166" />
                </g>
            </SVGWrapper>
        </CalendarWrapper>
    );
};

Calendar.defaultProps = defaultProps;
Calendar.propTypes = propTypes;

export default withTheme(Calendar);
