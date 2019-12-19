import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router';
import FlowsHome from './FlowsHome';
import FlowDetail from './FlowDetail';
import FlowAdd from './FlowAdd';
import FlowStep from './FlowStep';
import { flowProps } from './utils';

const steps = Object.keys(flowProps).map(step => step.toLowerCase());

const AddSteps = props => (
    <Switch>
        <Route exact path={`${props.match.path}`} component={FlowAdd} />
        {steps.map(step => (
            <Route
                exact
                key={step}
                path={`${props.match.path}/${step}`}
                render={routeProps => (
                    <FlowStep {...routeProps} stepType={step} />
                )}
            />
        ))}
    </Switch>
);
AddSteps.propTypes = {
    match: PropTypes.object.isRequired,
};

const Flows = props => (
    <Switch>
        <Route exact path={props.match.path} component={FlowsHome} />
        <Route exact path={`${props.match.path}/create`} component={FlowAdd} />
        <Route
            exact
            path={`${props.match.path}/:flowId`}
            component={FlowDetail}
        />
        <Route path={`${props.match.path}/:flowId/add`} component={AddSteps} />
        <Route path={`${props.match.path}/add`} component={AddSteps} />
        {steps.map(step => (
            <Route
                exact
                key={step}
                path={`${props.match.path}/:flowId/${step}/:stepId`}
                render={routeProps => (
                    <FlowStep {...routeProps} stepType={step} />
                )}
            />
        ))}
    </Switch>
);

Flows.propTypes = {
    match: PropTypes.object.isRequired,
};

export default Flows;
