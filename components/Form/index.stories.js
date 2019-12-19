import React, { Fragment } from 'react';
import styled from 'styled-components';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { text, select, number } from '@storybook/addon-knobs';
import { withState } from 'recompose';

import Button from 'components/Button';
import Icon from 'components/Icon';

import {
    Select as RealSelect,
    MultipleSelectFilter,
    Input,
    DatePicker,
    TimePicker as RealTimePicker,
    SelectFilterPopover,
    Checkbox,
    Radio,
} from './index';

const stories = storiesOf('Form', module);

const enhance = withState('selectedValue', 'setSelectedValue', 1);
const Select = enhance(props => (
    <RealSelect
        {...props}
        value={props.selectedValue}
        setSelectedValue={props.setSelectedValue}
    />
));

stories.add(
    'input',
    withInfo({ text: 'Multiple sizes of default inputs - large by default' })(
        () => (
            <Input
                size={select('size', { sm: 'sm', md: 'md', lg: 'lg' }, 'lg')}
                placeholder={text('Placeholder', 'I love unicorns')}
            />
        )
    )
);

stories.add(
    'input with validation',
    withInfo({ text: 'Multiple sizes of default inputs - large by default' })(
        () => (
            <Input
                size={select('size', { sm: 'sm', md: 'md', lg: 'lg' }, 'lg')}
                placeholder={text('Placeholder', 'I love unicorns')}
                errorMessage="I love validation errors"
            />
        )
    )
);

stories.add(
    'input with inline icon',
    withInfo({ text: 'Add an icon to the right of the input' })(() => (
        <Input
            width="100%"
            renderInlineIcon={<Icon type="search" stroke="#000000" />}
            size={select('size', { sm: 'sm', md: 'md', lg: 'lg' }, 'lg')}
            placeholder={text('Placeholder', 'I love unicorns')}
        />
    ))
);

stories.add(
    'input title',
    withInfo({
        text: 'Input without borders - looks like an inline edit for titles',
    })(() => (
        <Input
            variant="title"
            placeholder={text('Placeholder', 'I love unicorns')}
        />
    ))
);

stories.add(
    'select',
    withInfo({ text: 'Custom select input' })(() => (
        <Select
            options={[
                { label: text('Option 1', 'Option 1'), value: 1 },
                { label: text('Option 2', 'Option 2'), value: 2 },
                { label: text('Option 3', 'Option 3'), value: 3 },
                { label: text('Option 4', 'Option 4'), value: 4 },
                { label: text('Option 5', 'Option 5'), value: 5 },
                { label: text('Option 6', 'Option 6'), value: 6 },
                { label: text('Option 7', 'Option 7'), value: 7 },
                { label: text('Option 8', 'Option 8'), value: 8 },
                { label: text('Option 9', 'Option 9'), value: 9 },
                { label: text('Option 10', 'Option 10'), value: 10 },
                { label: text('Option 11', 'Option 11'), value: 11 },
            ]}
        />
    ))
);

stories.add(
    'select filter popover',
    withInfo({
        text:
            "A select with a filter component - handles click doesn't carry value",
    })(() => (
        <SelectFilterPopover
            unfilteredOptions={[
                { category: 'Forms' },
                {
                    label: 'First Name',
                    value: '{{firstName}}',
                },
                {
                    label: 'Last Name',
                    value: '{{lastName}}',
                },
                { category: 'Flows' },
                {
                    label: 'Send a Tweet',
                    value: '{{tweet}}',
                },
                {
                    label: 'Send a Note',
                    value: '{{note}}',
                },
                {
                    label: 'Send an Email',
                    value: '{{email}}',
                },
                { category: 'People' },
                {
                    label: 'Brian Jenkins',
                    value: '{{brian}}',
                },
                {
                    label: 'Gavin Zuchlinski',
                    value: '{{gavin}}',
                },
                {
                    label: 'Ben Rabicoff',
                    value: '{{ben}}',
                },
            ]}
            handleClick={value => {
                // eslint-disable-next-line no-console
                console.log(value);
            }}
        >
            {({ isOpen }) => (
                <Icon
                    isButton
                    type="insert"
                    fill={isOpen ? '#63B5F7' : undefined}
                    hoverFill="#63B5F7"
                />
            )}
        </SelectFilterPopover>
    ))
);

