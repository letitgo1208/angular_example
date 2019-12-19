import { constant } from 'utils/constants';
export const CHANGE_SELECTED_DATE = constant('home/CHANGE_SELECTED_DATE');
export const CALENDAR_SELECT = constant('home/CALENDAR_SELECT');
export const ON_EVENT_SELECT = constant('home/ON_EVENT_SELECT');
export const TOGGLE_EVENT_SIDEBAR = constant('home/TOGGLE_EVENT_SIDEBAR');
export const CHANGE_CALENDAR_VIEW = constant('home/CHANGE_CALENDAR_VIEW');
export const CHANGE_ACTIVE_UNSELECTED_DATE = constant(
    'home/CHANGE_ACTIVE_UNSELECTED_DATE'
);
export const CHANGE_EVENT_QUERY_PAGINATION = constant(
    'home/CHANGE_EVENT_QUERY_PAGINATION'
);

export const toggleSidebar = (payload = {}) => ({
    type: TOGGLE_EVENT_SIDEBAR,
    payload,
});

const selectEvent = (payload = {}) => ({
    type: ON_EVENT_SELECT,
    payload,
});

export const onEventSelect = payload => dispatch => {
    dispatch(selectEvent(payload));
    dispatch(toggleSidebar());
};

export const changeActiveUnselectedDate = payload => ({
    type: CHANGE_ACTIVE_UNSELECTED_DATE,
    payload,
});

export const changeSelectedDate = payload => ({
    type: CHANGE_SELECTED_DATE,
    payload,
});

export const changeEventQueryPagination = payload => ({
    type: CHANGE_EVENT_QUERY_PAGINATION,
    payload,
});

export const changeCalendarView = payload => ({
    type: CHANGE_CALENDAR_VIEW,
    payload,
});

export const calendarSelect = ({ calendar, calendars }) => ({
    type: CALENDAR_SELECT,
    payload: { calendar, calendars },
});
