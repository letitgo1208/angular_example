/**
 * This must return an HTML valid ID so it cannot begin with a number
 * it's a requirement that the id match in the target and trigger for reactstrap
 *
 * @returns {string}
 */
export const getRandomId = () =>
    Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')
        .substr(2, 10);

export const getOptimisticId = () => Math.round(Math.random() * -1000000);

/**
 * This transforms every letter of a string to lower-case except the first one. (sentence)
 *
 * @returns {string}
 */
export const prettySentence = str =>
    str.charAt(0).toUpperCase() + str.toLowerCase().substring(1, str.length);
