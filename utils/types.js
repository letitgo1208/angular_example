import PropTypes from 'prop-types';
import color from 'extended-proptypes/lib/validators/color';
import emailAddress from 'extended-proptypes/lib/validators/emailAddress';

/**
 *
 * @param {Object} extra props that this
 */
export const gqlType = (extra = {}) =>
    PropTypes.shape({
        ...extra,
        error: PropTypes.shape({
            message: PropTypes.string.isRequired,
        }),
        loading: PropTypes.bool.isRequired,
    });

/**
 * Either a hex or rgb color
 */
export const colorType = color;
export const emailType = emailAddress;
export const SIZES_TYPE = PropTypes.oneOf(['sm', 'md', 'lg']);
export const WIDTH_TYPE = PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
]);
