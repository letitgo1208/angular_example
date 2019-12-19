import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import {
    InMemoryCache,
    IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { getToken, logout } from 'utils/storage';
import { API_LOCATION } from 'utils/constants';
import { persistCache } from 'apollo-cache-persist';
import { logoutUser } from 'pages/Login/actions';
import introspectionQueryResultData from './fragmentTypes.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData,
});

const httpLink = createHttpLink({ uri: `${API_LOCATION}/graphql` });

const authToken = new ApolloLink((operation, forward) => {
    const token = getToken();
    operation.setContext({
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
        },
    });
    return forward(operation);
});

export default ({ history, store }) => {
    const cache = new InMemoryCache({
        fragmentMatcher,
    });

    persistCache({
        cache,
        storage: window.localStorage,
    });

    const logoutLink = onError(({ graphQLErrors }) => {
        if (
            graphQLErrors &&
            graphQLErrors.find(
                ({ message }) => message === 'invalid_credentials'
            )
        ) {
            logout();
            store.dispatch(logoutUser());
            history.push('/login');
        }
    });

    const defaultOptions = {
        watchQuery: {
            fetchPolicy: 'cache-and-network',
        },
        query: {
            fetchPolicy: 'cache-and-network',
            errorPolicy: 'all',
        },
        mutate: {
            errorPolicy: 'all',
        },
    };

    const composedLinks = ApolloLink.from([authToken, logoutLink, httpLink]);

    const client = new ApolloClient({
        link: composedLinks,
        cache,
        defaultOptions,
    });

    return client;
};