stories.add(
    'radio',
    withInfo({ text: 'Custom radio input' })(() => (
        <Fragment>
            <Radio name="custom" value={1} />
            <Radio name="custom" value={2} />
        </Fragment>
    ))
);

const enhanceTagInput = withState('value', 'setValue', '');
const InputWithState = enhanceTagInput(props => (
    <Input
        {...props}
        setValue={props.setValue}
        value={props.value}
        onChange={e => props.setValue(e.target.value)}
    />
));

const colors = ['#4EC3F7', '#4BD1E1', '#4DB6AC', '#FFF276'];

const enhanceCheckboxes = withState('checkboxes', 'setCheckboxes', [
    false,
    false,
    false,
    false,
    false,
]);
const CheckboxList = enhanceCheckboxes(
    ({ checkboxes, setCheckboxes, children }) =>
        children({ checkboxes, setCheckboxes })
);

const StyledCheckbox = styled(Checkbox)`
    margin-bottom: 1rem;
`;

// This will be easier with Formik
stories.add(
    'checkbox',
    withInfo({
        text: 'A normal checkbox that can be colored',
    })(() => (
        <CheckboxList>
            {({ checkboxes, setCheckboxes }) => (
                <Fragment>
                    <StyledCheckbox
                        checked={checkboxes[0]}
                        setChecked={() => {
                            const newCheckboxes = [...checkboxes];
                            newCheckboxes[0] = !checkboxes[0];
                            setCheckboxes(newCheckboxes);
                        }}
                        color={colors[0]}
                    />
                    <StyledCheckbox
                        checked={checkboxes[1]}
                        setChecked={() => {
                            const newCheckboxes = [...checkboxes];
                            newCheckboxes[1] = !checkboxes[1];
                            setCheckboxes(newCheckboxes);
                        }}
                        color={colors[1]}
                    />
                    <StyledCheckbox
                        checked={checkboxes[2]}
                        setChecked={() => {
                            const newCheckboxes = [...checkboxes];
                            newCheckboxes[2] = !checkboxes[2];
                            setCheckboxes(newCheckboxes);
                        }}
                        color={colors[2]}
                    />
                    <StyledCheckbox
                        checked={checkboxes[3]}
                        setChecked={() => {
                            const newCheckboxes = [...checkboxes];
                            newCheckboxes[3] = !checkboxes[3];
                            setCheckboxes(newCheckboxes);
                        }}
                        color={colors[3]}
                    />
                    <StyledCheckbox
                        checked={checkboxes[4]}
                        setChecked={() => {
                            const newCheckboxes = [...checkboxes];
                            newCheckboxes[4] = !checkboxes[4];
                            setCheckboxes(newCheckboxes);
                        }}
                    />
                </Fragment>
            )}
        </CheckboxList>
    ))
);

stories.add(
    'input with tags',
    withInfo({
        text: 'An input with tags when entered with {{ }}',
    })(() => (
        <InputWithState
            width={50}
            tags={[
                { category: 'Forms' },
                {
                    label: 'First Name',
                    value: '{{firstName}}',
                },
                {
                    label: 'Last Name',
                    value: '{{lastName}}',
                },
                { category: 'Flows' },
                {
                    label: 'Send a Tweet',
                    value: '{{tweet}}',
                },
                {
                    label: 'Send a Note',
                    value: '{{note}}',
                },
                {
                    label: 'Send an Email',
                    value: '{{email}}',
                },
                { category: 'People' },
                {
                    label: 'Brian Jenkins',
                    value: '{{brian}}',
                },
                {
                    label: 'Gavin Zuchlinski',
                    value: '{{gavin}}',
                },
                {
                    label: 'Ben Rabicoff',
                    value: '{{ben}}',
                },
            ]}
        />
    ))
);

