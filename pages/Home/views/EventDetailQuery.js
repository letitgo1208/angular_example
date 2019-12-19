import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import ApolloResponse from 'components/ApolloResponse';

const EVENT_DETAIL = gql`
    query Viewer($id: ID!) {
        viewer {
            eventForm(id: $id) {
                id
                eventCalendar
                eventName
                eventOccurrence
                eventState
                eventStartDateTime
                eventEndDateTime
                # NOTE: occurrence can be null if it never repeats
                occurrence {
                    eventOn
                    eventInterval
                    eventRepeatOn
                    eventIntervalTimeFrame
                    eventEnds
                    eventAfter
                }
            }
        }
    }
`;

const EventDetailQuery = ({ id, children, renderLoading, renderError }) => (
    <Query query={EVENT_DETAIL} skip={!id} variables={{ id }}>
        {({ loading, error, data }) => (
            <ApolloResponse
                loading={loading}
                error={error}
                data={data}
                renderLoading={renderLoading}
                renderError={renderError}
                shouldHaveData={id !== false}
            >
                {children({
                    loading,
                    error,
                    event: get(data, 'viewer.eventForm', {}),
                })}
            </ApolloResponse>
        )}
    </Query>
);

EventDetailQuery.defaultProps = {
    renderLoading: undefined,
    renderError: undefined,
};

EventDetailQuery.propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]).isRequired,
    children: PropTypes.func.isRequired,
    renderLoading: PropTypes.node,
    renderError: PropTypes.func,
};

export default EventDetailQuery;
