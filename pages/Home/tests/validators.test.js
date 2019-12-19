import isEqual from 'date-fns/is_equal';
import addHours from 'date-fns/add_hours';
import subHours from 'date-fns/sub_hours';

import { syncStartEnd } from '../validators';

describe('Event sync start/end date/time', () => {
    it("should change end date to the start date if the start date was changed and they're the same", () => {
        const values = {
            eventStartDateTime: new Date(),
            eventEndDateTime: new Date(),
        };
        const value = new Date(2018, 5, 1);
        const newDates = syncStartEnd({
            field: 'eventStartDateTime',
            value,
            subField: 'date',
            values,
        });

        const { eventStartDateTime, eventEndDateTime } = newDates;

        expect(isEqual(eventStartDateTime, eventEndDateTime)).toBeTruthy();
    });

    it('should change the start date to the end date if the end date was changed to be before the start', () => {
        const values = {
            eventStartDateTime: new Date(2018, 4, 20),
            eventEndDateTime: new Date(2018, 4, 20),
        };
        const value = new Date(2018, 4, 19);
        const newDates = syncStartEnd({
            field: 'eventEndDateTime',
            value,
            subField: 'date',
            values,
        });

        const { eventStartDateTime, eventEndDateTime } = newDates;

        expect(isEqual(eventStartDateTime, eventEndDateTime)).toBeTruthy();
    });

    it('should change the end date to match the start date if the start was after the end', () => {
        const values = {
            eventStartDateTime: new Date(2018, 4, 20),
            eventEndDateTime: new Date(2018, 4, 20),
        };
        const value = new Date(2018, 4, 21);
        const newDates = syncStartEnd({
            field: 'eventStartDateTime',
            value,
            subField: 'date',
            values,
        });

        const { eventStartDateTime, eventEndDateTime } = newDates;

        expect(isEqual(eventStartDateTime, eventEndDateTime)).toBeTruthy();
    });

    it('should change end time and keep duration if start time was changed after end', () => {
        const values = {
            eventStartDateTime: new Date(2018, 4, 20, 9, 30),
            eventEndDateTime: new Date(2018, 4, 20, 11, 30),
        };
        const value = new Date(2018, 4, 20, 12, 30);
        const newDates = syncStartEnd({
            field: 'eventStartDateTime',
            value,
            subField: 'time',
            values,
        });

        const { eventEndDateTime } = newDates;

        expect(isEqual(eventEndDateTime, addHours(value, 2))).toBeTruthy();
    });

    it('should change start time and keep duration if end time was changed before start', () => {
        const values = {
            eventStartDateTime: new Date(2018, 4, 20, 9, 30),
            eventEndDateTime: new Date(2018, 4, 20, 11, 30),
        };
        const value = new Date(2018, 4, 20, 8, 30);
        const newDates = syncStartEnd({
            field: 'eventEndDateTime',
            value,
            subField: 'time',
            values,
        });

        const { eventStartDateTime } = newDates;

        expect(isEqual(eventStartDateTime, subHours(value, 2))).toBeTruthy();
    });
});
