import React from 'react';
import groupBy from 'lodash/groupBy';
import get from 'lodash/get';
import moment from 'moment';

import { prop } from 'styled-tools';
import styled from 'styled-components';
import { Avatar } from 'antd';
import { Select } from 'components/Form';
import { HorizontalGroup } from 'components/MarginGroup';

const StyledHorizontalGroup = styled(HorizontalGroup)`
    margin-bottom: ${prop('theme.sp.md')};
`;

export const flowProps = {
    EMAIL: {
        iconProps: {
            type: 'email',
            fill: '#FFFFFF',
        },
        color: '#F6CC85',
        title: 'Send Email',
        actionSettingsId: 1,
        fields: [
            {
                name: 'to',
                componentType: 'input',
                componentProps: {
                    width: '60%',
                    type: 'email',
                },
            },
            {
                name: 'reply_to',
                componentType: 'input',
                label: 'reply to',
                componentProps: {
                    width: '60%',
                    type: 'email',
                },
            },
            {
                name: 'subject',
                componentType: 'input',
            },
            {
                name: 'body',
                componentType: 'textarea',
                label: 'message',
            },
        ],
        gqlInputType: 'StepEmailInput',
    },
    TWEET: {
        iconProps: {
            type: 'twitter',
            fill: '#FFFFFF',
        },
        color: '#1DA1F2',
        title: 'Send Tweet',
        actionSettingsId: 2,
        fields: [
            {
                name: 'handle',
                placeholder: true,
                hideLabel: true,
                component: (
                    <StyledHorizontalGroup>
                        <Avatar
                            src="https://fast.wistia.net/embed/medias/p5ki0v5kzu/swatch"
                            shape="circle"
                            size="large"
                        />
                        <Select
                            width={10}
                            variant="inverse"
                            options={[
                                {
                                    label: '@gavinZ',
                                    value: '@gavinZ',
                                },
                                { label: '@liuZ', value: '@liuZ' },
                            ]}
                        />
                    </StyledHorizontalGroup>
                ),
            },
            {
                name: 'tweet',
                componentType: 'textarea',
                componentProps: {
                    maxLength: 100,
                },
                hideLabel: true,
            },
        ],
        rawFields: true,
        gqlInputType: 'String',
    },
    SMS: {
        iconProps: {
            type: 'sms',
            fill: '#FFFFFF',
        },
        color: '#51BB7B',
        title: 'Send SMS',
        actionSettingsId: 3,
        fields: [
            {
                name: 'to',
                componentType: 'input',
                componentProps: {
                    width: '60%',
                },
            },
            {
                name: 'sms',
                componentType: 'textarea',
                label: 'message',
            },
        ],
        gqlInputType: 'StepSMSInput',
    },
    NOTE: {
        iconProps: {
            type: 'note',
            fill: '#FFFFFF',
        },
        color: '#C8B67F',
        title: 'Send Physical Note',
        actionSettingsId: 4,
        fields: [
            {
                name: 'to',
                componentType: 'input',
            },
            {
                name: 'from',
                componentType: 'input',
            },
            {
                name: 'body',
                componentType: 'textarea',
                label: 'message',
            },
        ],
        gqlInputType: 'StepNoteInput',
    },
};

export const timeUnits = [
    {
        label: 'minutes',
        value: 1,
    },
    {
        label: 'hours',
        value: 60,
    },
];

export const timeBasis = [
    {
        label: 'before event',
        value: 'BEFORE',
    },
    {
        label: 'after event',
        value: 'AFTER',
    },
];

export const extractRouteParam = (match, param = 'flowId') => {
    const paramId = parseInt(get(match, `params.${param}`), 10);

    if (isNaN(paramId)) {
        return null;
    }
    return paramId;
};

/**
 * Deduce the additional information of a flow
 * @param  {Object} flow Target flow to be analysed
 * @return {Object}      Flow information
 */
export const flowInfo = flow => {
    const steps = flow.steps;

    if (steps.length === 0) {
        return {
            description: 'No steps',
        };
    }

    const actionTypes = groupBy(steps, step =>
        get(step, 'actionSetting.action', null)
    );
    const actions = Object.keys(actionTypes);

    if (actions.length > 1) {
        return {
            iconProps: {
                type: 'hybrid',
                stroke: '#FFFFFF',
            },
            description: actions.join(', '),
            color: '#90A3AE',
        };
    }

    return flowProps[actions[0]];
};

export const stepInfo = step => {
    const stepName = get(step, 'actionSetting.action');
    const duration = moment.duration(step.time_offset_minutes, 'm').humanize();
    const title = `${duration} ${step.time_basis} event, ${get(
        flowProps[stepName],
        'title'
    )}`;

    let description;
    switch (stepName) {
        case 'EMAIL':
            description = `Subject: ${step.subject}`;
            break;
        case 'TWEET':
            description = `Tweet: ${step.tweet}`;
            break;
        case 'SMS':
            description = `Message: ${step.sms}`;
            break;
        case 'NOTE':
        default:
            description = 'N/A';
    }

    return {
        title,
        description,
        config: flowProps[stepName],
    };
};
