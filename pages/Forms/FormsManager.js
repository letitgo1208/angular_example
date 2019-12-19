import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import { HeroLayout } from 'components/Layout';
import FormName from 'components/FormName';
import ContentBox from 'components/ContentBox';
import Icon from 'components/Icon';
import FormSubmission from 'components/FormSubmission';
import LoadingIndicator from 'components/LoadingIndicator';
import DeleteForm from 'components/FormSubmission/views/DeleteForm';
import FormsHeader from 'components/FormSubmission/views/FormsHeader';
import FormDragDrop from 'components/FormSubmission/views/FormDragDrop';
import FormTagSidebar from 'components/FormSubmission/views/FormTagSidebar';

const FormsManager = ({ theme }) => (
    <FormSubmission saveable={false}>
        {({
            actions,
            loading,
            history,
            formName,
            formId,
            formItems,
            pendingText,
            showSavedOrderMessage,
        }) => (
            <HeroLayout
                renderIcon={
                    <Icon type="form" width={3.5} color={theme.cbcs[4]} />
                }
                title=""
                description={
                    <FormName
                        setFormName={actions.setFormName}
                        saveFormName={actions.saveFormName}
                        currentFormName={formName}
                        formId={formId}
                    >
                        {({ isOutsideElement }) =>
                            isOutsideElement && (
                                <DeleteForm
                                    history={history}
                                    formId={formId}
                                    theme={theme}
                                />
                            )
                        }
                    </FormName>
                }
            >
                <ContentBox header={<FormsHeader />}>
                    <Fragment>
                        <FormTagSidebar
                            handleAddItem={actions.handleAddItem}
                            itemModificationDisabled={
                                actions.itemModificationDisabled
                            }
                        />
                        {loading && <LoadingIndicator />}
                        <FormDragDrop
                            showSavedOrderMessage={showSavedOrderMessage}
                            formId={formId}
                            formItems={formItems}
                            onChange={actions.formItemChanged}
                            saveForm={actions.saveForm}
                            onDragEnd={actions.onDragEnd}
                            removeField={actions.removeField}
                            toggleEditing={actions.toggleEditing}
                            pendingText={pendingText}
                            itemModificationDisabled={
                                actions.itemModificationDisabled
                            }
                        />
                    </Fragment>
                </ContentBox>
            </HeroLayout>
        )}
    </FormSubmission>
);

FormsManager.displayName = 'FormsManager';
FormsManager.propTypes = {
    theme: PropTypes.object.isRequired,
};

const enhance = compose(withTheme);

export default enhance(FormsManager);
