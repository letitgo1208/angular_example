import React from 'react';
import styled from 'styled-components';
import { prop } from 'styled-tools';
import { Mutation } from 'react-apollo';
import logger from 'utils/logger';
import get from 'lodash/get';
import sample from 'lodash/sample';
import { Form } from 'antd';
import { Input } from 'components/Form';
import Popover from 'components/Popover';
import Button from 'components/Button';
import { Formik, Form as FormWrapper } from 'formik';
import { EVENTS_QUERY, CREATE_CALENDAR } from '../queries';
import { CALENDARS_PROP_TYPES } from '../types';
import ColorPicker, { selectableColors } from './ColorPicker';

// TODO: definitely find a better way to find out the last variables we used
// instead of relying on the watches array
const updateViewerCache = (cache, { data: { createCalendar } }) => {
    // pull the viewer data currently in the cache
    const { variables } = cache.watches.find(
        ({ variables: v }) => v.viewerCalendarEnd && v.viewerCalendarStart
    );
    const { viewer } = cache.readQuery({
        query: EVENTS_QUERY,
        variables,
    });

    cache.writeQuery({
        query: EVENTS_QUERY,
        data: {
            viewer: {
                // write back to the cache the viewer that was there
                ...viewer,
                // also update the calendars array to include the newly created calendar
                calendars: get(viewer, 'calendars', []).concat(createCalendar),
            },
        },
    });
};

const AddCalendarButton = Button.extend`
    margin-bottom: 1rem;
    display: inline-block;
`;

const NameInput = styled(Input)`
    width: ${({ theme }) => theme.szb * 29}rem;
`;

const SaveButton = Button.extend`
    transform: translateX(50%);
    margin-left: -${prop('theme.sp.xs')};
`;

const AddCalendar = ({ calendars }) => {
    const getRandomUnusedColor = () => {
        const colorExists = color =>
            !Object.entries(calendars).some(value => value[1].color === color);
        const unusedColors = selectableColors.filter(color =>
            colorExists(color)
        );
        if (unusedColors.size > 0) return sample(unusedColors);
        return sample(selectableColors);
    };

    const initialValues = { name: '', color: getRandomUnusedColor(calendars) };

    const renderOverlay = setIsOpen => (
        <Mutation mutation={CREATE_CALENDAR} update={updateViewerCache}>
            {createCalendar => (
                <Formik
                    initialValues={initialValues}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            await createCalendar({ variables: values });
                        } catch (e) {
                            // Todo: some sort of user facing error needs to be shown here as well
                            // Should logger.error be connected to trackJS? This would be a useful
                            // error to see
                            logger.error(
                                'The calendar could not be created',
                                e
                            );
                        }
                        setSubmitting(false);
                        setIsOpen(false);
                    }}
                    validate={values => {
                        const errors = {};
                        if (!values.name) {
                            errors.name = 'You must include a calendar name.';
                        }
                        return errors;
                    }}
                    render={({
                        values,
                        handleChange,
                        isSubmitting,
                        setFieldValue,
                        touched,
                        errors,
                    }) => (
                        <FormWrapper>
                            <Form.Item label="Calendar Name">
                                <NameInput
                                    size="md"
                                    placeholder="I love unicorns"
                                    value={values.name}
                                    onChange={handleChange}
                                    autoFocus
                                    name="name"
                                />
                                {touched.name &&
                                    errors.name && <div>{errors.name}</div>}
                            </Form.Item>

                            <ColorPicker
                                alignment="row"
                                setSelectedColor={color =>
                                    setFieldValue('color', color)
                                }
                                selectedColor={values.color}
                            />
                            <SaveButton
                                htmlType="submit"
                                loading={isSubmitting}
                            >
                                {!isSubmitting ? 'Save' : 'Saving'}
                            </SaveButton>
                        </FormWrapper>
                    )}
                />
            )}
        </Mutation>
    );

    return (
        <Popover
            closeButton
            placement="right-start"
            overlay={({ setIsOpen }) => renderOverlay(setIsOpen)}
        >
            <AddCalendarButton variant="circle-text" type="success" icon="plus">
                Add Calendar
            </AddCalendarButton>
        </Popover>
    );
};

AddCalendar.defaultProps = {
    calendars: [],
};

AddCalendar.propTypes = {
    calendars: CALENDARS_PROP_TYPES,
};

export default AddCalendar;
