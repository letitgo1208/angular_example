import { injectGlobal } from 'styled-components';
import popoverOverrides from 'components/Popover/styles';
import tooltipOverrides from 'components/Tooltip/styles';
import modalOverrides from 'components/Modal/styles';
import cssOverrides from './css-overrides';

const styles = theme => {
    cssOverrides(theme);
    popoverOverrides(theme);
    tooltipOverrides(theme);
    modalOverrides(theme);
    /* eslint no-unused-expressions: 0 */
    injectGlobal`
        html {
            font-size: 62.5%;
        }
        
        // This will get rid of the browser outline on focus (but only when the mouse is NOT clicked)
        // See the package focus-outline-manager for more info
        html.focus-outline-hidden :focus {
            outline: none;
        }

        html, body {
            height: 100%;
            width: 100%;
        }

        body {
            font-size: 1.4rem;
            font-family: 'museo-sans-rounded', Helvetica, Arial, sans-serif;
            font-weight: 300;
            display: flex;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        #app {
            background-color: ${theme.cb};
            min-height: 100%;
            min-width: 100%;
        }

        p,
        label {
            line-height: 1.5em;
        }
    `;
};

export default styles;
