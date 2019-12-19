import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { HeroLayout } from 'components/Layout';
import ContentBox from 'components/ContentBox';
import Icon from 'components/Icon';

const People = ({ theme }) => (
    <HeroLayout
        renderIcon={<Icon type="person" width={3.5} stroke={theme.cbcs[4]} />}
        title="People"
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

People.displayName = 'People';
People.propTypes = {
    theme: PropTypes.object.isRequired,
};

export default withTheme(People);
