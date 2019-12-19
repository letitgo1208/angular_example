import styled from 'styled-components';
import { prop } from 'styled-tools';

const H2 = styled.h2`
    font-size: ${({ theme }) => theme.fsb * 2.4}rem;
    color: ${prop('theme.cbc')};
`;

export default H2;
