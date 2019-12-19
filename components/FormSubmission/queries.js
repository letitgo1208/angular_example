import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import get from 'lodash/get';
import { getOptimisticId } from 'utils/functions';

export const FORMS_QUERY = gql`
    query Viewer {
        viewer {
            forms {
                id
                name
            }
        }
    }
`;

export const DELETE_FORM_MUTATION = gql`
    mutation DeleteForm($id: ID!) {
        deleteForm(id: $id) {
            id
            __typename
        }
    }
`;

export const deleteFormOptimisticResponse = id => ({
    deleteForm: {
        id,
        __typename: 'Form',
    },
});

export const deleteFormOptimisticCache = id => cache => {
    const initialData = cache.readQuery({
        query: FORMS_QUERY,
    });
    const data = Object.assign(
        {
            viewer: {
                forms: [],
                __typename: 'User',
            },
        },
        initialData
    );
    data.viewer.forms = data.viewer.forms.filter(f => f.id !== id);
    cache.writeQuery({
        query: FORMS_QUERY,
        data,
    });
};

export const CREATE_FORM_MUTATION = gql`
    mutation CreateForm($name: String, $fields: [FormFieldInput]) {
        createForm(name: $name, fields: $fields) {
            id
            name
            fields {
                id
                label
                required
                order
                type
                ... on TextField {
                    size
                }
            }
        }
    }
`;

export const createFormMutationHOC = graphql(CREATE_FORM_MUTATION, {
    props: ({ mutate }) => ({
        createForm: variables => mutate({ variables }),
    }),
});

export const UPDATE_FORM_MUTATION = gql`
    mutation UpdateForm($id: ID!, $name: String, $fields: [FormFieldInput]) {
        updateForm(id: $id, name: $name, fields: $fields) {
            id
            name
            fields {
                id
                label
                required
                order
                type
                ... on TextField {
                    size
                }
            }
        }
    }
`;

export const FORM_QUERY = gql`
    query Viewer($id: ID!) {
        viewer {
            form(id: $id) {
                id
                name
                fields {
                    id
                    label
                    required
                    order
                    type
                    ... on TextField {
                        size
                    }
                }
            }
        }
    }
`;

export const getFormByIdFormHOC = graphql(FORM_QUERY, {
    name: 'getFormById',
    skip: props => !parseInt(get(props, 'match.params.formId'), 10),
    options: props => ({
        variables: {
            id: String(get(props, 'match.params.formId')),
        },
    }),
});

const getId = field => get(field, 'id', false) || getOptimisticId();

export const updateFormMutationHOC = graphql(UPDATE_FORM_MUTATION, {
    props: ({ mutate }) => ({
        updateForm: ({ adding, ...variables }) =>
            mutate({
                variables,
                optimisticResponse: {
                    __typename: 'Mutation',
                    updateForm: {
                        ...variables,
                        id: getId(variables),
                        __typename: 'Form',
                        fields: get(variables, 'fields', []).map(field => ({
                            ...field,
                            __typename: 'FormField',
                        })),
                    },
                },
                update: (cache, { data: { updateForm } }) => {
                    const id = String(updateForm.id);
                    const initialData = adding
                        ? {}
                        : cache.readQuery({
                              query: FORM_QUERY,
                              variables: {
                                  id,
                              },
                          });
                    const data = Object.assign(
                        {
                            viewer: {
                                __typename: 'User',
                                form: {
                                    ...variables,
                                    __typename: 'Form',
                                    fields: [],
                                },
                            },
                        },
                        initialData
                    );
                    data.viewer.form.fields = updateForm.fields;
                    cache.writeQuery({
                        query: FORM_QUERY,
                        variables: {
                            id,
                        },
                        data,
                    });
                },
            }),
        onError: () => {
            // eslint-disable-next-line
            alert('Error updating the form');
        },
    }),
});

export const DELETE_FORM_FIELD_MUTATION = gql`
    mutation DeleteFormField($id: ID!) {
        deleteFormField(id: $id) {
            id
        }
    }
`;
