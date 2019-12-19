import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router';
import FormsHome from './FormsHome';
import FormsManager from './FormsManager';

const Forms = props => (
    <Switch>
        <Route exact path={props.match.path} component={FormsHome} />
        <Route path={`${props.match.path}/:formId`} component={FormsManager} />
    </Switch>
);

Forms.propTypes = {
    match: PropTypes.object.isRequired,
};

export default Forms;
