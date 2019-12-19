import PropTypes from 'prop-types';
import { emailType } from 'utils/types';

export const EVENT_PROP_TYPES = PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    start: PropTypes.instanceOf(Date).isRequired,
    end: PropTypes.instanceOf(Date).isRequired,
    color: PropTypes.string,
});

export const EVENTS_PROP_TYPES = PropTypes.arrayOf(EVENT_PROP_TYPES);

export const CALENDAR_PROP_TYPES = PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    allDay: PropTypes.bool,
});

export const CALENDARS_PROP_TYPES = PropTypes.arrayOf(CALENDAR_PROP_TYPES);

export const PERSON_PROP_TYPES = PropTypes.shape({
    id: PropTypes.number,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: emailType,
    image: PropTypes.string,
});

export const PEOPLE_PROP_TYPES = PropTypes.arrayOf(PERSON_PROP_TYPES);

export const CALENDAR_VIEWS = PropTypes.oneOf(['month', 'week', 'day']);

export const ASSOCIATIONS = PropTypes.oneOf(['people', 'forms', 'flows']);
