import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import { withRouter } from 'react-router-dom';

import { HeroLayout } from 'components/Layout';
import ContentBox from 'components/ContentBox';
import Header from 'components/ContentBox/views/Header';
import Button from 'components/Button';
import Icon from 'components/Icon';
import FlowList from './views/FlowList';
import FlowsQuery from './views/FlowsQuery';

const FlowsHome = ({ theme, history }) => (
    <HeroLayout
        renderIcon={<Icon type="flow" width={3.5} stroke={theme.cbcs[4]} />}
        title="Flows"
        description="Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Aspernatur deleniti deserunt dolor fuga laudantium maxime odio
                pariatur quos? Accusamus adipisci alias corporis dicta dolore
                iste iure laborum numquam pariatur porro!"
    >
        <ContentBox
            header={
                <Header
                    action={
                        <Button
                            variant="secondary"
                            size="large"
                            onClick={() => history.push('/flows/create')}
                        >
                            Create Flow
                        </Button>
                    }
                >
                    My Flows
                </Header>
            }
        >
            <FlowsQuery includeFlowList>
                {({ flowList }) => <FlowList flows={flowList} />}
            </FlowsQuery>
        </ContentBox>
    </HeroLayout>
);

FlowsHome.displayName = 'FlowsHome';

FlowsHome.propTypes = {
    theme: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

export default compose(withTheme, withRouter)(FlowsHome);
