/**
 * This is used to wrap anything that we want to have the hover effect for the
 * list
 */

import styled from 'styled-components';
import { prop } from 'styled-tools';

const ListItemContent = styled.div`
    display: flex;
    width: 100%;
    transition: ${prop('theme.ts.easeIn')};
`;

export default ListItemContent;
