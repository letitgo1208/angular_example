import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import { HorizontalGroup } from 'components/MarginGroup';

const PositiveNegativeButtons = ({
    positiveText,
    savingText,
    positiveProps,
    onPositive,
    isSaving,
    negativeText,
    negativeProps,
    onNegative,
}) => {
    const onClickProps = () => {
        if (onPositive) return { onClick: onPositive };
        return { htmlType: 'submit' };
    };

    return (
        <HorizontalGroup>
            <Button {...onClickProps()} {...positiveProps}>
                {isSaving ? savingText : positiveText}
            </Button>
            <Button variant="inverse" onClick={onNegative} {...negativeProps}>
                {negativeText}
            </Button>
        </HorizontalGroup>
    );
};

PositiveNegativeButtons.defaultProps = {
    onPositive: false,
    isSaving: false,
    positiveProps: { size: 'large' },
    negativeProps: { size: 'large' },
    negativeText: 'Cancel',
    positiveText: 'Save',
    savingText: 'Saving',
};

PositiveNegativeButtons.propTypes = {
    onPositive: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    onNegative: PropTypes.func.isRequired,
    isSaving: PropTypes.bool,
    positiveProps: PropTypes.object,
    negativeProps: PropTypes.object,
    negativeText: PropTypes.string,
    positiveText: PropTypes.string,
    savingText: PropTypes.string,
};
PositiveNegativeButtons.displayName = 'PositiveNegativeButtons';

export default PositiveNegativeButtons;
