import addHours from 'date-fns/add_hours';
import startOfMonth from 'date-fns/start_of_month';
import endOfMonth from 'date-fns/end_of_month';
import subMonths from 'date-fns/sub_months';
import addMonths from 'date-fns/add_months';
import differenceInMonths from 'date-fns/difference_in_months';
import isAfter from 'date-fns/is_after';
import isBefore from 'date-fns/is_before';
import isSameDay from 'date-fns/is_same_day';
import getHours from 'date-fns/get_hours';
import setHours from 'date-fns/set_hours';
import getMinutes from 'date-fns/get_minutes';
import subMinutes from 'date-fns/sub_minutes';
import differenceInMinutes from 'date-fns/difference_in_minutes';
import getSeconds from 'date-fns/get_seconds';
import setSeconds from 'date-fns/set_seconds';
import getMilliseconds from 'date-fns/get_milliseconds';
import setMilliseconds from 'date-fns/set_milliseconds';
import setMinutes from 'date-fns/set_minutes';
import dateFormat from 'date-fns/format';
import differenceInMilliseconds from 'date-fns/difference_in_milliseconds';
import addMilliseconds from 'date-fns/add_milliseconds';
import subMilliseconds from 'date-fns/sub_milliseconds';

// Eventually we'll get this from the server?
// https://date-fns.org/v1.28.0/docs/I18n#supported-languages
const locale = 'en';

const ISOFormat = 'YYYY-MM-DDTHH:mm:ssZ';

const format = (date, formatString) =>
    dateFormat(date, formatString, { locale });

const toISO = date => dateFormat(date, ISOFormat);

const setTime = (date, dateTime) => {
    const currentHours = getHours(dateTime);
    const currentMinutes = getMinutes(dateTime);
    const currentSeconds = getSeconds(dateTime);
    const currentMilliseconds = getMilliseconds(dateTime);
    return setHours(
        setMinutes(
            setSeconds(
                setMilliseconds(date, currentMilliseconds),
                currentSeconds
            ),
            currentMinutes
        ),
        currentHours
    );
};

const getUTCDate = (dateString = Date.now()) => {
    const date = new Date(dateString);

    return new Date(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds()
    );
};

const getUtcIso = (dateString = Date.now()) => {
    const dateTime = format(getUTCDate(dateString), 'YYYY-MM-DDTHH:mm:ss');
    return `${dateTime}+00:00`;
};

export {
    getUTCDate,
    getUtcIso,
    startOfMonth,
    subMonths,
    addMonths,
    differenceInMonths,
    toISO,
    format,
    isAfter,
    isBefore,
    endOfMonth,
    isSameDay,
    getHours,
    setHours,
    getMinutes,
    subMinutes,
    setMinutes,
    differenceInMilliseconds,
    differenceInMinutes,
    addMilliseconds,
    subMilliseconds,
    addHours,
    setTime,
};
