// Available theme variables can be found in
// https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less

// IMPORTANT: to see changes made to this file (on ant components) a restart of the server is required.

const { lighten, darken } = require('polished');

// A lot of our validation uses 6 character hex codes polished always returns the
// SHORTEST hex code - easier to be consistent and make them 6 characters here than to
// change our validation in the rest of the app
const make6Characters = hex => {
    if (hex.length === 4) {
        const shortHand = hex.split('#')[1];
        return hex + shortHand;
    }
    return hex;
};

const shade = (value, color, type) => {
    let newColor = color;
    switch (type) {
        case 'lighten':
            newColor = lighten(value, color);
            break;
        case 'darken':
            newColor = darken(value, color);
            break;
        default:
            return false;
    }
    return make6Characters(newColor);
};

const primaryColor = '#51BB7B';
const secondaryColor = '#4A90E2';
const primaryContrast = '#FFFFFF';
const backgroundColor = '#FFFFFF';
const backgroundContrast = '#444444';
const notificationColor = '#BB5151';
const notificationColorContrast = '#FFFFFF';
const errorColor = '#BB5151';
const errorColorContrast = '#FFFFFF';

const fontSizeBase = 1;
const fontSize = {
    lg: `${fontSizeBase * 1.6}rem`,
    md: `${fontSizeBase * 1.4}rem`,
    sm: `${fontSizeBase * 1.2}rem`,
};

const sizeBase = 1;

const spacingBase = 1;
const spacing = {
    lg: `${spacingBase * 2}rem`,
    md: `${spacingBase * 1.5}rem`,
    sm: `${spacingBase * 1}rem`,
    xs: `${spacingBase * 0.5}rem`,
};

const borderRadiusBase = 1;
const borderRadius = {
    lg: `${borderRadiusBase * 0.4}rem`,
    md: `${borderRadiusBase * 0.2}rem`,
    sm: `${borderRadiusBase * 0.1}rem`,
};

const border = '0.1rem';

const transitionDuration = 150;

module.exports = {
    'border-radius-base': borderRadius.md,
    'border-radius-sm': borderRadius.sm,
    'border-width-base': border,
    // Colors
    'primary-color': primaryColor,
    'primary-1': shade(0.5, primaryColor, 'lighten'),
    'primary-2': shade(0.4, primaryColor, 'lighten'),
    'primary-3': shade(0.3, primaryColor, 'lighten'),
    'primary-4': shade(0.2, primaryColor, 'lighten'),
    'primary-5': shade(0.1, primaryColor, 'lighten'),
    'primary-6': primaryColor,
    'primary-7': shade(0.1, primaryColor, 'darken'),
    'primary-8': shade(0.2, primaryColor, 'darken'),
    'primary-9': shade(0.3, primaryColor, 'darken'),
    'primary-10': shade(0.4, primaryColor, 'darken'),
    'secondary-color': secondaryColor,
    'secondary-1': shade(0.5, secondaryColor, 'lighten'),
    'secondary-2': shade(0.4, secondaryColor, 'lighten'),
    'secondary-3': shade(0.3, secondaryColor, 'lighten'),
    'secondary-4': shade(0.2, secondaryColor, 'lighten'),
    'secondary-5': shade(0.1, secondaryColor, 'lighten'),
    'secondary-6': secondaryColor,
    'secondary-7': shade(0.1, secondaryColor, 'darken'),
    'secondary-8': shade(0.2, secondaryColor, 'darken'),
    'secondary-9': shade(0.3, secondaryColor, 'darken'),
    'secondary-10': shade(0.4, secondaryColor, 'darken'),
    'error-1': shade(0.5, errorColor, 'lighten'),
    'error-2': shade(0.4, errorColor, 'lighten'),
    'error-3': shade(0.3, errorColor, 'lighten'),
    'error-4': shade(0.2, errorColor, 'lighten'),
    'error-5': shade(0.1, errorColor, 'lighten'),
    'error-6': errorColor,
    'error-7': shade(0.1, errorColor, 'darken'),
    'error-8': shade(0.2, errorColor, 'darken'),
    'error-9': shade(0.3, errorColor, 'darken'),
    'error-10': shade(0.4, errorColor, 'darken'),
    'error-contrast': errorColorContrast,
    'body-background': backgroundColor,
    'component-background': backgroundColor,
    'text-color': backgroundContrast,
    'text-color-secondary': primaryContrast,
    'btn-default-bg': backgroundColor,
    // Layout
    'layout-header-padding': `0 ${spacing.lg}`,
    'layout-body-background': backgroundColor,
    'layout-header-height': `${sizeBase * 9}rem`,
    // Avatar
    'avatar-size-lg': `${sizeBase * 5.4}rem`,
    // Fonts
    'font-size-base': fontSize.md,
    'font-size-lg': fontSize.lg,
    'font-size-sm': fontSize.sm,
    'font-family': '"museo-sans-rounded", Helvetica, Arial, sans-serif',
    // Form
    'form-item-trailing-colon': false,
    // Button
    'btn-padding-base': `0 ${spacingBase * 1.5 + 0.1}rem`,
    'btn-padding-sm': `0 ${spacingBase * 0.5 - 0.1}rem`,
    // Padding
    'padding-lg': spacing.lg,
    'padding-md': spacing.md,
    'padding-sm': spacing.sm,
    'padding-xs': spacing.xs,
    // Tooltips
    'tooltip-bg': 'rgba(0, 0, 0, .60)',
    'tooltip-arrow-width': 0,
    // Transitions
    'ease-out': 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    'ease-in': 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
    'ease-in-out': 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    'ease-out-back': 'cubic-bezier(0.12, 0.4, 0.29, 1.46)',
    'ease-in-back': 'cubic-bezier(0.71, -0.46, 0.88, 0.6)',
    'ease-in-out-back': 'cubic-bezier(0.71, -0.46, 0.29, 1.46)',
    'ease-out-circ': 'cubic-bezier(0.08, 0.82, 0.17, 1)',
    'ease-in-circ': 'cubic-bezier(0.6, 0.04, 0.98, 0.34)',
    'ease-in-out-circ': 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
    'ease-out-quint': 'cubic-bezier(0.23, 1, 0.32, 1)',
    'ease-in-quint': 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
    'ease-in-out-quint': 'cubic-bezier(0.86, 0, 0.07, 1)',
    // These keys AREN'T used in the ANTD theme - but so we can use them in the app we're going
    // to include them here:
    'background-contrast-1': shade(0.7, backgroundContrast, 'lighten'),
    'background-contrast-2': shade(0.65, backgroundContrast, 'lighten'),
    'background-contrast-3': shade(0.6, backgroundContrast, 'lighten'),
    'background-contrast-4': shade(0.4, backgroundContrast, 'lighten'),
    'background-contrast-5': shade(0.2, backgroundContrast, 'lighten'),
    'background-contrast-6': backgroundContrast,
    'background-contrast-7': shade(0.1, backgroundContrast, 'darken'),
    'background-contrast-8': shade(0.15, backgroundContrast, 'darken'),
    'background-contrast-9': shade(0.2, backgroundContrast, 'darken'),
    'background-contrast-10': shade(0.25, backgroundContrast, 'darken'),
    'notification-color': notificationColor,
    'notification-color-contrast': notificationColorContrast,
    fontSizeBase,
    'border-radius': borderRadius,
    borderRadiusBase,
    sizeBase,
    spacingBase,
    spacing,
    // In miliseconds
    'transition-duration': transitionDuration,
};
