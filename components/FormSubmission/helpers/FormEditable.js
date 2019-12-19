import { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withRouter } from 'react-router';
import produce from 'immer';
import get from 'lodash/get';
import set from 'lodash/set';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import uuid from 'uuid/v4';
import logger from 'utils/logger';
import {
    getFormByIdFormHOC,
    createFormMutationHOC,
    updateFormMutationHOC,
} from '../queries';
import FormTags from '../helpers/FormTags';
import { getRequiredValue, sortFormItems } from '../form-util';

class FormEditable extends Component {
    static getDerivedStateFromProps(nextProps, prevState) {
        const currentForm = get(nextProps, 'getFormById.viewer.form') || {};
        if (isEqual(prevState.currentForm, currentForm)) {
            return null;
        }
        const formItems = {};
        currentForm.fields.forEach(item => {
            if (!item || !FormTags[item.type]) {
                return;
            }
            const prevItem = Object.values(prevState.formItems).find(
                previousItem =>
                    previousItem.index === item.order &&
                    previousItem.labelText === item.label &&
                    previousItem.required === item.required
            );

            // will need to declare this in FormTags perhaps
            const options = {
                size: item.size,
            };

            formItems[item.id] = Object.assign({}, FormTags[item.type], {
                tag: item.type,
                itemId: item.id,
                index: item.order,
                required: item.required,
                editing: get(prevItem, 'editing', false),
                pendingRequired: null,
                labelText: item.label,
                pendingText: item.label,
                options,
            });
        });
        return {
            currentForm,
            formName: currentForm.name,
            currentFormId: currentForm.id,
            formItems,
        };
    }

    state = {
        formId: parseInt(get(this.props, 'match.params.formId'), 10) || 0,
        formItems: {},
        formName: '',
        currentFormId: 0,
        showSavedOrderMessage: false,
        currentForm: {},
    };

    onDragEnd = ({ source, destination }) => {
        // dropped outside the list
        if (!destination) {
            return;
        }

        const reorder = (list, startIndex, endIndex) => {
            const result = Array.from(list);
            const [removed] = result.splice(startIndex, 1);
            result.splice(endIndex, 0, removed);
            return result;
        };

        this.setState(
            produce(draft => {
                const newDraft = draft;
                reorder(
                    sortFormItems(this.state.formItems),
                    source.index,
                    destination.index
                ).forEach((item, index) => {
                    newDraft.formItems[item.itemId].index = index;
                });
                return newDraft;
            }),
            () => {
                this.saveForm(false, this.state);
            }
        );
    };

    setFormName = formName => {
        this.setState({ formName });
    };

    handleAddItem = tag => {
        this.setState(
            produce(draft => {
                const newDraft = draft;
                const id = `faked-${uuid()}`;
                const sortedItems = sortFormItems(newDraft.formItems);
                const index =
                    sortedItems.length === 0
                        ? 0
                        : sortedItems[sortedItems.length - 1].index + 1;
                newDraft.formItems[id] = Object.assign(
                    {},
                    {
                        tag,
                        itemId: id,
                        index,
                        required: false,
                        editing: true,
                        pendingRequired: null,
                        pendingText: '',
                    },
                    FormTags[tag]
                );
                return newDraft;
            })
        );
    };

    // if we add a form item.. or cancel or save or change to editing
    // then reset all the others.
    // pending should contain a value
    formItemChanged = ({ id, field, value }) => {
        this.setState(
            produce(draft => {
                const newDraft = draft;
                set(newDraft, `formItems.${id}.${field}`, value);
                return newDraft;
            })
        );
    };

    saveFormName = async (newFormName = null) => {
        let formName = this.state.formName;
        const { formId } = this.state;
        if (newFormName !== null && newFormName.length > 0) {
            formName = newFormName;
            this.setFormName(formName);
        }
        try {
            // save the form name
            await this.props.updateForm({
                id: formId,
                name: formName,
            });
        } catch (err) {
            return logger.log('error upserting the formName', err);
        }
        return Promise.resolve();
    };

