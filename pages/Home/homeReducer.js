/* eslint-disable no-param-reassign, default-case, consistent-return */

import produce from 'immer';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import { eventQueryPaginationStartEnd } from './views/EventsQuery';

import {
    routeToDefault,
    routeToView,
    routeToAll,
    getAndValidateRouteVariables,
} from './utils';

import {
    CHANGE_SELECTED_DATE,
    CALENDAR_SELECT,
    ON_EVENT_SELECT,
    TOGGLE_EVENT_SIDEBAR,
    CHANGE_CALENDAR_VIEW,
    CHANGE_EVENT_QUERY_PAGINATION,
    CHANGE_ACTIVE_UNSELECTED_DATE,
} from './actions';

const { initialDate, initialView } = getAndValidateRouteVariables();

const initialState = {
    selectedDate: initialDate,
    selectedEvent: {},
    showEventSidebar: false,
    calendarsSelected: {},
    eventQueryPaginationStartEnd: eventQueryPaginationStartEnd(initialDate),
    calendarView: initialView,
    activeUnselectedDate: initialDate,
};

/**
 * Check if the selectedDate isToday or not
 * @param selectedDate
 * @returns {boolean}
 */
const isToday = selectedDate => {
    const currentDateString = moment(new Date()).format('YYYYMMDD');
    const selectedDateString = moment(selectedDate).format('YYYYMMDD');
    return selectedDateString === currentDateString;
};

/**
 * This doesn't actually use react router - just a makeshift solution so
 * we aren't actually remounting everything
 * @param date
 */
const changeRouteDate = date => {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const day = date.getDate();

    let view = 'month';
    if (window.location.href.indexOf('calendar/') !== -1) {
        const params = window.location.href.split('calendar/')[1].split('/');
        view = params[0];
    }

    if (isToday(date) && view === 'month') {
        routeToDefault();
        return;
    }
    if (isToday(date) && view !== 'month') {
        routeToView(view);
        return;
    }

    routeToAll(view, year, month, day);
};

const changeRouteView = view => {
    if (window.location.href.indexOf('calendar/') !== -1) {
        const params = window.location.href.split('calendar/')[1].split('/');
        if (typeof params[1] !== 'undefined') {
            params.shift();
            const date = new Date(params.join('-'));
            if (date) {
                window.history.replaceState(
                    { date },
                    'Calendars',
                    `/calendar/${view}/${params.join('/')}`
                );
                return;
            }
        }
    }
    window.history.replaceState(
        { date: false },
        'Calendars',
        `/calendar/${view}`
    );
};

const homeReducer = produce((state, { type, payload }) => {
    switch (type) {
        case CHANGE_CALENDAR_VIEW:
            state.calendarView = payload;
            changeRouteView(payload);
            return;
        case CHANGE_SELECTED_DATE:
            state.selectedDate = payload;
            state.activeUnselectedDate = payload;
            changeRouteDate(payload);
            return;
        case CHANGE_ACTIVE_UNSELECTED_DATE:
            state.activeUnselectedDate = payload;
            return;
        case CALENDAR_SELECT:
            // All calendars are selected
            if (isEmpty(state.calendarsSelected)) {
                payload.calendars.forEach(calendarItem => {
                    state.calendarsSelected[calendarItem.id] = true;
                });
            }
            state.calendarsSelected[payload.calendar.id] = !state
                .calendarsSelected[payload.calendar.id];
            return;
        case ON_EVENT_SELECT:
            state.selectedEvent = payload;
            return;
        case CHANGE_EVENT_QUERY_PAGINATION:
            state.eventQueryPaginationStartEnd = payload;
            return;
        case TOGGLE_EVENT_SIDEBAR:
            return {
                ...state,
                ...payload,
                showEventSidebar: !state.showEventSidebar,
                selectedEvent: state.showEventSidebar
                    ? {}
                    : state.selectedEvent,
            };
    }
}, initialState);

export default homeReducer;
