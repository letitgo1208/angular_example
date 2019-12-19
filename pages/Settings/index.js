import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { HeroLayout } from 'components/Layout';
import ContentBox from 'components/ContentBox';
import Icon from 'components/Icon';

const Settings = ({ theme }) => (
    <HeroLayout
        renderIcon={<Icon type="cog" width={3.5} stroke={theme.cbcs[4]} />}
        title="Settings"
        description={
            <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Aspernatur deleniti deserunt dolor fuga laudantium maxime odio
                pariatur quos? Accusamus adipisci alias corporis dicta dolore
                iste iure laborum numquam pariatur porro!
            </div>
        }
    >
        <ContentBox header={<div />} />
    </HeroLayout>
);

Settings.displayName = 'Settings';
Settings.propTypes = {
    theme: PropTypes.object.isRequired,
};

export default withTheme(Settings);
