/**
 * This file is used to override package design styles that can't be overridden by styled components
 * or in the theme file - or we just don't want to override each time
 */
import { injectGlobal } from 'styled-components';

const styles = theme => {
    /* eslint no-unused-expressions: 0 */
    injectGlobal`
        .popover {
            z-index: 100;
            & .arrow {
                width: 1rem;
                height: .5rem;
                margin: 0 .3rem;
                top: calc((.5rem + 1px) * -1);
                position: absolute;
                display: block;
            }
        }
        
        .ant {
            &-form-item-label {
                font-weight: 500;
                line-height: 0 !important;
                margin-bottom: ${theme.sp.xs};
            }
            &-calendar-picker {
                &-clear, &-icon {
                    display: none !important;
                }
            }
            &-time-picker {
                &-icon {
                    display: none !important;
                }
            }
        }
    `;
};

export default styles;
