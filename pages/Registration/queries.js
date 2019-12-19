import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const REGISTER_MUTATION = gql`
    mutation Register(
        $email: String!
        $password: String!
        $password_confirmation: String!
        $first_name: String!
        $last_name: String!
    ) {
        createAccount(
            email: $email
            password: $password
            first_name: $first_name
            last_name: $last_name
            password_confirmation: $password_confirmation
        ) {
            auth_token {
                access_token
            }
            user {
                id
                first_name
                last_name
            }
        }
    }
`;

export const registerMutation = graphql(REGISTER_MUTATION, {
    props: ({ mutate }) => ({
        registerMutation: ({ email, first_name, last_name, password }) =>
            mutate({
                variables: {
                    email,
                    first_name,
                    last_name,
                    password,
                    password_confirmation: password,
                },
            }),
    }),
});
