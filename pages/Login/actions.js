import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { LOGIN_USER_SUCCESS, LOGOUT } from 'data/app/constants';

export function loginUser(user) {
    return {
        type: LOGIN_USER_SUCCESS,
        payload: { user },
    };
}

export function logoutUser() {
    return {
        type: LOGOUT,
    };
}

const LOGIN_MUTATION = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            auth_token {
                access_token
            }
            user {
                email
                id
                first_name
                last_name
            }
        }
    }
`;

export const loginMutation = graphql(LOGIN_MUTATION, {
    props: ({ mutate }) => ({
        loginMutation: ({ username, password }) =>
            mutate({
                variables: { username, password },
            }),
    }),
});
