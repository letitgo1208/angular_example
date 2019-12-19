import {
    selectGlobal,
    makeSelectLoading,
    makeSelectLocation,
} from '../selectors';

describe('selectGlobal', () => {
    it('should select the global state', () => {
        const globalState = {};
        const mockedState = {
            global: globalState,
        };
        expect(selectGlobal(mockedState)).toEqual(globalState);
    });
});

describe('makeSelectLoading', () => {
    const loadingSelector = makeSelectLoading();
    it('should select the loading', () => {
        const loading = false;
        const mockedState = {
            global: {
                loading,
            },
        };
        expect(loadingSelector(mockedState)).toEqual(loading);
    });
});

describe('makeSelectLocation', () => {
    const locationStateSelector = makeSelectLocation();
    it('should select the location', () => {
        const route = {
            location: { pathname: '/foo' },
        };
        const mockedState = {
            route,
        };
        expect(locationStateSelector(mockedState)).toEqual(route.location);
    });
});
