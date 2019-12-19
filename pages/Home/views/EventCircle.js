import styled from 'styled-components';
import { prop } from 'styled-tools';

const EventCircle = styled.div`
    border-radius: 50%;
    border: ${prop('theme.b')} solid ${prop('theme.cb')};
    width: ${({ theme }) => theme.szb * 0.7}rem;
    height: ${({ theme }) => theme.szb * 0.7}rem;
    background: ${prop('color', 'none')};
`;

export default EventCircle;
