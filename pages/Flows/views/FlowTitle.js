import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import FormName from 'components/FormName';
import FlowDelete from './FlowDelete';
import { UPDATE_FLOW } from '../queries';

const FlowTitle = ({ flow, history }) => (
    <Mutation mutation={UPDATE_FLOW}>
        {updateFlow => (
            <FormName
                saveFormName={flowName =>
                    updateFlow({
                        variables: {
                            id: flow.id,
                            name: flowName,
                        },
                        optimisticResponse: {
                            updateFlow: {
                                id: flow.id,
                                name: flowName,
                                __typename: 'Flow',
                            },
                        },
                    })
                }
                currentFormName={flow.name}
                formId={flow.id}
            >
                {({ isOutsideElement }) =>
                    isOutsideElement && (
                        <FlowDelete
                            flow={flow}
                            onComplete={() => history.push('/flows')}
                        />
                    )
                }
            </FormName>
        )}
    </Mutation>
);

FlowTitle.displayName = 'FlowTitle';
FlowTitle.defaultProps = {
    flow: false,
};
FlowTitle.propTypes = {
    flow: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    history: PropTypes.object.isRequired,
};

export default FlowTitle;
