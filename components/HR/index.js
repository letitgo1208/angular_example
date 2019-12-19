import styled from 'styled-components';
import { prop } from 'styled-tools';

const HR = styled.hr`
    margin: ${({ theme }) => theme.spb * 4}rem 0;
    height: ${prop('theme.b')};
    border: 0;
    border-top: ${prop('theme.b')} solid ${prop('theme.cbcs[2]')};
    padding: 0;
`;

export default HR;
