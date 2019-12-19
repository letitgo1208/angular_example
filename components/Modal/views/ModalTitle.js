import styled from 'styled-components';
import { prop } from 'styled-tools';
import H1 from 'components/H1';

const ModalTitle = styled(H1)`
    font-size: ${({ theme }) => theme.fsb * 3}rem;
    font-weight: 700;
    margin-bottom: ${prop('theme.sp.md')};
    line-height: 1;
`;

export default ModalTitle;
