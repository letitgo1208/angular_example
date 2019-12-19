import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { prop } from 'styled-tools';
import { HorizontalGroup, VerticalGroup } from 'components/MarginGroup';
import ListItemContent from './ListItemContent';

const Title = styled.div`
    font-weight: 500;
    color: ${prop('theme.cbc')};
    font-size: ${prop('theme.fs.lg')};
`;

const Description = styled.div`
    color: ${prop('theme.cbcs[4]')};
    font-weight: 500;
`;

const RichListItemContent = ({
    title,
    description,
    actions,
    image,
    horizontalGroupProps,
    verticalGroupProps,
}) => (
    <Fragment>
        <ListItemContent>
            <HorizontalGroup {...horizontalGroupProps}>
                {image && image}
                <VerticalGroup margin={0.3} {...verticalGroupProps}>
                    <Title>{title}</Title>
                    {description && <Description>{description}</Description>}
                </VerticalGroup>
            </HorizontalGroup>
        </ListItemContent>
        <HorizontalGroup {...horizontalGroupProps}>{actions}</HorizontalGroup>
    </Fragment>
);

RichListItemContent.defaultProps = {
    image: false,
    description: false,
    horizontalGroupProps: {},
    verticalGroupProps: {},
};
RichListItemContent.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    image: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
    actions: PropTypes.arrayOf(PropTypes.node).isRequired,
    horizontalGroupProps: PropTypes.object,
    verticalGroupProps: PropTypes.object,
};

RichListItemContent.displayName = 'RichListItemContent';

export default RichListItemContent;
