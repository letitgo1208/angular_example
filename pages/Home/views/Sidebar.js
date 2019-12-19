import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { prop } from 'styled-tools';
import PerfectScrollbar from 'react-perfect-scrollbar';

import SmallCalendar from './SmallCalendar';
import CalendarPicker from './CalendarPicker';
import AddCalendar from './AddCalendar';
import { CALENDARS_PROP_TYPES } from '../types';

const SidebarWrapper = styled.div`
    margin-left: ${prop('theme.sp.sm')};
    margin-bottom: ${prop('theme.sp.lg')};
`;

const Sidebar = ({
    onCalendarSelect,
    calendars,
    selectedDate,
    calendarsSelected,
    onSelectedDateChange,
    changeActiveUnselectedDate,
    activeUnselectedDate,
    fetchMore,
}) => (
    <PerfectScrollbar>
        <SidebarWrapper>
            <SmallCalendar
                selectedDate={selectedDate}
                onSelectedDateChange={onSelectedDateChange}
                calendarsSelected={calendarsSelected}
                calendars={calendars}
                fetchMore={fetchMore}
                changeActiveUnselectedDate={changeActiveUnselectedDate}
                activeUnselectedDate={activeUnselectedDate}
            />
            <AddCalendar calendars={calendars} />
            <CalendarPicker
                calendarsSelected={calendarsSelected}
                onCalendarSelect={onCalendarSelect}
                calendars={calendars}
            />
        </SidebarWrapper>
    </PerfectScrollbar>
);

Sidebar.propTypes = {
    calendars: CALENDARS_PROP_TYPES.isRequired,
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    calendarsSelected: PropTypes.object.isRequired,
    onCalendarSelect: PropTypes.func.isRequired,
    onSelectedDateChange: PropTypes.func.isRequired,
    fetchMore: PropTypes.func.isRequired,
    changeActiveUnselectedDate: PropTypes.func.isRequired,
    activeUnselectedDate: PropTypes.instanceOf(Date).isRequired,
};

export default Sidebar;
