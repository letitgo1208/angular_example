import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { compose } from 'recompose';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { SidebarLayout } from 'components/Layout';
import SidebarPopout from 'components/SidebarPopout';
import LoadingIndicator from 'components/LoadingIndicator';

import EventsQuery from './views/EventsQuery';
import EventAssociationQueries from './views/EventAssociationQueries';
import SmallCalendarSidebar from './views/Sidebar';
import BigCalendar from './views/BigCalendar';
import EventSidebar from './views/EventSidebar';
import * as actions from './actions';
import { CALENDAR_VIEWS } from './types';

// TODO: This is just temporary so we know that something is loading - ideally things are loading in the background and the end user never knows
const EventLoaderIcon = styled(LoadingIndicator)`
    position: absolute;
    top: 10rem;
    right: 5rem;
`;

const mapStateToProps = state => state.home;

const mapDispatchToProps = dispatch => ({
    toggleSidebar: (defaults = {}) => dispatch(actions.toggleSidebar(defaults)),
    onEventSelect: selectedEvent =>
        dispatch(actions.onEventSelect(selectedEvent)),
    calendarSelect: ({ calendar, calendars }) =>
        dispatch(actions.calendarSelect({ calendar, calendars })),
    changeSelectedDate: newlySelectedDate =>
        dispatch(actions.changeSelectedDate(newlySelectedDate)),
    changeCalendarView: view => dispatch(actions.changeCalendarView(view)),
    changePaginationStartEnd: eventPaginationStartEnd =>
        dispatch(actions.changeEventQueryPagination(eventPaginationStartEnd)),
    changeActiveUnselectedDate: date =>
        dispatch(actions.changeActiveUnselectedDate(date)),
    dispatch,
});

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
);

const Home = ({
    selectedDate,
    calendarsSelected,
    showEventSidebar,
    selectedEvent,
    calendarSelect,
    changeSelectedDate,
    onEventSelect,
    toggleSidebar,
    changeActiveUnselectedDate,
    activeUnselectedDate,
    changePaginationStartEnd,
    eventQueryPaginationStartEnd,
    calendarView,
    changeCalendarView,
}) => (
    <EventsQuery
        changePaginationStartEnd={changePaginationStartEnd}
        paginationStartEnd={eventQueryPaginationStartEnd}
        selectedDate={selectedDate}
    >
        {({ loading, error, calendars, events, fetchMore }) => {
            const handleDateChange = date => {
                changeSelectedDate(date);
                fetchMore(date);
            };
            return (
                <SidebarLayout
                    sidebar={
                        <SmallCalendarSidebar
                            calendars={calendars}
                            events={events}
                            selectedDate={selectedDate}
                            calendarsSelected={calendarsSelected}
                            onCalendarSelect={calendarSelect}
                            onSelectedDateChange={handleDateChange}
                            fetchMore={fetchMore}
                            changeActiveUnselectedDate={
                                changeActiveUnselectedDate
                            }
                            activeUnselectedDate={activeUnselectedDate}
                        />
                    }
                >
                    {error && <p>{error.message}</p>}
                    {loading && events.length === 0 && <EventLoaderIcon />}
                    {!error && (
                        <BigCalendar
                            onEventSelect={onEventSelect}
                            events={events}
                            selectedDate={selectedDate}
                            onSelectedDateChange={handleDateChange}
                            toggleEventSidebar={toggleSidebar}
                            calendars={calendars}
                            calendarsSelected={calendarsSelected}
                            calendarView={calendarView}
                            handleChangeCalendarView={changeCalendarView}
                        />
                    )}
                    <EventAssociationQueries>
                        {({ flows, forms }) => (
                            <SidebarPopout
                                isOpen={showEventSidebar}
                                handleClose={() => toggleSidebar()}
                            >
                                {({ isSidebarTransitionFinished }) => (
                                    <EventSidebar
                                        flows={flows}
                                        forms={forms}
                                        selectedDate={selectedDate}
                                        selectedEvent={selectedEvent}
                                        toggleEventSidebar={toggleSidebar}
                                        calendars={calendars}
                                        isSidebarTransitionFinished={
                                            isSidebarTransitionFinished
                                        }
                                    />
                                )}
                            </SidebarPopout>
                        )}
                    </EventAssociationQueries>
                </SidebarLayout>
            );
        }}
    </EventsQuery>
);

Home.defaultProps = {
    calendarView: 'month',
};

Home.propTypes = {
    toggleSidebar: PropTypes.func.isRequired,
    changeSelectedDate: PropTypes.func.isRequired,
    calendarSelect: PropTypes.func.isRequired,
    onEventSelect: PropTypes.func.isRequired,
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    calendarsSelected: PropTypes.object.isRequired,
    showEventSidebar: PropTypes.bool.isRequired,
    selectedEvent: PropTypes.object.isRequired,
    changeActiveUnselectedDate: PropTypes.func.isRequired,
    activeUnselectedDate: PropTypes.instanceOf(Date).isRequired,
    eventQueryPaginationStartEnd: PropTypes.shape({
        viewerCalendarStart: PropTypes.string,
        viewerCalendarEnd: PropTypes.string,
    }).isRequired,
    changePaginationStartEnd: PropTypes.func.isRequired,
    calendarView: CALENDAR_VIEWS,
    changeCalendarView: PropTypes.func.isRequired,
};

export default enhance(Home);
