import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { prop } from 'styled-tools';
import capitalize from 'lodash/capitalize';

import Button from 'components/Button';
import Icon from 'components/Icon';
import H2 from 'components/H2';
import { DropdownMenu } from 'components/Popover';

const BigCalendarToolbarWrapper = styled.div`
    margin: 0 0 ${prop('theme.sp.lg')} ${prop('theme.sp.lg')};
    display: flex;
    .ant-btn {
        margin-right: ${({ theme }) => theme.spb * 0.2}rem;

        // This is the arrow for the button
        & div {
            position: relative;
            top: ${({ theme }) => theme.spb * -0.2}rem;
            margin-left: ${prop('theme.sp.xs')};
        }
    }
    & ${H2} {
        display: inline-block;
        position: relative;
        top: -0.15rem;
        margin: 0 0 0 ${prop('theme.sp.lg')};
    }
`;

const NavigateButtons = styled.div`
    position: relative;
    top: 0.1rem;
    display: inline-block;
    margin-left: ${prop('theme.sp.lg')};
`;

const NavigateButtonsFlex = styled.div`
    display: flex;
    position: relative;
    top: -0.3rem;
`;

const BigCalendarToolbar = ({
    label,
    onNavigate,
    theme,
    view,
    onViewChange,
}) => {
    const handlePrevious = () => onNavigate('PREV');
    const handleNext = () => onNavigate('NEXT');
    const handleToday = () => onNavigate('TODAY');
    const handleDayView = () => onViewChange('day');
    const handleWeekView = () => onViewChange('week');
    const handleMonthView = () => onViewChange('month');

    return (
        <BigCalendarToolbarWrapper>
            <Button variant="tertiary" onClick={handleToday}>
                Today
            </Button>
            <DropdownMenu
                items={[
                    {
                        text: 'Day',
                        onClick: handleDayView,
                    },
                    {
                        text: 'Week',
                        onClick: handleWeekView,
                    },
                    {
                        text: 'Month',
                        onClick: handleMonthView,
                    },
                ]}
            >
                <Button variant="tertiary">
                    {capitalize(view)}{' '}
                    <Icon type="arrow-down" fill={theme.cbcs[5]} />
                </Button>
            </DropdownMenu>
            <NavigateButtons>
                <NavigateButtonsFlex>
                    <Icon
                        type="arrow-left"
                        hover
                        fill={theme.cbcs[5]}
                        width={1.23}
                        height={1.92}
                        onClick={handlePrevious}
                        thickness={1}
                    />
                    <Icon
                        type="arrow-right"
                        hover
                        fill={theme.cbcs[5]}
                        width={1.23}
                        height={1.92}
                        onClick={handleNext}
                        thickness={1}
                    />
                </NavigateButtonsFlex>
            </NavigateButtons>

            <H2>{label}</H2>
        </BigCalendarToolbarWrapper>
    );
};

BigCalendarToolbar.displayName = 'BigCalendarToolbar';

BigCalendarToolbar.propTypes = {
    label: PropTypes.string.isRequired,
    onNavigate: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    onViewChange: PropTypes.func.isRequired,
    view: PropTypes.string.isRequired,
};

export default withTheme(BigCalendarToolbar);
