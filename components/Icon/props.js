import PropTypes from 'prop-types';
import { colorType } from 'types';

const defaultProps = {
    width: false,
    height: false,
};

const propTypes = {
    theme: PropTypes.object,
    fill: PropTypes.oneOfType([colorType, PropTypes.oneOf(['none'])]),
    hoverFill: PropTypes.oneOfType([colorType, PropTypes.oneOf(['none'])]),
    stroke: PropTypes.oneOfType([colorType, PropTypes.oneOf(['none'])]),
    isHovering: PropTypes.bool.isRequired,
};

export { defaultProps, propTypes };
