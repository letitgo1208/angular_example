import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'components/Form';
import { EventSidebarRow } from './EventSidebarStyles';

class EventName extends React.Component {
    static propTypes = {
        isSidebarTransitionFinished: PropTypes.bool.isRequired,
        handleChange: PropTypes.func.isRequired,
        value: PropTypes.string,
    };

    static defaultProps = {
        value: '',
    };

    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
    }

    componentDidMount() {
        // We have to wait to focus the input until AFTER the transition - or we get some weird
        // jumping behavior
        if (this.props.isSidebarTransitionFinished) {
            this.inputRef.current.focus();
        }
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.value !== this.props.value;
    }

    render() {
        const { value, handleChange } = this.props;
        // EVENT NAME
        return (
            <EventSidebarRow>
                <Input
                    variant="title"
                    placeholder="Event Name"
                    name="eventName"
                    value={value}
                    onChange={handleChange}
                    innerRef={this.inputRef}
                />
            </EventSidebarRow>
        );
    }
}

export default EventName;
