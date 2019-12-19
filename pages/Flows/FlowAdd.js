import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import styled, { withTheme } from 'styled-components';
import { prop } from 'styled-tools';

import { HeroLayout } from 'components/Layout';
import Icon from 'components/Icon';
import Link from 'components/Link';

import FlowQuery from './views/FlowQuery';
import FlowTitle from './views/FlowTitle';
import ActionButton from './views/ActionButton';
import { extractRouteParam } from './utils';

const ContentWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: ${({ theme }) => theme.szb * 114}rem;
    margin: 0 auto;
`;

const StyledLink = styled(Link)`
    width: 23%;
`;

const CallToAction = styled.div`
    font-size: ${({ theme }) => theme.fsb * 2.6}rem;
    font-weight: 500;
    text-align: center;
    padding-bottom: ${prop('theme.sp.md')};
`;

const FlowAdd = ({ theme, match, history }) => (
    <FlowQuery flowId={extractRouteParam(match)}>
        {flow => (
            <HeroLayout
                renderIcon={
                    <Icon type="flow" width={3.5} stroke={theme.cbcs[4]} />
                }
                title={
                    flow ? (
                        <FlowTitle flow={flow} history={history} />
                    ) : (
                        'Add an Action'
                    )
                }
            >
                {!flow && <CallToAction>Add Your First Action!</CallToAction>}
                <ContentWrapper>
                    <StyledLink to="add/tweet">
                        <ActionButton
                            icon={<Icon type="twitter" width={6} shadow />}
                            color="#1DA1F2"
                        >
                            Send Tweet
                        </ActionButton>
                    </StyledLink>
                    <StyledLink to="add/email">
                        <ActionButton
                            icon={
                                <Icon
                                    type="email"
                                    fill={theme.cb}
                                    width={6}
                                    shadow
                                />
                            }
                            color="#F6CC85"
                        >
                            Send Email
                        </ActionButton>
                    </StyledLink>
                    <StyledLink to="add/sms">
                        <ActionButton
                            icon={
                                <Icon
                                    type="sms"
                                    fill={theme.cb}
                                    width={6}
                                    shadow
                                />
                            }
                            color="#52BB7B"
                        >
                            Send Text
                        </ActionButton>
                    </StyledLink>
                    <StyledLink to="add/note">
                        <ActionButton
                            icon={
                                <Icon
                                    type="note"
                                    fill={theme.cb}
                                    width={6}
                                    shadow
                                />
                            }
                            color="#C8B67F"
                        >
                            Send Physical Note
                        </ActionButton>
                    </StyledLink>
                </ContentWrapper>
            </HeroLayout>
        )}
    </FlowQuery>
);

FlowAdd.displayName = 'FlowAdd';
FlowAdd.propTypes = {
    theme: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

const enhance = compose(withTheme, withRouter);

export default enhance(FlowAdd);
