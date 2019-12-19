/* eslint-disable func-names, no-console, prefer-rest-params */
/**
 * This file overrides some console errors/warnings that we don't want to see. Some packages will throw some warnings
 * that just lead to error blindness. They aren't needed and we can't get rid of them. If that's the case get rid of
 * them here.
 */

const popperErrors = error => {
    if (typeof error === 'string') {
        const receivedFalse =
            error.indexOf(
                'Warning: Received `false` for a non-boolean attribute'
            ) === -1;
        const doesNotRecognize =
            error.indexOf('Warning: React does not recognize the ') === -1;
        const invalidProp =
            error.indexOf('Warning: Invalid value for prop') === -1;
        const isPopper = error.indexOf('in Popper') !== -1;
        return (receivedFalse || doesNotRecognize || invalidProp) && isPopper;
    }
    return false;
};

/**
 * react-clock prop-type errors that don't matter. I created a PR that was merged in to get
 * rid of them, but he hasn't updated the version yet - TODO: remove when react-clock updates version
 * @param error
 * @returns {boolean}
 */
const clockErrors = error => {
    if (typeof error === 'string') {
        const oppositeLength =
            error.indexOf('OppositeLength') !== -1 ||
            error.indexOf('oppositeLength') !== -1;
        const isReactClock = error.indexOf('in Clock') !== -1;
        return oppositeLength && isReactClock;
    }
    return false;
};

(function() {
    const { error } = console;

    console.error = function() {
        if (popperErrors(arguments[0])) return;
        if (clockErrors(arguments[0])) return;
        error.apply(console, arguments);
    };
})();
