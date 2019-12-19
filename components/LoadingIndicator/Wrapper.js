import styled from 'styled-components';
import { prop } from 'styled-tools';

const Wrapper = styled.div`
    margin: ${prop('theme.sp.lg')} auto;
    width: ${({ theme }) => theme.szb * 4}rem;
    height: ${({ theme }) => theme.szb * 4}rem;
    position: relative;
`;

export default Wrapper;
