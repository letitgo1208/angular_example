import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import styled, { withTheme } from 'styled-components';
import withOnClickOutside from 'react-onclickoutside';
import get from 'lodash/get';
import { Input, PositiveNegativeButtons } from 'components/Form';
import Icon from 'components/Icon';

const ContentWrapper = styled.div`
    display: flex;
    width: 100%;
    align-items: center;

    > input {
        flex-grow: 1;
    }
`;

const enhance = compose(withTheme, withOnClickOutside);

class FormName extends Component {
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.currentFormName === prevState.currentFormName) {
            return null;
        }
        return {
            pendingFormName: nextProps.currentFormName,
            currentFormName: nextProps.currentFormName,
        };
    }

    state = {
        currentFormName: this.props.currentFormName,
        pendingFormName: this.props.currentFormName,
        isOutsideElement: !!this.props.formId,
    };

    componentDidMount() {
        if (!this.props.formId) {
            this.focusInput();
        }
    }

    onFocus = () => this.setState({ isOutsideElement: false });

    setAsInside = () =>
        this.setState({
            isOutsideElement: false,
        });

    inputRef = React.createRef();

    focusInput = () => this.inputRef.current.focus();

    cancel = () => {
        this.setState({
            isOutsideElement: true,
            pendingFormName: this.state.currentFormName,
        });
        this.props.onCancel();
    };

    changeFormName = e => {
        const pendingFormName = e.target.value;
        this.setState({ pendingFormName });
    };

    saveFormName = () => {
        this.props.saveFormName();
    };

    handleClickOutside = e => {
        const name = get(e, 'target.className') || '';
        if (
            typeof name === 'string' &&
            name.includes('disable-click-outside')
        ) {
            return;
        }
        if (!this.props.formId) {
            this.props.setFormName(this.state.pendingFormName);
            this.cancel();
            return;
        }
        if (this.state.pendingFormName === this.state.currentFormName) {
            this.cancel();
        }
    };

    render() {
        const { formId, saveFormName, formNamePlaceholder } = this.props;
        const { pendingFormName, isOutsideElement } = this.state;
        return (
            <ContentWrapper>
                <Input
                    variant="title"
                    placeholder={formNamePlaceholder}
                    name="pendingFormName"
                    value={pendingFormName}
                    onChange={this.changeFormName}
                    innerRef={this.inputRef}
                    onFocus={this.onFocus}
                    onKeyPress={event => {
                        if (event.charCode === 13 && formId) {
                            event.preventDefault();
                            saveFormName(pendingFormName);
                            this.cancel();
                            return;
                        }
                        if (formId && isOutsideElement) {
                            this.setAsInside();
                        }
                    }}
                />
                {formId
                    ? !isOutsideElement && (
                          <PositiveNegativeButtons
                              positiveProps={{
                                  size: 'large',
                                  className: 'disable-click-outside',
                              }}
                              onNegative={this.cancel}
                              negativeProps={{
                                  size: 'large',
                                  className: 'disable-click-outside',
                              }}
                              onPositive={event => {
                                  event.preventDefault();
                                  saveFormName(pendingFormName);
                                  this.cancel();
                              }}
                          />
                      )
                    : null}
                {isOutsideElement && (
                    <Icon
                        type="pencil"
                        width={2}
                        height={2}
                        hover
                        onClick={this.focusInput}
                    />
                )}
                {this.props.children({ isOutsideElement })}
            </ContentWrapper>
        );
    }
}

FormName.displayName = 'FormName';
FormName.defaultProps = {
    setFormName: () => true,
};
FormName.propTypes = {
    formId: PropTypes.number.isRequired,
    setFormName: PropTypes.func,
    saveFormName: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    currentFormName: PropTypes.string.isRequired,
    children: PropTypes.func,
    formNamePlaceholder: PropTypes.string,
};
FormName.defaultProps = {
    children: () => {},
    formNamePlaceholder: 'Form Name',
    onCancel: () => {},
};

export default enhance(FormName);
