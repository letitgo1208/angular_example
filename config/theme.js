import { getLuminance } from 'polished';
import logger from 'utils/logger';

// eslint-disable-next-line global-require
const antTheme = require('./ant-theme');

const transitionBase = `all ${antTheme['transition-duration']}ms`;

const theme = {
    antTheme,
    // Abbreviations! - I'm regulary against abreviations for variable names, but these are
    // going to be used so often it seems worth the abstraction
    // Primary color - "colorPrimary"
    cp: antTheme['primary-color'],
    // primaryContrast
    cpc: antTheme['text-color-secondary'],
    // secondaryColor
    cs: antTheme['secondary-color'],
    // secondaryContrast
    csc: antTheme['text-color-secondary'],
    // background
    cb: antTheme['body-background'],
    // backgroundContrast
    cbc: antTheme['text-color'],
    // primaryShades - colorPrimaryShades
    cps: {
        1: antTheme['primary-1'],
        2: antTheme['primary-2'],
        3: antTheme['primary-3'],
        4: antTheme['primary-4'],
        5: antTheme['primary-5'],
        6: antTheme['primary-6'],
        7: antTheme['primary-7'],
        8: antTheme['primary-8'],
        9: antTheme['primary-9'],
        10: antTheme['primary-10'],
    },
    // secondaryShades - colorSecondaryShades
    css: {
        1: antTheme['secondary-1'],
        2: antTheme['secondary-2'],
        3: antTheme['secondary-3'],
        4: antTheme['secondary-4'],
        5: antTheme['secondary-5'],
        6: antTheme['secondary-6'],
        7: antTheme['secondary-7'],
        8: antTheme['secondary-8'],
        9: antTheme['secondary-9'],
        10: antTheme['secondary-10'],
    },
    // backgroundContrastShades - colorBackgroundContrastShades
    cbcs: {
        1: antTheme['background-contrast-1'],
        2: antTheme['background-contrast-2'],
        3: antTheme['background-contrast-3'],
        4: antTheme['background-contrast-4'],
        5: antTheme['background-contrast-5'],
        6: antTheme['background-contrast-6'],
        7: antTheme['background-contrast-7'],
        8: antTheme['background-contrast-8'],
        9: antTheme['background-contrast-9'],
        10: antTheme['background-contrast-10'],
    },
    // colorNotification
    cn: antTheme['notification-color'],
    // colorNotificationContrast
    cnc: antTheme['notification-color-contrast'],
    // colorError
    ce: antTheme['error-6'],
    // colorErrorShades
    ces: {
        1: antTheme['error-1'],
        2: antTheme['error-2'],
        3: antTheme['error-3'],
        4: antTheme['error-4'],
        5: antTheme['error-5'],
        6: antTheme['error-6'],
        7: antTheme['error-7'],
        8: antTheme['error-8'],
        9: antTheme['error-9'],
        10: antTheme['error-10'],
    },
    // colorErrorContrast
    cec: antTheme['error-contrast'],
    // fontSizeBase
    fsb: antTheme.fontSizeBase,
    // fontSize
    fs: {
        lg: antTheme['font-size-lg'],
        md: antTheme['font-size-base'],
        sm: antTheme['font-size-sm'],
    },
    // sizeBase
    szb: antTheme.sizeBase,
    // spacingBase
    spb: antTheme.spacingBase,
    // spacing
    sp: {
        lg: antTheme['padding-lg'],
        md: antTheme['padding-md'],
        sm: antTheme['padding-sm'],
        xs: antTheme['padding-xs'],
    },
    // Border radius
    br: antTheme['border-radius'],
    // BorderRadiusBase
    brb: antTheme.borderRadiusBase,
    // Border
    b: antTheme['border-width-base'],
    // Transition duration
    td: antTheme['transition-duration'],
    ts: {
        easeOut: `${transitionBase} ${antTheme['ease-out']}`,
        easeIn: `${transitionBase} ${antTheme['ease-in']}`,
        easeInOut: `${transitionBase} ${antTheme['ease-in-out']}`,
        easeInBack: `${transitionBase} ${antTheme['ease-in-back']}`,
        easeInOutBack: `${transitionBase} ${antTheme['ease-in-out-back']}`,
        easeOutCirc: `${transitionBase} ${antTheme['ease-out-circ']}`,
        easeInCirc: `${transitionBase} ${antTheme['ease-in-circ']}`,
        easeInOutCirc: `${transitionBase} ${antTheme['ease-in-out-circ']}`,
        easeOutQuint: `${transitionBase} ${antTheme['ease-out-quint']}`,
        easeInQuint: `${transitionBase} ${antTheme['ease-in-quint']}`,
        easeInOutQuint: `${transitionBase} ${antTheme['ease-in-out-quint']}`,
    },
    // Color contrast - get the contrasting color for dynamic colors
    cc: color => {
        if (getLuminance(color) > 0.8) return '#A6A6A6';
        if (getLuminance(color) > 0.64) return '#6A6A6A';
        return '#FFFFFF';
    },
};

logger.debug('theme object', theme);

export default theme;
