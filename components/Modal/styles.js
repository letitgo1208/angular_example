/**
 * This file is used to override the react modal styles because we don't have control
 * over the parents that need to be styled - this file is imported into
 * config/global-styles.js
 */
import { injectGlobal } from 'styled-components';

const styles = theme => {
    /* eslint no-unused-expressions: 0 */
    injectGlobal`
        .ReactModal {
            &__Content, &__Overlay {
                opacity: 0;
                &--after-open {
                  opacity: 1;
                  transition: ${theme.ts.easeIn};
                }
                &--before-close {
                    opacity: 0;
                }
            }
        }
    `;
};

export default styles;
