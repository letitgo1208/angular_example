/**
 *
 * Img.js
 *
 * Renders an image, enforcing the usage of the alt="" tag
 */

import React from 'react';
import PropTypes from 'prop-types';

const Img = ({ src, alt, ...rest }) => <img src={src} alt={alt} {...rest} />;

Img.propTypes = {
    src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    alt: PropTypes.string.isRequired,
};

export default Img;
