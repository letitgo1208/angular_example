/**
 * This file is used to override the tippy styles because we don't have control over the parents that
 * need to be styled - this file is imported into config/global-styles.js
 */
import { injectGlobal } from 'styled-components';

const styles = theme => {
    /* eslint no-unused-expressions: 0 */
    injectGlobal`
        .tippy-popper .tippy-tooltip {
            border-radius: ${theme.br.md};
            padding: ${theme.sp.xs} ${theme.sp.sm};
            font-weight: 500;
            font-size: ${theme.fs.sm};
            [x-circle] {
                background-color: rgba(0, 0, 0, 0.6);
            }
        }
    `;
};

export default styles;
