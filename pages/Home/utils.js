import { calendarViewTypes } from './views/BigCalendar';

export const routeToDefault = () => {
    window.history.replaceState({ date: new Date() }, 'Calendar', '/calendar');
};

export const routeToView = view => {
    window.history.replaceState(
        { date: new Date() },
        'Calendar',
        `/calendar/${view}`
    );
};

export const routeToAll = (view, year, month, day) => {
    const date = new Date(`${year}-${month}-${day}`);

    window.history.replaceState(
        { date },
        'Calendars',
        `/calendar/${view}/${year}/${month}/${day}`
    );
};

/**
 * If some of the data in the route is not the way we want it - then we need to route them
 * back to a valid route
 *
 * @param validDate
 * @param validView
 * @param view
 * @param dateExists
 */
const validateRoute = ({ validDate, validView, view, dateExists }) => {
    if ((!validView && validDate) || (!validView && !validDate)) {
        routeToDefault();
    }
    if (!validDate && dateExists && validView) {
        routeToView(view);
    }
    return true;
};

/**
 * This will return the values for the selected date and the selected view, based on the route
 * We're purposely not using react router - because react router would cause everything to re-mount
 * whenever there was a date or view change. That seems excessive - There are also two sources of
 * truth here. Redux and the URL. Can't get rid of redux because then components won't update
 * when they are supposed to. Can't get rid of URL because that's what handles routes. Necessary evil?
 */
export const getAndValidateRouteVariables = () => {
    let date = new Date();
    let selectedView = 'month';
    if (window.location.href.indexOf('calendar/') !== -1) {
        const params = window.location.href.split('calendar/')[1].split('/');
        const [view, year, month, day] = params;
        const selectedDate = new Date(`${year}-${month}-${day}`);

        const validDate = !isNaN(selectedDate.getTime());
        const validView = calendarViewTypes.includes(view);
        const dateExists = params[1] !== 'undefined';

        validateRoute({ validDate, validView, view, dateExists });

        if (validDate && validView) {
            date = selectedDate;
        }
        if (validView) {
            selectedView = view;
        }
    }
    return { initialDate: date, initialView: selectedView };
};
