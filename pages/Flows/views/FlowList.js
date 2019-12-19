import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { List, ListItem, RichListItemContent } from 'components/List';
import Color from 'components/Color';

import FlowDelete from './FlowDelete';

const FlowList = ({ flows, theme }) => (
    <List>
        {flows.map(flow => (
            <ListItem
                horizontalPadding={theme.spb * 4}
                key={flow.id}
                to={`/flows/${flow.id}`}
            >
                <RichListItemContent
                    title={flow.title}
                    {...flow.description && {
                        description: flow.description,
                    }}
                    {...flow.iconProps && {
                        image: (
                            <Color
                                color={flow.color}
                                size={5}
                                iconProps={flow.iconProps}
                            />
                        ),
                    }}
                    actions={[<FlowDelete key={`mut${flow.id}`} flow={flow} />]}
                />
            </ListItem>
        ))}
    </List>
);

FlowList.propTypes = {
    flows: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
        })
    ).isRequired,
    theme: PropTypes.object.isRequired,
};
FlowList.displayName = 'FlowList';

export default withTheme(FlowList);
