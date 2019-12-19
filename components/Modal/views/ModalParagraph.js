import styled from 'styled-components';
import { prop } from 'styled-tools';

const ModalParagraph = styled.p`
    font-size: ${prop('theme.fs.lg')};
    font-weight: 500;
    line-height: 2.4rem;
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.spb * 3}rem;
`;

export default ModalParagraph;
