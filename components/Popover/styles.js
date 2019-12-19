/**
 * This file is used to override the reactstrap styles because we don't have control over the parents that
 * need to be styled - this file is imported into config/global-styles.js
 */
import { injectGlobal } from 'styled-components';

const styles = theme => {
    /* eslint no-unused-expressions: 0 */
    injectGlobal`
        .popover {
          z-index: 1060;
        }
        
        .popover-inner {
            position: relative;
        }

        .popover .arrow {
          position: absolute;
          display: block;
          width: 2.5rem;
          height: 1rem;
          margin: 0 0.3rem;
          top: auto;
        }

        .popover .arrow::before, .popover .arrow::after {
          position: absolute;
          display: block;
          border-color: transparent;
          border-style: solid;
        }

        .bs-popover-top, .bs-popover-auto[x-placement^="top"] {
          margin-bottom: 1.25rem;
          margin-top: -1.1rem;
        }

        .bs-popover-top .arrow, .bs-popover-auto[x-placement^="top"] .arrow {
            bottom: calc((0.3rem + -1px) * -1);
            margin-top: 1.15rem;
        }

        .bs-popover-top .arrow::before, .bs-popover-auto[x-placement^="top"] .arrow::before,
        .bs-popover-top .arrow::after, .bs-popover-auto[x-placement^="top"] .arrow::after {
            content: "▼";
            transform: scale(2.6, 1.2);
            color: ${theme.cb};
            text-shadow: 0px 2px 1px rgba(0, 0, 0, 0.04);
        }

        .bs-popover-right, .bs-popover-auto[x-placement^="right"] {
            margin-left: 1.4rem;
        }

        .bs-popover-right .arrow, .bs-popover-auto[x-placement^="right"] .arrow {
            left: calc((1.7rem + 1px) * -1);
            margin-top: -1.1rem;
        }

        .bs-popover-right .arrow::before, .bs-popover-auto[x-placement^="right"] .arrow::before,
        .bs-popover-right .arrow::after, .bs-popover-auto[x-placement^="right"] .arrow::after {
            content: "◀";
            transform: scale(1.2, 1.6);
            color: ${theme.cb};
            text-shadow: -2px 0 1px rgba(0, 0, 0, 0.03);
        }

        .bs-popover-bottom, .bs-popover-auto[x-placement^="bottom"] {
            margin-top: 1.15rem;
        }

        .bs-popover-bottom .arrow, .bs-popover-auto[x-placement^="bottom"] .arrow {
            top: calc((1.6rem + 3px) * -1);
        }

        .bs-popover-bottom .arrow::before, .bs-popover-auto[x-placement^="bottom"] .arrow::before,
        .bs-popover-bottom .arrow::after, .bs-popover-auto[x-placement^="bottom"] .arrow::after {
            content: "▲";
            transform: scale(2.6, 1.2);
            color: ${theme.cb};
            text-shadow: 0px -2px 1px rgba(0, 0, 0, 0.04);
        }

        .bs-popover-left, .bs-popover-auto[x-placement^="left"] {
            margin-right: 1rem;
        }

        .bs-popover-left .arrow, .bs-popover-auto[x-placement^="left"] .arrow {
            right: calc((2.4rem + 1px) * -1);
        }

        .bs-popover-left .arrow::before, .bs-popover-auto[x-placement^="left"] .arrow::before,
        .bs-popover-left .arrow::after, .bs-popover-auto[x-placement^="left"] .arrow::after {
            content: "▶";
            transform: scale(1.2, 2.6);
            color: ${theme.cb};
            text-shadow: 1px 0 1px rgba(0, 0, 0, 0.03);
        }
    `;
};

export default styles;
