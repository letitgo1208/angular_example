import yup from 'yup';
import {
    isSameDay,
    setMinutes,
    setHours,
    getHours,
    getMinutes,
    isBefore,
    differenceInMilliseconds,
    addMilliseconds,
    subMilliseconds,
} from 'dateFns';

import logger from 'utils/logger';

export const eventSchema = yup.object().shape({
    eventName: yup.string().required(),
    eventOccurrence: yup
        .string()
        .required()
        .oneOf([
            'NO_REPEAT',
            'DAILY',
            'WEEKLY',
            'MONTHLY',
            'ANUALLY',
            'CUSTOM',
        ]),
    eventState: yup
        .string()
        .required()
        .oneOf(['BUSY', 'AVAILABLE']),
    eventStartDateTime: yup.date().required(),
    eventEndDateTime: yup.date().required(),
    occurrence: yup.object().shape({
        eventInterval: yup
            .number()
            .required()
            .positive()
            .integer(),
        eventIntervalTimeFrame: yup
            .string()
            .required()
            .oneOf(['DAYS', 'WEEKS', 'MONTHS', 'YEARS']),
        eventRepeatOn: yup
            .array()
            .of(
                yup
                    .string()
                    .oneOf([
                        'SUNDAY',
                        'MONDAY',
                        'TUESDAY',
                        'WEDNESDAY',
                        'THURSDAY',
                        'FRIDAY',
                        'SATURDAY',
                    ])
            ),
        eventEnds: yup
            .string()
            .required()
            .oneOf(['AFTER', 'ON', 'NEVER']),
        eventOn: yup.date().required(),
        eventAfter: yup
            .number()
            .required()
            .positive()
            .integer(),
    }),
});

/**
 * Make sure the start and end date and start and end time sync correctly, so users can't do
 * things like set the end date before the start date
 *
 * @param field
 * @param value
 * @param subField
 * @param values
 * @returns {*}
 */
export const syncStartEnd = ({ field, value, subField, values }) => {
    try {
        if (field === 'eventStartDateTime' || field === 'eventEndDateTime') {
            const currentStart = values.eventStartDateTime;
            const currentEnd = values.eventEndDateTime;

            let newStart =
                field === 'eventStartDateTime' ? value : currentStart;
            let newEnd = field === 'eventEndDateTime' ? value : currentEnd;

            // We're changing the date, if we fix anything w/ date keep time the same
            if (subField === 'date') {
                if (
                    isSameDay(currentStart, currentEnd) &&
                    field === 'eventStartDateTime'
                ) {
                    // Start and end the same, changing the start date should change end to match
                    newEnd = setMinutes(
                        setHours(newStart, getHours(currentEnd)),
                        getMinutes(currentEnd)
                    );
                } else if (
                    isBefore(newEnd, newStart) &&
                    field === 'eventEndDateTime'
                ) {
                    // End changed to be before start, don't let that happen - change start to match end
                    newStart = setMinutes(
                        setHours(newEnd, getHours(currentStart)),
                        getMinutes(currentStart)
                    );
                } else if (
                    isBefore(newEnd, newStart) &&
                    field === 'eventStartDateTime'
                ) {
                    // Start changed to be after end, don't let that happen - change end to match start
                    newEnd = setMinutes(
                        setHours(newStart, getHours(currentEnd)),
                        getMinutes(currentEnd)
                    );
                }
            }

            if (subField === 'time') {
                // Start time is after end on the same day, fix it!
                //  (if this was solely an issue w/ date it should be fixed when the dates changed above)
                if (
                    isSameDay(currentStart, currentEnd) &&
                    isBefore(newEnd, newStart)
                ) {
                    let originalDifference = differenceInMilliseconds(
                        currentEnd,
                        currentStart
                    );
                    if (originalDifference < 0) {
                        // Something messed up, end isn't after start, reset to an hour difference
                        const oneHourInMilliseconds = 60 * 60 * 1000;
                        originalDifference = oneHourInMilliseconds;
                    }

                    if (field === 'eventStartDateTime') {
                        // Start was changed to be after end - change end to be after start w/ same duration
                        newEnd = addMilliseconds(newStart, originalDifference);
                    } else if (field === 'eventEndDateTime') {
                        // End was changed to be before start - change start to be before end w/ same duration
                        newStart = subMilliseconds(newEnd, originalDifference);
                    }
                }
            }

            return {
                eventStartDateTime: newStart,
                eventEndDateTime: newEnd,
            };
        }
        return false;
    } catch (err) {
        return logger.log('unable to set the new time', err);
    }
};
