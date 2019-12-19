import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import styled, { withTheme } from 'styled-components';
import get from 'lodash/get';

import { prettySentence } from 'utils/functions';
import { HeroLayout } from 'components/Layout';
import { List, ListItem, RichListItemContent } from 'components/List';
import ContentBox from 'components/ContentBox';
import Button from 'components/Button';
import Icon from 'components/Icon';
import Color from 'components/Color';
import FlowQuery from './views/FlowQuery';
import FlowTitle from './views/FlowTitle';
import StepDelete from './views/StepDelete';
import { stepInfo, extractRouteParam } from './utils';

const StyledButton = styled(Button)`
    margin-left: auto;
    margin-bottom: ${({ theme }) => theme.spb * 4}rem;
`;

const enhance = compose(withTheme, withRouter);

const FlowDetail = ({ theme, match, history }) => (
    <FlowQuery flowId={extractRouteParam(match)}>
        {flow => (
            <HeroLayout
                renderIcon={
                    <Icon type="flow" width={3.5} stroke={theme.cbcs[4]} />
                }
                title={<FlowTitle flow={flow} history={history} />}
            >
                <ContentBox variant="transparent">
                    <StyledButton
                        size="large"
                        onClick={() => history.push(`/flows/${flow.id}/add`)}
                    >
                        Add Another Action
                    </StyledButton>
                    <List>
                        {flow.steps.map(step => (
                            <ListItem
                                key={step.id}
                                variant="separated"
                                to={`/flows/${flow.id}/${get(
                                    step,
                                    'actionSetting.action'
                                ).toLowerCase()}/${step.id}`}
                                horizontalPadding={theme.spb * 4}
                                verticalPadding={theme.spb * 4}
                            >
                                <RichListItemContent
                                    title={prettySentence(stepInfo(step).title)}
                                    description={stepInfo(step).description}
                                    image={
                                        <Color
                                            color={get(
                                                stepInfo(step),
                                                'config.color'
                                            )}
                                            size={5}
                                            iconProps={get(
                                                stepInfo(step),
                                                'config.iconProps'
                                            )}
                                        />
                                    }
                                    actions={[
                                        <StepDelete
                                            key={`dstep${step.id}`}
                                            step={step}
                                            flowId={flow.id}
                                        />,
                                    ]}
                                />
                            </ListItem>
                        ))}
                    </List>
                </ContentBox>
            </HeroLayout>
        )}
    </FlowQuery>
);

FlowDetail.displayName = 'FlowDetail';
FlowDetail.propTypes = {
    theme: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

export default enhance(FlowDetail);
