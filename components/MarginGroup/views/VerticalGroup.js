import styled from 'styled-components';
import { margin } from '../utils';
import { SIZE_TYPE } from '../types';

const VerticalGroup = styled.div`
    > * {
        display: block;
    }

    > *:not(:last-child) {
        margin-bottom: ${margin};
    }
`;

VerticalGroup.defaultProps = {
    size: 'md',
};

VerticalGroup.propTypes = {
    size: SIZE_TYPE,
};

export default VerticalGroup;
