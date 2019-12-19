import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { prop } from 'styled-tools';
import Link from 'components/Link';

const EmptyMessage = styled.span`
    font-weight: 500;
    font-size: ${prop('theme.fs.lg')};
    line-height: 2;
`;

const EventEmptyAssociation = ({ type }) => {
    const createOrAdd = () => {
        if (type === 'people') return 'add';
        return 'create';
    };

    return (
        <EmptyMessage>
            You don&apos;t have any {type}, let&apos;s{' '}
            <Link to={`/${type}/create`}>{createOrAdd()} one</Link>!
        </EmptyMessage>
    );
};

EventEmptyAssociation.propTypes = {
    type: PropTypes.oneOf(['people', 'forms', 'flows']).isRequired,
};

EventEmptyAssociation.displayName = 'EventEmptyAssociation';

export default EventEmptyAssociation;
