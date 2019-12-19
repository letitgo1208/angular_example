import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { prop } from 'styled-tools';
import Img from 'components/Img';
import mockPeople from 'data/mocks/people';
import { eventSidebarPadding } from 'components/SidebarPopout';
import { EventSidebarRow, Icon } from './EventSidebarStyles';
import EventEmptyAssociation from './EventEmptyAssociation';
import EventAssociationInput from './EventAssociationInput';

const padding = ({ theme }) =>
    `${theme.spb * 4}rem ${theme.spb * eventSidebarPadding}rem`;

const EventAssociationWrapper = styled.div`
    background: ${prop('theme.cbcs[1]')};
    width: calc(100% + ${eventSidebarPadding * 2}rem);
    margin-left: -${eventSidebarPadding}rem;
    padding: ${padding};
    margin-bottom: ${({ theme }) => theme.spb * 3}rem;
    ${EventSidebarRow}:last-child {
        margin-bottom: 0;
    }
`;

const IconStyled = styled(Icon)`
    top: 0.3rem;
    position: relative;
`;

const ImageStyled = styled(Img)`
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
`;

const EventAssociations = ({ values, setFieldValue, flows, forms }) => (
    <EventAssociationWrapper>
        {/* ADD PEOPLE */}
        <EventSidebarRow>
            <IconStyled type="people" width={2.4} />
            <EventAssociationInput
                selectedValues={values.people}
                setSelectedValues={value => setFieldValue('people', value)}
                data={mockPeople}
                placeholder="Add people"
                filterKeys={['full_name', 'email']}
                titleKey="full_name"
                descriptionKey="email"
                Image={({ row }) => (
                    <ImageStyled src={row.image} alt={row.first_name} />
                )}
                emptyResultsMessage="No people matched your search."
            />
        </EventSidebarRow>
        <div>
            {values.people.length > 0 && (
                <ul>{values.people.map(id => <li key={id}>{id}</li>)}</ul>
            )}
        </div>

        {/* ADD FLOWS */}
        <EventSidebarRow>
            <IconStyled type="flow" width={2.4} />
            {flows ? (
                <EventAssociationInput
                    selectedValues={values.flows}
                    setSelectedValues={value => setFieldValue('flows', value)}
                    data={flows}
                    placeholder="Add flows"
                    filterKeys={['name']}
                    titleKey="name"
                    Image={() => <div>Avatar</div>}
                    emptyResultsMessage="No flows matched your search."
                />
            ) : (
                <EventEmptyAssociation type="flows" />
            )}
        </EventSidebarRow>
        <div>
            {values.flows.length > 0 && (
                <ul>{values.flows.map(id => <li key={id}>{id}</li>)}</ul>
            )}
        </div>

        {/* ADD FORMS */}
        <EventSidebarRow>
            <IconStyled type="form" width={2.4} />
            {forms ? (
                <EventAssociationInput
                    selectedValues={values.forms}
                    setSelectedValues={value => setFieldValue('forms', value)}
                    data={forms}
                    placeholder="Add forms"
                    filterKeys={['name']}
                    titleKey="name"
                    Image={() => <div>Avatar</div>}
                    emptyResultsMessage="No forms matched your search."
                />
            ) : (
                <EventEmptyAssociation type="forms" />
            )}
        </EventSidebarRow>
        <div>
            {values.forms.length > 0 && (
                <ul>{values.forms.map(id => <li key={id}>{id}</li>)}</ul>
            )}
        </div>
    </EventAssociationWrapper>
);

EventAssociations.propTypes = {
    values: PropTypes.object.isRequired,
    setFieldValue: PropTypes.func.isRequired,
    flows: PropTypes.array.isRequired,
    forms: PropTypes.array.isRequired,
};

export default EventAssociations;
