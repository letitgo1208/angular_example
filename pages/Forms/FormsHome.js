import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withTheme } from 'styled-components';
import { HeroLayout } from 'components/Layout';
import ContentBox from 'components/ContentBox';
import Icon from 'components/Icon';
import FormsHeader from 'components/FormSubmission/views/FormsHeader';
import FormsList from './views/FormsList';
import FormsQuery from './views/FormsQuery';

const Forms = ({ theme }) => (
    <HeroLayout
        renderIcon={<Icon type="form" width={3.5} color={theme.cbcs[4]} />}
        title="Forms"
        description={<Link to="/forms/create">Create a form</Link>}
    >
        <ContentBox header={<FormsHeader>My Forms</FormsHeader>}>
            <FormsQuery>
                {({ forms }) => <FormsList forms={forms} />}
            </FormsQuery>
        </ContentBox>
    </HeroLayout>
);

Forms.displayName = 'Forms';
Forms.propTypes = {
    theme: PropTypes.object.isRequired,
};

export default withTheme(Forms);
