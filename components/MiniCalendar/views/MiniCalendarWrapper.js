import styled from 'styled-components';
import { prop } from 'styled-tools';
import { MiniCalendarActiveTile } from './MiniCalendarHover';

const MiniCalendarWrapper = styled.div`
    .react-calendar {
        border: none;
        background: none;
        
        
        &__navigation {
            margin-bottom: ${prop('theme.sp.sm')};
            padding: 0 ${prop('theme.sp.xs')};

            &__label {
                cursor: pointer;
                outline: none;
                flex-grow: 0 !important;
                margin-right: auto;
                font-weight: 700;
                order: 0;
                display: flex;
                &__arrow {
                    margin: -${prop('theme.sp.xs')} 0 0 ${prop('theme.sp.xs')};
                }
            }
            &__prev-button {
                order: 1;
                padding: 0;
                outline: none;
            }
            &__next-button {
                order: 2;
                padding: 0;
                outline: none;
            }
            &__prev2-button {
                display: none;
            }
            &__next2-button {
                display: none;
            }
        }

        &__year-view .react-calendar__tile--now time {
           color: ${prop('theme.cp')};
        }

        &__tile {
            outline: none;
            cursor: pointer;
            padding: ${prop('theme.sp.md')} 0;
            position: relative;
            overflow: visible !important;

            // Month and year selectors
            &.react-calendar {
                &__decade-view,
                &__year-view,
                &__century-view {
                    &__years,
                    &__months,
                    &__decades {
                        &__year,
                        &__month,
                        &__decade {
                            &:hover {
                                color: ${prop('theme.cps[8]')};
                                font-weight: 700;
                            }
                            &:hover ${MiniCalendarActiveTile} {
                                display: none;
                            }
                        }
                    }
                }
            }

            &--now {
                & ${MiniCalendarActiveTile} {
                    background: ${prop('theme.cp')};
                    opacity: 1;
                }
                & time {
                    color: ${prop('theme.cpc')};
                }
            }

            & time {
                position: relative;
                z-index: 2;
            }

            &--active,
            &:hover {
                color: ${prop('theme.cbc')};
                ${MiniCalendarActiveTile} {
                    opacity: 1;
                }
            }

            &--active
                ${MiniCalendarActiveTile},
                &:hover
                ${MiniCalendarActiveTile} {
                    opacity: 1;
                }
            }

            &__month-view {
                &__weekdays {
                    &__weekday {
                        text-align: center;
                        color: ${prop('theme.cps[5]')};
                        font-weight: 700;
                    }
                }
                &__days {
                    &__day {
                        &--neighboringMonth {
                            color: ${prop('theme.cbcs[3]')};
                        }
                    }
                }
            }
        }
    }
`;

export default MiniCalendarWrapper;