    saveForm = async (field = false, updatedState = {}) => {
        // construct all of the data needed for the form
        const { formName, formItems } = isEmpty(updatedState)
            ? this.state
            : updatedState;
        const { formId } = this.state;
        const fields = [];

        const showSavedOrderMessage = !isEmpty(updatedState);

        // add all the necessary fields to the form array
        Object.keys(formItems).forEach(id => {
            const item = formItems[id];
            fields.push(item.getFormData(item));
        });

        try {
            // attempt to save the form
            if (!formId) {
                // if this is a new form we need to create one
                const result = await this.props.createForm({
                    name: formName,
                    fields,
                });
                if (result.errors) {
                    // handle errors because sometimes the server does not respond with a 500
                    logger.log('error creating the form', result.errors);
                    return Promise.reject();
                }
                // replace the state
                this.props.history.push(`/forms/${result.data.createForm.id}`);
                // @Brian
                // window.history.replaceState(
                //     {},
                //     'Forms',
                //     `/forms/${result.data.createForm.id}`
                // );
                return Promise.resolve();
            }

            // now that we have a formId we can update the form in use
            this.props.updateForm({
                // pull from the url.. not from the current formId
                adding: !parseInt(
                    get(this.props, 'match.params.formId', 0),
                    10
                ),
                id: formId,
                name: formName,
                fields,
            });

            if (showSavedOrderMessage) {
                this.setState({ showSavedOrderMessage: true });
                setTimeout(() => {
                    this.setState({ showSavedOrderMessage: false });
                }, 2000);
                return Promise.resolve();
            }
            this.setState(
                produce(draft => {
                    const newDraft = draft;
                    newDraft.formItems[
                        field.itemId
                    ].required = getRequiredValue(field);
                    newDraft.formItems[field.itemId].labelText =
                        field.pendingText;
                    newDraft.formItems[field.itemId].editing = false;
                    newDraft.formItems[field.itemId].pendingRequired = null;
                    return newDraft;
                })
            );
            return Promise.resolve();
        } catch (err) {
            logger.log('error upserting the form catch', err);
            return Promise.reject();
        }
    };

    removeField = id => {
        this.setState(
            produce(draft => {
                const newDraft = draft;
                delete newDraft.formItems[id];
                return newDraft;
            })
        );
    };

    itemModificationDisabled = itemId =>
        Object.keys(this.state.formItems)
            .map(i => this.state.formItems[i])
            .some(formItem => formItem.editing && formItem.itemId !== itemId);

    toggleEditing = (field, value) => {
        this.setState(
            produce(draft => {
                const newDraft = draft;

                const fieldNotInDB = !parseInt(field.itemId, 10);

                if (value === false && fieldNotInDB) {
                    // the user is canceling to edit an item after they added one, and it hasnt been saved
                    // delete it
                    delete newDraft.formItems[field.itemId];
                } else if (value === false && !fieldNotInDB) {
                    newDraft.formItems[field.itemId] = Object.assign(
                        newDraft.formItems[field.itemId],
                        {
                            // reset pending required
                            pendingRequired: null,
                            editing: false,
                        }
                    );
                } else if (value === true) {
                    newDraft.formItems[field.itemId] = Object.assign(
                        newDraft.formItems[field.itemId],
                        {
                            editing: true,
                        }
                    );
                }
                return newDraft;
            })
        );
    };

    render() {
        return this.props.children({
            ...this.state,
            loading: get(this.props, 'getFormById.loading', false),
            history: this.props.history,
            actions: {
                onDragEnd: this.onDragEnd,
                setFormName: this.setFormName,
                handleAddItem: this.handleAddItem,
                formItemChanged: this.formItemChanged,
                saveFormName: this.saveFormName,
                saveForm: this.saveForm,
                removeField: this.removeField,
                toggleEditing: this.toggleEditing,
                itemModificationDisabled: this.itemModificationDisabled,
            },
        });
    }
}

FormEditable.displayName = 'FormEditable';
FormEditable.defaultProps = {
    formQuery: {},
};
FormEditable.propTypes = {
    history: PropTypes.object.isRequired,
    createForm: PropTypes.func.isRequired,
    updateForm: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,
};

const enhance = compose(
    withRouter,
    getFormByIdFormHOC,
    createFormMutationHOC,
    updateFormMutationHOC
);

export default enhance(FormEditable);
