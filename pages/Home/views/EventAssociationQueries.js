import React from 'react';
import PropTypes from 'prop-types';

import FlowsQuery from 'pages/Flows/views/FlowsQuery';
import FormsQuery from 'pages/Forms/views/FormsQuery';

const EventAssociationQueries = ({ children }) => {
    const shouldRenderChildrenImmediately = true;
    // We have to render the children immediately - so we can run both of
    // these queries concurrently
    return (
        <FlowsQuery apolloResponseProps={{ shouldRenderChildrenImmediately }}>
            {({ flows }) => (
                <FormsQuery
                    apolloResponseProps={{ shouldRenderChildrenImmediately }}
                >
                    {({ forms }) => children({ flows, forms })}
                </FormsQuery>
            )}
        </FlowsQuery>
    );
};

EventAssociationQueries.propTypes = {
    children: PropTypes.func.isRequired,
};

export default EventAssociationQueries;
