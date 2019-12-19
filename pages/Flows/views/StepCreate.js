import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { updateFlowCache, STEP_ADDED } from '../queries';

const StepCreate = ({ children, mutation, flowId, onComplete }) => (
    <Mutation
        mutation={mutation}
        update={(cache, { data: { createFlowStep } }) => {
            updateFlowCache(STEP_ADDED)(flowId, cache, createFlowStep);
            onComplete(flowId);
        }}
    >
        {createAction => children(createAction)}
    </Mutation>
);

StepCreate.defaultProps = {
    onComplete: false,
};
StepCreate.propTypes = {
    children: PropTypes.func.isRequired,
    mutation: PropTypes.object.isRequired,
    flowId: PropTypes.number.isRequired,
    onComplete: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
};

export default StepCreate;
