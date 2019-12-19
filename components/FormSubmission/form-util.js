import orderBy from 'lodash/orderBy';

// default value for the pendingRequired should be null, not true || false
export const getRequiredValue = field => {
    if (field.editing) {
        return field.pendingRequired === null
            ? field.required
            : field.pendingRequired;
    }
    return field.required;
};

export const getFormData = context => ({
    id: parseInt(context.itemId, 10) || null,
    required: getRequiredValue(context),
    order: context.index,
    label: context.editing ? context.pendingText : context.labelText,
    type: context.tag,
});

// gonna need to override dynamically the props / onChange events depending on the prop that was passed in.
// For example Select might do this differently from radio or input

export const fieldParams = (props = {}) => ({
    defaultValue: '',
    props,
});

// if fieldParams does not work, you can set custom params here per Tag
export const overrideFieldParams = {
    select: fieldParams,
};

export const sortFormItems = items =>
    orderBy(Object.values(items), ['index'], ['asc']);