stories.add(
    'fluid select',
    withInfo({
        text:
            'A select input without background or borders that conforms its width to the selected value',
    })(() => (
        <Select
            fluid
            options={[
                { label: text('Option 1', 'Option 1'), value: 1 },
                { label: text('Option 2', 'Option 2'), value: 2 },
                { label: text('Option 3', 'Option 3'), value: 3 },
            ]}
        />
    ))
);

const options = [
    { label: 'Gavin Zuchlinski', value: 1 },
    { label: 'Brian Jenkins', value: 2 },
    { label: 'Ben Rabicoff', value: 3 },
    { label: 'Chris Moore', value: 4 },
    { label: 'Vincent St. Louis', value: 5 },
    { label: 'Liu Zixing', value: 6 },
    { label: 'Carl Sutherland', value: 7 },
    { label: 'Rob Grennan', value: 8 },
    { label: 'Nicole Geosits', value: 9 },
];

const enhancePeople = withState('selectedValues', 'setSelectedValues', []);

const PeopleSelect = enhancePeople(props =>
    props.children({
        selectedValues: props.selectedValues,
        setSelectedValues: props.setSelectedValues,
    })
);

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    margin-top: 1rem;
`;

const ListItem = styled.li`
    cursor: pointer;
    &:hover {
        transform: scale(1.05);
    }
`;

stories.add(
    'search select',
    withInfo({
        text: 'A select input with a search field',
    })(() => (
        <PeopleSelect>
            {({ selectedValues, setSelectedValues }) => (
                <Fragment>
                    <MultipleSelectFilter
                        inputProps={{
                            placeholder: 'Add people',
                            width: '100%',
                        }}
                        unfilteredOptions={options}
                        // selectedValues can just be an array of valus [1, 2, 3] - this should be state
                        selectedValues={selectedValues}
                        // filtered options are the filtered options from the input AND with the selectedValues removed
                        setSelectedValues={option =>
                            setSelectedValues([...selectedValues, option.value])
                        }
                        overlay={({ filteredOptions, handleItemClick }) => (
                            <List>
                                {filteredOptions.map(option => (
                                    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                                    <ListItem
                                        key={option.value}
                                        onClick={() => handleItemClick(option)}
                                    >
                                        {option.label}
                                    </ListItem>
                                ))}
                            </List>
                        )}
                    />
                    We can display the selected values here [{selectedValues.map(
                        value => (
                            <Fragment key={value}>
                                <div>
                                    {
                                        options.find(
                                            item => item.value === value
                                        ).label
                                    }
                                </div>
                                <Button
                                    size="small"
                                    onClick={() => {
                                        setSelectedValues(
                                            selectedValues.filter(
                                                selected => selected !== value
                                            )
                                        );
                                    }}
                                >
                                    remove
                                </Button>
                            </Fragment>
                        )
                    )}] wherever we want
                </Fragment>
            )}
        </PeopleSelect>
    ))
);

// This state will be Formik we won't have to do manage the state here
const enhanceDatePicker = withState('date', 'setDate', new Date());

const DatePickerState = enhanceDatePicker(props =>
    props.children({
        date: props.date,
        setDate: props.setDate,
    })
);

stories.add(
    'date picker',
    withInfo({
        text: 'A datepicker component using the mini cal',
    })(() => (
        <DatePickerState>
            {({ date, setDate }) => (
                <DatePicker date={date} handleDateChange={setDate} />
            )}
        </DatePickerState>
    ))
);

const enhanceTimePicker = withState(
    'selectedDateTime',
    'setSelectedDateTime',
    new Date('2018', '5', '18')
);
const TimePicker = enhanceTimePicker(props => (
    <RealTimePicker
        {...props}
        dateTime={props.selectedDateTime}
        handleTimeChange={props.setSelectedDateTime}
    />
));

stories.add(
    'time picker',
    withInfo({
        text: 'A timepicker component',
    })(() => (
        <TimePicker
            minuteStep={number('minuteStep', 30)}
            timeFormat={select('timeFormat', { 12: '12', 24: '24' }, '12')}
        />
    ))
);
