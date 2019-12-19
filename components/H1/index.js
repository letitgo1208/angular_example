import styled from 'styled-components';
import { prop } from 'styled-tools';

const H1 = styled.h1`
    font-size: ${({ theme }) => theme.fsb * 3.6}rem;
    margin-bottom: ${({ theme }) => theme.spb * 0.25}rem;
    color: ${prop('theme.cbc')};
`;

export default H1;
