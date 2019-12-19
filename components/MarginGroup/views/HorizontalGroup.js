import styled from 'styled-components';
import { margin } from '../utils';
import { SIZE_TYPE } from '../types';

const HorizontalGroup = styled.div`
    display: flex;
    align-items: center;

    > *:not(:last-child) {
        margin-right: ${margin};
    }
`;

HorizontalGroup.defaultProps = {
    size: 'md',
};

HorizontalGroup.propTypes = {
    size: SIZE_TYPE,
};

export default HorizontalGroup;
