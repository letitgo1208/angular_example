import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import styled, { withTheme } from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import FormFieldRenderer from './FormFieldRenderer';
import { sortFormItems } from '../form-util';

const Title = styled.h1``;

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    // change background colour if dragging
    background: isDragging ? 'lightgreen' : '#8f8fff',
    // styles we need to apply on draggables
    ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'purple',
    padding: grid,
});

const FormDragDrop = ({
    formItems,
    onDragEnd,
    showSavedOrderMessage,
    ...props
}) => (
    <Fragment>
        <Title>Create Form Right</Title>
        {showSavedOrderMessage && <p>Saved Order</p>}
        <DragDropContext
            onDragEnd={(...dragEndArgs) => onDragEnd(...dragEndArgs)}
        >
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                    >
                        {sortFormItems(formItems).map(item => (
                            <Draggable
                                key={item.itemId}
                                draggableId={item.itemId}
                                index={item.index}
                            >
                                {(providedInner, snapshotInner) => (
                                    <div
                                        ref={providedInner.innerRef}
                                        {...providedInner.draggableProps}
                                        {...providedInner.dragHandleProps}
                                        style={getItemStyle(
                                            snapshotInner.isDragging,
                                            providedInner.draggableProps.style
                                        )}
                                    >
                                        <FormFieldRenderer
                                            field={item}
                                            {...props}
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    </Fragment>
);

FormDragDrop.displayName = 'FormDragDrop';
FormDragDrop.propTypes = {
    formItems: PropTypes.object.isRequired,
    onDragEnd: PropTypes.func.isRequired,
    showSavedOrderMessage: PropTypes.bool.isRequired,
};

const enhance = compose(withTheme);

export default enhance(FormDragDrop);
