import { setHours, setMinutes, format } from 'dateFns';
import isEqual from 'date-fns/is_equal';
import { scrollToTime } from '../BigCalendar';

describe('BigCalendar scrollToTime', () => {
    it('should return the selected date at 9am if there are no events', () => {
        const selectedDate = new Date('2018-06-01');
        const firstEventTimesByDate = {
            '2018-06-02': new Date(),
            '2018-06-03': new Date(),
        };
        const time = scrollToTime({ firstEventTimesByDate, selectedDate });
        const defaultTime = setMinutes(setHours(selectedDate, 9), 0);
        expect(isEqual(time, defaultTime)).toBeTruthy();
    });

    it('should return the selected date 60 minutes before the first event if the first event is before 9am', () => {
        const selectedDate = setMinutes(setHours('2018-06-01', 4), 30);
        const date = format(selectedDate, 'YYYY-MM-DD');
        const firstEventTimesByDate = {
            [date]: selectedDate,
            '2018-06-02': new Date(),
            '2018-06-03': new Date(),
        };
        const time = scrollToTime({ firstEventTimesByDate, selectedDate });
        const returnedTime = setMinutes(setHours(selectedDate, 3), 30);
        expect(isEqual(time, returnedTime)).toBeTruthy();
    });

    it('should return the selected date at 9am if the first event is after 9am', () => {
        const selectedDate = setMinutes(setHours('2018-06-01', 12), 30);
        const date = format(selectedDate, 'YYYY-MM-DD');
        const firstEventTimesByDate = {
            [date]: selectedDate,
            '2018-06-02': new Date(),
            '2018-06-03': new Date(),
        };
        const time = scrollToTime({ firstEventTimesByDate, selectedDate });
        const returnedTime = setMinutes(setHours(selectedDate, 9), 0);
        expect(isEqual(time, returnedTime)).toBeTruthy();
    });
});
