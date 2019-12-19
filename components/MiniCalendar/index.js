import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { prop } from 'styled-tools';
import Calendar from 'react-calendar/dist/entry.nostyle';
import moment from 'moment';
import Icon from 'components/Icon';
import Tooltip from 'components/Tooltip';

import MiniCalendarWrapper from './views/MiniCalendarWrapper';
import MiniCalendarHover from './views/MiniCalendarHover';

export { MiniCalendarHover };

const formatShortWeekday = value =>
    moment(value)
        .format('dd')
        .charAt(0);

const renderTileContent = (tileContent, tileContentProps) => {
    if (!tileContent && tileContentProps.view === 'month') {
        return <MiniCalendarHover date={tileContentProps.date} />;
    }
    if (!tileContent && tileContentProps.view !== 'month') return null;
    if (tileContent) {
        return tileContent(tileContentProps);
    }
    return null;
};

const IconStyled = styled(Icon)`
    margin-top: ${prop('theme.sp.xs')};
`;

const Label = styled.span`
    &:hover ~ .react-calendar__navigation__label__arrow > ${IconStyled} {
        background: ${prop('theme.cbcs[2]')};
    }
`;

const MiniCalendar = ({
    theme,
    onSelectedDateChange,
    selectedDate,
    firstDayOfWeek,
    tileContent,
    ...calendarProps
}) => (
    <MiniCalendarWrapper>
        <Calendar
            {...calendarProps}
            tileContent={tileContentProps =>
                renderTileContent(tileContent, tileContentProps)
            }
            formatShortWeekday={formatShortWeekday}
            onChange={onSelectedDateChange}
            value={selectedDate}
            minDetail="year"
            navigationLabel={({ label, view }) => (
                <Fragment>
                    <Label>{label}</Label>
                    <div className="react-calendar__navigation__label__arrow">
                        {view === 'month' && (
                            <IconStyled
                                type="arrow-down"
                                fill={theme.cbcs[5]}
                                hover
                                width={1}
                                height={0.545}
                            />
                        )}
                    </div>
                </Fragment>
            )}
            // Change calendarType to "ISO 8601" to change first day of the week to Sunday
            calendarType={firstDayOfWeek === 0 ? 'US' : 'ISO 8601'}
            nextLabel={
                <Tooltip overlay="Next Month" delay={500} hideDelay={0}>
                    <Icon
                        type="arrow-right"
                        fill={theme.cbcs[5]}
                        hover
                        width={0.7}
                        height={1.1}
                    />
                </Tooltip>
            }
            prevLabel={
                <Tooltip overlay="Last Month" delay={500} hideDelay={0}>
                    <Icon
                        type="arrow-left"
                        fill={theme.cbcs[5]}
                        hover
                        width={0.7}
                        height={1.1}
                    />
                </Tooltip>
            }
        />
    </MiniCalendarWrapper>
);

MiniCalendar.defaultProps = {
    tileContent: false,
};

MiniCalendar.propTypes = {
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    onSelectedDateChange: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    firstDayOfWeek: PropTypes.oneOf([0, 1]).isRequired,
    tileContent: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
};

export default withTheme(MiniCalendar);
