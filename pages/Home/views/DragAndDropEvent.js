import PropTypes from 'prop-types';
import { toISO } from 'dateFns';

const updateEventStartEnd = ({ event, start, end }) => ({
    variables: {
        id: event.id,
        effects: 'SINGLE',
        input: {
            eventStartDateTime: toISO(start),
            eventEndDateTime: toISO(end),
        },
    },
    optimisticResponse: {
        updateEvent: {
            ...event,
            start: toISO(start),
            end: toISO(end),
        },
    },
});

const DragAndDropEvent = ({ children, updateEvent }) => {
    const moveEvent = ({ event, start, end }) => {
        updateEvent(updateEventStartEnd({ event, start, end }));
    };

    const resizeEvent = (resizeType, { event, start, end }) => {
        updateEvent(updateEventStartEnd({ event, start, end }));
    };

    return children({ moveEvent, resizeEvent });
};

DragAndDropEvent.propTypes = {
    updateEvent: PropTypes.func.isRequired,
};

export default DragAndDropEvent;
