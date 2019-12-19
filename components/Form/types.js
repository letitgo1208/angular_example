import PropTypes from 'prop-types';

export const OPTIONS_TYPE = PropTypes.arrayOf(
    PropTypes.shape({
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        category: PropTypes.string,
    })
).isRequired;
