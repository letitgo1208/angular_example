import React from 'react';
import PropTypes from 'prop-types';
import { Select, DatePicker } from 'antd';
import get from 'lodash/get';
import omit from 'lodash/omit';
import moment from 'moment';
import { Checkbox, Input, TextArea } from 'components/Form';
import { getFormData } from '../form-util';

// possible move each form item to another folder in a directory up named (form-elements)
const InputOption = props => (
    <Select
        value={get(props, 'field.options.size', 'SMALL')}
        onChange={value =>
            props.onChange({
                id: props.field.itemId,
                field: 'options.size',
                value,
            })
        }
    >
        <Select.Option value="SMALL">
            Small (Fits one line of text)
        </Select.Option>
        <Select.Option value="MEDIUM">
            Medium (Fits two lines of text)
        </Select.Option>
        <Select.Option value="LARGE">
            Large (Fits many lines of text)
        </Select.Option>
    </Select>
);

InputOption.propTypes = {
    field: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};

const FormTags = {
    SELECT: {
        // when we save t
        error: null,
        // should we display this component
        enabled: false,
        // component to display, if any..
        render: props => <Select {...props} />,
        // options component
        renderOptions: () => null,
        // options state
        options: {},
        // label text
        labelText: '',
        // state of the component Rendered
        // (We will need this once we have date items and things that need a sensible default value like date pickers, or checkboxes etc)
        state: '',
        // text of the item in the sidebar
        itemText: 'Select',
        // icon of the item in the sidebar
        itemIcon: 'cog',
        // how we send the specified formfield to the server for this component
        getFormData,
    },
    CHECKBOX: {
        error: null,
        enabled: true,
        render: props => <Checkbox {...props} />,
        labelText: '',
        state: false,
        itemText: 'Checkbox',
        itemIcon: 'cog',
        getFormData,
    },
    TEXT: {
        error: null,
        enabled: true,
        render: data => {
            const isTextArea =
                get(data, 'props.field.options.size') !== 'SMALL';
            const props = omit(data, ['props']);
            return isTextArea ? <TextArea {...props} /> : <Input {...props} />;
        },
        renderOptions: props => <InputOption {...props} />,
        options: {
            size: 'SMALL',
        },
        labelText: '',
        state: '',
        itemText: 'Text',
        itemIcon: 'cog',
        getFormData: ctx => ({
            ...getFormData(ctx),
            text: {
                size: get(ctx, 'options.size', 'SMALL'),
            },
        }),
    },
    FILE: {
        error: null,
        enabled: false,
        render: props => <Input {...props} />,
        labelText: '',
        state: null,
        itemText: 'File',
        itemIcon: 'cog',
        getFormData,
    },
    DATE: {
        error: null,
        enabled: false,
        render: props => <DatePicker {...props} />,
        labelText: '',
        state: moment(),
        itemText: 'Date Picker',
        itemIcon: 'cog',
        getFormData,
    },
};

export default FormTags;
